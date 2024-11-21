// EnterCodeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const EnterCodeScreen = ({ route, navigation }) => {
  const [code, setCode] = useState('');
  const { userId } = route.params;

  const handleVerifyCode = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (userData.resetCode === parseInt(code)) {
        navigation.navigate('NewPassword', { userId });
      } else {
        Alert.alert('Error', 'Incorrect code. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/samp.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 15 : 0}
      >
        <Text style={styles.header}>Enter Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25, 26, 25, 0.5)', // Adjust this for transparency
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(49, 81, 30, 0.9)',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    color: '#333',
  },
});

export default EnterCodeScreen;
