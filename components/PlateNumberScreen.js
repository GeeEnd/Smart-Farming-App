import React, { useState } from 'react';
import { View, Button, Image, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

const App = () => {
  const [imageUri, setImageUri] = useState(null);
  const [plateNumber, setPlateNumber] = useState('');

  const captureImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant permission to access the camera.');
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync();
    if (cameraResult.canceled) return;

    const uri = cameraResult.assets[0]?.uri;
    if (!uri) {
      Alert.alert('Error', 'Image capture failed. Please try again.');
      return;
    }

    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImageUri(manipulatedImage.uri);
      extractPlateNumber(manipulatedImage.uri);
    } catch (error) {
      console.error('Error manipulating image:', error.message);
      Alert.alert('Error', 'Failed to manipulate the image.');
    }
  };

  const extractPlateNumber = async (uri) => {
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
            image: { content: base64Img.split(',')[1] },
            features: [{ type: 'TEXT_DETECTION' }]
          }
        ]
      };

      const response = await axios.post(apiUrl, requestPayload);
      console.log('API Response:', response.data);

      const detectedText = response.data.responses[0].fullTextAnnotation?.text || 'No text detected';

      // Regular expressions for Philippine plate formats:
      // Car plates: 3 letters, space, 3-4 numbers
      // Motorcycle plates: 3 numbers followed by 3 letters, no space
      const carPlateRegex = /\b[A-Z]{3}\s\d{3,4}\b/;
      const motorcyclePlateRegex = /\b\d{3}[A-Z]{3}\b/;

      const carPlateMatch = detectedText.match(carPlateRegex);
      const motorcyclePlateMatch = detectedText.match(motorcyclePlateRegex);

      if (carPlateMatch) {
        setPlateNumber(`Car Plate: ${carPlateMatch[0]}`);
      } else if (motorcyclePlateMatch) {
        setPlateNumber(`Motorcycle Plate: ${motorcyclePlateMatch[0]}`);
      } else {
        setPlateNumber('No valid plate number detected.');
      }
    } catch (error) {
      console.error('Error extracting plate number:', error.message);
      Alert.alert('Error', 'Failed to detect text in the image.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Capture an Image" onPress={captureImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {plateNumber && <Text style={styles.result}>Detected Plate Number: {plateNumber}</Text>}
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
