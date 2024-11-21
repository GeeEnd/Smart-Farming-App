// SignupScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from '../config/firebase'; // Import Firestore instance
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [name, setName] = useState(''); // New state for name

  // Handle Signup
  const handleSignup = async () => {

    if (!username || !password || !email || !name) {
      Alert.alert('Error', 'All fields are required. Please fill in all fields.');
      return;
    }
    
    try {
      const usersQuery = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        Alert.alert('Username already exists', 'Please choose a different username.');
        return;
      }

      await addDoc(collection(db, 'users'), {
        username: username,
        password: password,
        email: email, // Save email to Firestore
        name: name, // Save name to Firestore
      });

      Alert.alert('Signup Successful!', 'You can now log in with your username and password.');
      navigation.navigate('Login'); // Navigate to login screen after signup
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust this value as necessary
      >
        <Image
          source={require('../assets/images/tea.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Name" // New placeholder for name
          value={name}
          onChangeText={text => setName(text)} // Set name state
          autoCapitalize="words"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.toggleText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  // (Insert your styles here, similar to those in your App component)
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
  toggleText: {
    color: '#31511E',
    fontSize: 14,
    marginTop: 10,
  },
});

export default SignupScreen;
