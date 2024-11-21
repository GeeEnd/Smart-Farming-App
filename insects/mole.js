import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../config/firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'; // Icon library
import { useNavigation } from '@react-navigation/native';

const ViewInsectScreen = () => {
  const [insects, setInsects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsect, setSelectedInsect] = useState(null);
  const navigation = useNavigation(); // Use useNavigation hook

  useEffect(() => {
    const fetchInsects = async () => {
      try {
        const insectsCollection = collection(db, 'insects');
        const insectsSnapshot = await getDocs(insectsCollection);
        const insectsList = insectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInsects(insectsList);
      } catch (error) {
        console.error('Error fetching insect data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsects();
  }, []);

  const handleInsectSelect = (insect) => {
    setSelectedInsect(insect);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Insects</Text>
      </View>

      {selectedInsect ? (
        <View style={styles.detailContainer}>
          <TouchableOpacity onPress={() => setSelectedInsect(null)} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedInsect.imageURL }}
            style={styles.insectDetailImage}
          />
          <Text style={styles.insectDetailTitle}>{selectedInsect.name}</Text>
          
          <Text style={styles.insectDetailText}>
            <Icon name="information-circle" size={18} color="#007bff" /> Description
          </Text>
          <Text style={styles.insectDetailText}>
            <Icon name="body" size={18} color="#007bff" /> Physical Appearance: {selectedInsect.physicalAppearance}
          </Text>
          <Text style={styles.insectDetailText}>
            <Icon name="airplane" size={18} color="#007bff" /> Wings: {selectedInsect.wings}
          </Text>
          <Text style={styles.insectDetailText}>Habitat</Text>
          <Text style={styles.insectDetailText}>
            <Icon name="home" size={18} color="#007bff" /> Burrowing Behavior: {selectedInsect.burrowingBehavior}
          </Text>
          <Text style={styles.insectDetailText}>
            <Icon name="globe" size={18} color="#007bff" /> Geographic Distribution: {selectedInsect.geographicDistribution}
          </Text>
          <Text style={styles.insectDetailText}>Life Cycle and Behavior</Text>
          <Text style={styles.insectDetailText}>
            <Icon name="fast-food" size={18} color="#007bff" /> Diet: {selectedInsect.diet}
          </Text>
          <Text style={styles.insectDetailText}>
            <Icon name="git-branch" size={18} color="#007bff" /> Reproduction: {selectedInsect.reproduction}
          </Text>
          <Text style={styles.insectDetailText}>Ecological Role</Text>
          <Text style={styles.insectDetailText}>
            <Icon name="leaf" size={18} color="#007bff" /> Soil Aeration: {selectedInsect.soilAeration}
          </Text>
          <Text style={styles.insectDetailText}>
            <Icon name="bug" size={18} color="#007bff" /> Prey for Other Species: {selectedInsect.preyForOtherSpecies}
          </Text>
          <Text style={styles.insectDetailText}>Importance</Text>
          <Text style={styles.insectDetailText}>
            <Icon name="star" size={18} color="#007bff" /> Agricultural Impact: {selectedInsect.agriculturalImpact}
          </Text>
        </View>
      ) : (
        <View style={styles.insectList}>
          {insects.map((insect) => (
            <TouchableOpacity key={insect.id} style={styles.insectCard} onPress={() => handleInsectSelect(insect)}>
              <Image
                source={{ uri: insect.imageURL }} // Use the image URL from Firestore
                style={styles.insectImage}
              />
              <Text style={styles.insectTitle}>{insect.name}</Text>
              <Text style={styles.insectCategory}>{insect.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
},
  insectList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
},
  insectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: '48%', // Adjust width for card layout
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // For Android shadow effect
  },
  insectImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  insectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  insectCategory: {
    fontSize: 14,
    color: '#666',
  },
  loading: {
    marginTop: 50,
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#007bff',
  },
  insectDetailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  insectDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  insectDetailText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  },
});

export default ViewInsectScreen;
