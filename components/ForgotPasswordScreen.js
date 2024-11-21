import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  Alert, 
  ImageBackground, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { db } from '../config/firebase';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.empty) {
        Alert.alert('Error', 'No user found with that email address.');
      } else {
        // Simulate sending a reset code
        const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
        const userDoc = querySnapshot.docs[0];
        await updateDoc(userDoc.ref, { resetCode: code });
        Alert.alert('Success', `A code has been sent to ${email}.`);
        navigation.navigate('EnterCode', { userId: userDoc.id });
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
        <Image
          source={require('../assets/images/tea.png')} // Logo image (if needed)
          style={styles.logo}
        />
  
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
        <View style={styles.signContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.toggleText}>Back to Login</Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25, 26, 25, 0.5)', // Adjust for transparency
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
  signContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  toggleText: {
    color: '#31511E',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
