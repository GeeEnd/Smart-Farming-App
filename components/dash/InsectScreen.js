import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InsectsScreen = ({ navigation }) => {
  const handleInsectScan = () => navigation.navigate('InsectScreen');
  const handleViewInsects = () => navigation.navigate('mole');
  const handleAPI = () => navigation.navigate('ScanAPI');

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Common Insects</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.diagnosisButton} onPress={handleInsectScan}>
          <Icon name="bug" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.diagnosisButtonText}>Insect Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.diagnosisButton} onPress={handleViewInsects}>
          <Icon name="bug" size={20} color="#FFF" style={styles.icon} />
          <Text style={styles.diagnosisButtonText}>View Insects</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Insect Cards */}
        <View style={styles.insectCard}>
          <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/16/13/57/mole-cricket-1260757_960_720.jpg' }} style={styles.insectImage} />
          <Text style={styles.diseaseTitle}>African Mole Cricket</Text>
          <Text style={styles.diseaseCategory}>Insect</Text>
        </View>
       
        <View style={styles.insectCard}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2015/05/07/18/02/aphids-756836_1280.jpg' }} 
            style={styles.insectImage}
          />
          <Text style={styles.diseaseTitle}>Aphid</Text>
          <Text style={styles.diseaseCategory}>Insect</Text>
        </View>
        <View style={styles.insectCard}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2023/12/21/01/20/fly-8461020_1280.jpg' }} 
            style={styles.insectImage}
          />
          <Text style={styles.diseaseTitle}>Whitefly</Text>
          <Text style={styles.diseaseCategory}>Insect</Text>
        </View>
        <View style={styles.insectCard}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2018/06/01/17/52/grasshopper-3446884_1280.jpg' }} 
            style={styles.insectImage}
          />
          <Text style={styles.diseaseTitle}>Grasshopper</Text>
          <Text style={styles.diseaseCategory}>Insect</Text>
        </View>
        <View style={styles.insectCard}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2016/11/28/20/13/desert-locust-1865955_1280.jpg' }} 
            style={styles.insectImage}
          />
          <Text style={styles.diseaseTitle}>Desert Locust</Text>
          <Text style={styles.diseaseCategory}>Insect</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  diagnosisButton: {
    flex: 1,
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    padding: 10,
    marginBottom: 2,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',  // Arrange icon and text side-by-side
    alignItems: 'center',  // Align icon and text vertically
  },
  diagnosisButtonText: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: 8,  // Add space between icon and text
  },
  insectCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  insectImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default InsectsScreen;
