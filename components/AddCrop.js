import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Import Firestore instance

const CropsScreen = () => {
  const [cropName, setCropName] = useState('');
  const [waterFrequency, setWaterFrequency] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [humidityLevel, setHumidityLevel] = useState('');
  const [cropDescription, setCropDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [germination, setGermination] = useState('');
  const [growthDuration, setGrowthDuration] = useState('');
  const [harvesting, setHarvesting] = useState('');
  const [soil, setSoil] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [temperature, setTemperature] = useState('');
  const navigation = useNavigation();

  const addCrop = async () => {
    if (cropName && waterFrequency && waterAmount && humidityLevel && cropDescription && imageURL && germination && growthDuration && harvesting && soil && sunlight && temperature) {
      try {
        const cropData = {
          name: cropName,
          waterFrequency,
          waterAmount,
          humidityLevel,
          description: cropDescription,
          imageURL,
          germination,
          growthDuration,
          harvesting,
          soil,
          sunlight,
          temperature
        };

        const cropRef = await addDoc(collection(db, 'crops'), cropData);
        console.log('Crop added with ID:', cropRef.id);
        Alert.alert('Success', 'Crop added successfully!');
        // Reset fields
        setCropName('');
        setWaterFrequency('');
        setWaterAmount('');
        setHumidityLevel('');
        setCropDescription('');
        setImageURL('');
        setGermination('');
        setGrowthDuration('');
        setHarvesting('');
        setSoil('');
        setSunlight('');
        setTemperature('');
      } catch (error) {
        console.error('Error adding crop:', error);
      }
    } else {
      console.warn('Please fill in all required fields.');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/images.jpg')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Manage Crops</Text>
        </View>

        <TextInput style={styles.input} placeholder="Enter crop name" value={cropName} onChangeText={setCropName} />
        <TextInput style={styles.input} placeholder="Enter crop description" value={cropDescription} onChangeText={setCropDescription} />
        <TextInput style={styles.input} placeholder="Enter water frequency (e.g., every 2 weeks)" value={waterFrequency} onChangeText={setWaterFrequency} />
        <TextInput style={styles.input} placeholder="Enter water amount (e.g., 1 cup)" value={waterAmount} onChangeText={setWaterAmount} />
        <TextInput style={styles.input} placeholder="Enter humidity level (e.g., high, medium, low)" value={humidityLevel} onChangeText={setHumidityLevel} />
        <TextInput style={styles.input} placeholder="Enter Image URL" value={imageURL} onChangeText={setImageURL} />
        <TextInput style={styles.input} placeholder="Enter Germination" value={germination} onChangeText={setGermination} />
        <TextInput style={styles.input} placeholder="Enter Growth Duration" value={growthDuration} onChangeText={setGrowthDuration} />
        <TextInput style={styles.input} placeholder="Enter Harvesting" value={harvesting} onChangeText={setHarvesting} />
        <TextInput style={styles.input} placeholder="Enter Soil" value={soil} onChangeText={setSoil} />
        <TextInput style={styles.input} placeholder="Enter Sunlight" value={sunlight} onChangeText={setSunlight} />
        <TextInput style={styles.input} placeholder="Enter Temperature" value={temperature} onChangeText={setTemperature} />

        <TouchableOpacity style={styles.addButton} onPress={addCrop}>
          <Text style={styles.buttonText}>Add Crop</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    
  },
  backgroundImage: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: 'black',
  },
  addButton: {
    backgroundColor: 'rgba(49, 81, 30, 0.9)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CropsScreen;
