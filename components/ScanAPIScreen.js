import React, { useState } from 'react';
import { View, Button, Image, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [classificationResult, setClassificationResult] = useState('');

  const captureImage = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant permission to access the camera.');
      return;
    }

    // Launch the camera
    const cameraResult = await ImagePicker.launchCameraAsync();

    // Log the entire camera result for debugging
    console.log('Camera Result:', cameraResult);

    // Check if the user cancelled the image capture
    if (cameraResult.canceled) return;

    // Access the image URI from the assets array
    const uri = cameraResult.assets[0]?.uri;

    // Ensure URI is defined before proceeding
    if (!uri) {
      Alert.alert('Error', 'Image capture failed. Please try again.');
      return;
    }

    // Manipulate the image if URI is valid
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImageUri(manipulatedImage.uri);
      classifyImage(manipulatedImage.uri);
    } catch (error) {
      console.error('Error manipulating image:', error.message);
      Alert.alert('Error', 'Failed to manipulate the image.');
    }
  };

  const classifyImage = async (uri) => {
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

      const apiKey = 'AIzaSyCbRFae7Kj9lyswMbBh6fy7Lhlxb8tWLLU'; // Replace with your actual API key
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const requestPayload = {
        requests: [
          {
            image: { content: base64Img.split(',')[1] }, // Only send the Base64 part
            features: [{ type: 'LABEL_DETECTION', maxResults: 10 }] // Increase max results to 10
          }
        ]
      };

      const response = await axios.post(apiUrl, requestPayload);
      console.log('API Response:', response.data); // Log the response for debugging

      // Find the label with the highest probability
      const highestLabel = response.data.responses[0].labelAnnotations.reduce((prev, current) => {
        return (prev.score > current.score) ? prev : current;
      });

      // Set the result to the highest label description
      setClassificationResult(highestLabel.description);
    } catch (error) {
      console.error('Error classifying image:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Capture an Image" onPress={captureImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {classificationResult && <Text style={styles.result}>Classification: {classificationResult}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default App;
