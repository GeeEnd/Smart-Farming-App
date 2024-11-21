// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native'; // This line is correct
import { db } from '../config/firebase'; // Ensure this path is correct
import { collection, getDocs, query, where, doc, updateDoc, onSnapshot } from 'firebase/firestore';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null); // Track logged in user's ID

  const handleUserLogin = async (userId) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      online: true, // Set online status to true
    });
  };

  // Call this function when the user logs out
  const handleUserLogout = async (userId) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      online: false, // Set online status to false
    });
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('username', '==', username),
        where('password', '==', password)
      );
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.empty) {
        Alert.alert('Login Failed', 'Invalid username or password.');
      } else {
        const userDoc = querySnapshot.docs[0]; // Get the first document
        const userData = userDoc.data();
        setUserId(userDoc.id); // Save the logged-in user's ID
        const name = userData.name; // Retrieve the full name

        // Update online status
        await handleUserLogin(userDoc.id);

        // Pass the full name as a parameter to the Dashboard screen
        navigation.navigate('Dashboard', { name, username }); // <-- Update this line
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Listen for user status changes
  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          // Handle user online status updates here if needed
        }
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    }
  }, [userId]);

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 15 : 0} // Adjust this value as necessary
      >
        <Text style={styles.header}>Field Vision</Text>

        <Image
          source={require('../assets/images/tea.png')}
          style={styles.logo}
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
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.Sign}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.toggleText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.toggleText2}>Forgot Password?</Text>
      </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'bottom',
    alignItems: 'bottom',
    height: '100%',
    width: 'auto',
  },
  Sign: {
    alignItems: 'bottom',
  
    flex: 1,
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
    paddingTop: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
  },
 
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(49, 81, 30, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
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
  toggleText2: {
    color: '#31511E',
    fontSize: 14,
    marginTop: 10,
    alignContent: 'space-between',
    justifyContent: 'space-between',
    marginLeft: 40
  },
});

export default LoginScreen;
