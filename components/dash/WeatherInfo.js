import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

// Import local images
const weatherImages = {
  Clear: require('D:\Projects\MobileProgrammingProject\version1\assets\images\sunny.jpg'),
  Rain: require('./assets/rainy.png'),
  Clouds: require('./assets/cloudy.png'),
  // Add more conditions and corresponding images as needed
};

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);

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

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Determine the appropriate image based on weather condition
  const getWeatherImage = () => {
    if (!weatherData) return null;
    const mainWeather = weatherData.weather[0].main; // e.g., "Clear", "Rain", "Clouds"
    return weatherImages[mainWeather] || weatherImages.Clear; // Fallback to Clear if not found
  };

  return (
    <View style={styles.weatherContainer}>
       <ImageBackground
      source={require('../assets/images/sunny.jpg')} // Use require for local images
      style={styles.weatherCard}
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
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItem: {
    alignItems: 'center',
    flex: 1,
  },
  weatherValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherLabel: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  locationText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 5,
  },
  descriptionText: {
    color: '#000',
    fontSize: 14,
  },
  topSection: {
    marginBottom: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default WeatherInfo;
