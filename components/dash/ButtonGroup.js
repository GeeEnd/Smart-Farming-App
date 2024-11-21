import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonGroup = ({ navigation }) => (
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
      <Text style={styles.diagnosisButtonText}>Monitor Fields</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  diagnosisButton: {
    flex: 1,
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',  // Arrange icon and text side-by-side
    alignItems: 'center',  // Align icon and text vertically
  },
  diagnosisButtonText: {
    color: '#FFF',
    fontSize: 12,
    marginRight: 10,
    marginLeft: 8,
    padding: 2,  // Add space between icon and text
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  }
});

export default ButtonGroup;
