import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [insectInfo, setInsectInfo] = useState('');
  const [googleVisionKey, setGoogleVisionKey] = useState('AIzaSyCbRFae7Kj9lyswMbBh6fy7Lhlxb8tWLLU'); // Set your Google Vision API key here

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    // Set an interval to capture an image every 10 seconds
    const captureInterval = setInterval(() => {
      captureImage();
    }, 10000);

    // Clear interval when the component unmounts
    return () => clearInterval(captureInterval);
  }, [cameraRef]);

  const captureImage = async () => {
    if (cameraRef) {
      const cameraResult = await cameraRef.takePictureAsync();
      const uri = cameraResult.uri;

      try {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 1200 } }], // Resize image
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG } // Compress and convert to JPEG
        );

        setImageUri(manipulatedImage.uri);
        analyzeImageWithVisionAPI(manipulatedImage.uri);
      } catch (error) {
        console.error('Error manipulating image:', error.message);
        Alert.alert('Error', 'Failed to manipulate the image.');
      }
    }
  };

  const analyzeImageWithVisionAPI = async (uri) => {
    try {
      const base64Img = await fetch(uri)
        .then(res => res.blob())
        .then(blob => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        });

      const apiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + googleVisionKey;

      const requestBody = {
        requests: [
          {
            image: {
              content: base64Img.split(',')[1], // The base64-encoded image content
            },
            features: [
              {
                type: 'LABEL_DETECTION', // We will use LABEL_DETECTION to identify objects
                maxResults: 10,
              },
            ],
          },
        ],
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Cloud Vision API Response:', response.data); // Console log the full response

      const labels = response.data.responses[0].labelAnnotations;

      if (labels && labels.length > 0) {
        // Insect names map based on Cloud Vision API label results
        const insectLabelMap = {
          'Killer Bees': ['bee', 'honey bee', 'insect'],
          'Aphids': ['aphid', 'insect', 'bug'],
          'Armyworms': ['armyworm', 'caterpillar', 'insect'],
          'Brown Marmorated Stink Bugs': ['stink bug', 'insect', 'bug'],
          'Cabbage Loopers': ['cabbage looper', 'caterpillar', 'insect'],
          'Citrus Canker': ['canker', 'plant disease'],
          'Colorado Potato Beetles': ['potato beetle', 'beetle', 'insect'],
          'Corn Borers': ['corn borer', 'moth', 'insect'],
          'Corn Earworms': ['corn earworm', 'caterpillar', 'insect'],
          'Fall Armyworms': ['armyworm', 'insect', 'caterpillar'],
          'Fruit Flies': ['fruit fly', 'fly', 'insect'],
          'Spider Mites': ['spider mite', 'mite', 'insect'],
          'Thrips': ['thrip', 'insect', 'tiny insect'],
          'Tomato Hornworms': ['hornworm', 'caterpillar', 'insect'],
          'Western Corn Rootworms': ['corn rootworm', 'beetle', 'insect'],
        };

        // Filter and map labels to the insect names
        let matchedInsects = [];

        labels.forEach((label) => {
          Object.keys(insectLabelMap).forEach((insect) => {
            const matchingLabels = insectLabelMap[insect];
            if (matchingLabels.some(term => label.description.toLowerCase().includes(term))) {
              matchedInsects.push(insect); // If a match is found, add the insect name
            }
          });
        });

        if (matchedInsects.length > 0) {
          setInsectInfo('Insect(s) Detected: ' + matchedInsects.join(', '));
        } else {
          setInsectInfo('No insects detected.');
        }

        // If any insect is detected, send to iNaturalist
        if (matchedInsects.length > 0) {
          analyzeInsectWithINaturalistAPI(matchedInsects[0]);
        }

      } else {
        setInsectInfo('No labels detected.');
      }
    } catch (error) {
      console.error('Error analyzing image with Vision API:', error.message);
      Alert.alert('Error', 'Failed to analyze the image.');
    }
  };

  const analyzeInsectWithINaturalistAPI = async (insect) => {
    try {
      const apiUrl = `https://api.inaturalist.org/v1/taxa?q=${insect}`;

      console.log('Insect query sent to iNaturalist:', apiUrl); // Log the URL to console for debugging

      const response = await axios.get(apiUrl);

      if (response.data.results && response.data.results.length > 0) {
        const species = response.data.results[0]; // Get the first result

        if (species) {
          setInsectInfo(`Insect Detected: ${species.name}\nFamily: ${species.family}`);
        } else {
          setInsectInfo('No insect species found.');
        }
      } else {
        setInsectInfo('No insect species found.');
      }
    } catch (error) {
      console.error('Error analyzing insect with iNaturalist:', error.message);
      Alert.alert('Error', 'Failed to identify insect with iNaturalist.');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)}>
        <View style={styles.buttonContainer}>
          <Button
            title="Flip Camera"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </View>
      </Camera>

      {imageUri && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.result}>{insectInfo}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  resultContainer: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  result: {
    fontSize: 18,
    fontWeight: '500',
  },
});
