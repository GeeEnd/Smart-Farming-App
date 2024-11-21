import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase'; // Firebase config file
import { collection, addDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const AddEventScreen = ({ onClose, refreshEvents }) => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(''); // New state for start time
  const [duration, setDuration] = useState(1); // New state for event duration in hours

  const handleAddEvent = async () => {
    try {
      await addDoc(collection(db, 'events'), {
        eventName: eventName,
        date: date,
        description: description,
        startTime: startTime,
        duration: duration,
      });
      Alert.alert('Event Added!', 'Your event has been saved.');
      refreshEvents(); // Call to refresh events on CalendarScreen
      onClose(); // Close the modal
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Schedule</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time (HH:mm)"
        value={startTime}
        onChangeText={setStartTime}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (hours)"
        value={String(duration)} // Convert duration to string for TextInput
        onChangeText={(text) => setDuration(Number(text))}
        placeholderTextColor="#aaa"
        keyboardType="numeric" // Numeric keyboard for duration input
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
        <Text style={styles.buttonText}>Save Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    paddingTop: 40,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    backgroundColor: '#31511E',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default AddEventScreen;
