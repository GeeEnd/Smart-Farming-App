import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView, StyleSheet, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CropScreen from '../components/dash/CropScreen';
import InsectScreen from '../components/dash/InsectScreen';
import userIcon from '../assets/images/profile.png';
import styles from '../components/DashboardStyles'; // Import the styles here
import CommunityScreen from '../components/CommunityScreen';
import ChatScreen from '../components/ChatScreen';
import { getFirestore, collection, updateDoc, getDocs, query, where, doc } from 'firebase/firestore'; // Import Firestore functions

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ route }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const navigation = useNavigation();
  const [galleryImages, setGalleryImages] = useState([]); // State for gallery images
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const { name } = route.params;
  const userName = name; // Ensure this is defined correctly
      
  const handleLogout = async (userName) => {
    try {
      userName = name;
      console.log("Logging out...");
  
      // Ensure userName is a string
      if (typeof userName === 'string' && userName.trim() !== '') {
        const db = getFirestore();
        const userQuery = query(collection(db, 'users'), where('name', '==', userName)); // Ensure trimming whitespace
        const querySnapshot = await getDocs(userQuery);
  
        // Check if a user document is found
        if (!querySnapshot.empty) {
          // Update the online status for the found users
          querySnapshot.forEach(async (doc) => {
            const userDoc = doc.ref; // Get the document reference
            
            // Update the 'online' field to false
            await updateDoc(userDoc, {
              online: false 
            });
            console.log(`User ${userName} status updated to offline.`);
          });
        } else {
          console.error("User not found");
        }
      } else {
        console.error("User name is not provided or is invalid");
      }

      setDropdownVisible(false);
      navigation.navigate('Login'); // Navigate to the Login screen
    } catch (error) {
      console.error("Error updating online status:", error.message);
    }
  };
  


  
  // Call handleLogout only if userName is valid
  
  const handleDeveloper = () => {
    setDropdownVisible(false);  // Hide dropdown
    navigation.navigate('Developers');
  };

  const handlePlateScan = () => {
    setDropdownVisible(false);  // Hide dropdown
    navigation.navigate('ScanPlate');
  };
  
  const handleAPI = () => {
    setDropdownVisible(false);  // Hide dropdown
    navigation.navigate('ScanAPI');
  };

  const handleAnalyze = () => {
    navigation.navigate('InsectAnalyze');
  };

  const handleUserIconPress = (event) => {
    const { pageY, pageX } = event.nativeEvent;
    setDropdownPosition({ top: pageY - 5, left: pageX - 110 }); // Adjust left position
    setDropdownVisible(!dropdownVisible);
  };

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'fe2cc1ce50a750fe7c3197554b6f15a0';
      const city = 'Malaybalay, PH';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const fetchGalleryImages = async () => {
    const db = getFirestore(); // Get Firestore instance
    const galleryRef = collection(db, 'crops'); // Replace 'galleryImages' with your actual collection name
    const snapshot = await getDocs(galleryRef);
    const images = snapshot.docs.map(doc => doc.data().imageURL); // Adjust field name as necessary
    setGalleryImages(images);
  };

  useEffect(() => {
    fetchWeatherData();
    fetchGalleryImages(); // Fetch gallery images on component mount
  }, []);

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'rgba(237, 232, 220, 0.8)',
      },
      tabBarItemStyle: {
        padding: 0,
      },
    }}>
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeContent
            handleUserIconPress={handleUserIconPress}
            handleLogout={handleLogout}
            handleDeveloper={handleDeveloper}
            handleAnalyze={handleAnalyze}
            name={name}
            handlePlateScan = {handlePlateScan}
            handleAPI = {handleAPI}
            dropdownVisible={dropdownVisible}
            dropdownPosition={dropdownPosition}
            setDropdownVisible={setDropdownVisible}
            weatherData={weatherData}
            navigation={navigation}
            galleryImages={galleryImages} // Ensure this is passed
          />
        )}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>Home</Text>
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        initialParams={{ name }}
        options={{
          tabBarIcon: ({ color }) => <Icon name="users" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{ name }}
        options={{
          tabBarIcon: ({ color }) => <Icon name="comment" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const getWeatherImage = (weatherData) => {
  if (!weatherData) return require('../assets/images/default.jpg');

  const description = weatherData.weather[0].main.toLowerCase();
  if (description.includes("cloud")) return require('../assets/images/cloudy.jpg');
  if (description.includes("clouds")) return require('../assets/images/cloudy.jpg');
  if (description.includes("rain")) return require('../assets/images/rainy.jpg');
  if (description.includes("clear")) return require('../assets/images/sunny.jpg');

  return require('../assets/images/default.jpg');
};

const HomeContent = ({
  handleUserIconPress,
  handleLogout,
  name,
  handleDeveloper,
  dropdownVisible,
  handlePlateScan,
  dropdownPosition,
  handleAnalyze,
  handleAPI,
  setDropdownVisible,
  weatherData,
  navigation,
  galleryImages
}) => {
  return (
    <ImageBackground
      source={getWeatherImage(weatherData)}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Hello, {name ? name : 'Guest'}!</Text>
            <TouchableOpacity onPress={handleUserIconPress}>
              <Image source={userIcon} style={styles.userIcon} />
            </TouchableOpacity>
          </View>
          {dropdownVisible && (
           <View style={[styles.dropdownMenu, { top: dropdownPosition.top, left: dropdownPosition.left }]}>
           <TouchableOpacity style={styles.dropButton} onPress={handleLogout}>
             <FontAwesome name="sign-out" size={20} color="#FFF" style={styles.icon} />
             <Text style={styles.diagnosisButtonText}>Logout</Text>
           </TouchableOpacity>
          
         </View>
         
          )}
        </View>

        <View style={styles.weatherContainer}>
          <View style={styles.topSection}>
            <Text style={styles.locationText}>
              {weatherData ? `Here at ${weatherData.name}` : 'Loading location...'}
            </Text>
            <Text style={styles.descriptionText}>
              {weatherData ? `We have a ${weatherData.weather[0].description}!` : 'Loading condition...'}
            </Text>
          </View>
          <ImageBackground
            source={getWeatherImage(weatherData)}
            style={styles.weatherCardImage}
          >
            <View style={styles.weatherCard}>
              <View style={styles.row}>
                <View style={styles.weatherItem}>
                  <Icon name="thermometer-half" size={24} color="#4CAF50" />
                  <Text style={styles.weatherValue}>
                    {weatherData ? `${Math.round(weatherData.main.temp)}°F` : '...'}
                  </Text>
                  <Text style={styles.weatherLabel}>Temperature</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Icon name="tint" size={24} color="#03A9F4" />
                  <Text style={styles.weatherValue}>
                    {weatherData ? `${weatherData.main.humidity}%` : '...'}
                  </Text>
                  <Text style={styles.weatherLabel}>Humidity</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.weatherItem}>
                  <Icon name="cloud" size={24} color="#9C27B0" />
                  <Text style={styles.weatherValue}>
                    {weatherData ? `${weatherData.rain?.['1h'] || 0} mm` : '...'}
                  </Text>
                  <Text style={styles.weatherLabel}>Rainfall</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Icon name="tree" size={24} color="#FF9800" />
                  <Text style={styles.weatherValue}>
                    {weatherData ? `${weatherData.wind.speed} m/s` : '...'}
                  </Text>
                  <Text style={styles.weatherLabel}>Wind Speed</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
       
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.diagnosisButton} onPress={() => navigation.navigate('ScanProduct')}>
            <Icon name="search" size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.diagnosisButtonText}>Diagnosis Issues</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.diagnosisButton} onPress={() => navigation.navigate('AddCrop')}>
            <Icon name="plus" size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.diagnosisButtonText}>Add New Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.diagnosisButton} onPress={() => navigation.navigate('SoilMonitoring')}>
            <Icon name="globe" size={20} color="#FFF" style={styles.icon} />
            <Text style={styles.diagnosisButtonText}>Soil Monitoring</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gallery</Text>
        <Gallery images={galleryImages} />
        <View style={styles.sectionContainer}>
          
          <InsectScreen navigation={navigation} />
        </View>
    
    <CropScreen navigation={navigation} />

      </ScrollView>
    </ImageBackground>
  );
};

// Sample Gallery component
const Gallery = ({ images }) => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={styles.galleryImage}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.galleryContainer}
    />
  );
};

export default DashboardScreen;
