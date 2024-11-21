// App.js
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import AppNavigator from '../verse4/navigator/AppNavigator'; // Adjust according to your path
import { NavigationContainer } from '@react-navigation/native';
import { db } from '../verse4/config/firebase'; // Import Firestore instance

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppNavigator /> 
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Add any global styles if needed
});

export default App;
