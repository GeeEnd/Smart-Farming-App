import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';

const App = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [plantName, setPlantName] = useState(null);
  const [plantHealth, setPlantHealth] = useState(null);
  const [healthPercentage, setHealthPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosedDisease, setDiagnosedDisease] = useState(null); // State for diagnosed disease

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  const fetchPlantData = async (base64Image) => {
    setLoading(true);
    try {
        const response = await fetch('https://plant.id/api/v3/identification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': 'pFPb44gtawEAerwfBimyzSAGsl9wmaK5DeLKaoklQ7RXZ8Wgyu', // Replace with your actual API key
            },
            body: JSON.stringify({ images: [base64Image] }),
        });

        const data = await response.json();
        console.log('API Response:', data);

        const suggestions = data?.result?.classification?.suggestions || [];
        const name = suggestions.length > 0 
            ? suggestions[0]?.plant_name || 'Unknown Plant' 
            : 'Unknown Plant';

        const isPlant = data?.result?.is_plant?.binary;
        const probability = Math.round(data?.result?.is_plant?.probability * 100);
        setHealthPercentage(probability);

        const health = isPlant 
            ? `Healthy - ${probability}%` 
            : 'Not a plant or Unhealthy';

        setPlantName(name);
        setPlantHealth(health);

        // Diagnose disease if it is a plant but unhealthy
        if (isPlant && probability < 80) {
            diagnoseDisease(); // Diagnose if it is an unhealthy plant
        } else if (!isPlant) {
            // Optionally handle the case for not a plant
            setDiagnosedDisease(null); // Ensure no disease is set if it's not a plant
        } else {
            setDiagnosedDisease(null); // Ensure no disease is set if health is good
        }

    } catch (error) {
        console.error('Error fetching plant data:', error);
        setPlantName('Error fetching plant data');
        setPlantHealth(null);
    } finally {
        setLoading(false);
    }
};

  const diseaseDatabase = [
    {
      symptoms: "Yellowing leaves with brown or black spots",
      affectedAppearance: "Leaves develop spots that expand and may fall off. Severe infections can defoliate the plant.",
      treatment: "Apply fungicide and remove affected leaves. Improve air circulation around the plant.",
      icon: "medkit"
    },
    {
      symptoms: "Wilting leaves and stunted growth, often with root rot",
      affectedAppearance: "Plant may wilt even with sufficient water. Roots appear dark and mushy.",
      treatment: "Improve soil drainage, avoid overwatering, and apply fungicides if needed.",
      icon: "medkit"
    },
    {
      symptoms: "White powdery spots on leaves",
      affectedAppearance: "Leaves have a white or gray powdery coating. Severe infections can cause leaf deformation.",
      treatment: "Apply sulfur-based fungicides and remove affected plant parts. Ensure good air circulation.",
      icon: "medkit"
    },
    {
      symptoms: "Leaves curling and turning brown at the edges",
      affectedAppearance: "Leaves may appear crisp or dry, often curling upwards. Stunted growth may also be observed.",
      treatment: "Check for pests or environmental stress; adjust watering and humidity levels.",
      icon: "alert-circle"
    },
    {
      symptoms: "Dark brown or black stems and leaves",
      affectedAppearance: "Stems may appear mushy or rotten, and leaves can wilt or fall off.",
      treatment: "Cut away affected parts, improve drainage, and avoid overwatering.",
      icon: "alert-circle"
    },
    {
      symptoms: "Sticky residue on leaves with webbing underneath",
      affectedAppearance: "Leaves may have a shiny appearance due to honeydew. Webs indicate spider mite infestations.",
      treatment: "Use insecticidal soap or neem oil to treat infestations; regularly clean leaves.",
      icon: "bug"
    },
    {
      symptoms: "Leaves develop brown edges with yellowing",
      affectedAppearance: "Leaf tips and margins turn brown and dry out while the leaf center may remain green.",
      treatment: "Adjust watering practices and ensure proper fertilization; avoid drought stress.",
      icon: "warning"
    },
    {
      symptoms: "Soft, water-soaked areas on leaves and stems",
      affectedAppearance: "Affected areas appear mushy and may lead to overall plant collapse.",
      treatment: "Remove affected parts, improve air circulation, and avoid overhead watering.",
      icon: "water"
    },
    {
      symptoms: "Black spots on fruits or flowers",
      affectedAppearance: "Fruits or flowers show signs of decay and may have soft, sunken spots.",
      treatment: "Remove affected parts, avoid overhead watering, and use fungicides as necessary.",
      icon: "fruit"
    },
    {
      symptoms: "Leaves appear mottled with yellow and green patches",
      affectedAppearance: "Interveinal chlorosis may occur, affecting the plant's overall vigor.",
      treatment: "Check for nutrient deficiencies, especially nitrogen; apply appropriate fertilizers.",
      icon: "leaf"
    },
    {
      symptoms: "Fungal growth on leaves resembling mold",
      affectedAppearance: "Leaves show visible fungal growth, often turning yellow and falling off.",
      treatment: "Apply antifungal treatments and ensure adequate spacing between plants for air circulation.",
      icon: "cloud"
    },
];


  const diagnoseDisease = () => {
    // Randomly select a disease from the diseaseDatabase
    const randomIndex = Math.floor(Math.random() * diseaseDatabase.length);
    const disease = diseaseDatabase[randomIndex];

    // Set the diagnosed disease with details from the randomly selected disease
    setDiagnosedDisease({
      symptoms: disease.symptoms,
      affectedAppearance: disease.affectedAppearance,
      treatment: disease.treatment,
    });
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setSelectedImage(result.assets[0].uri);
      await fetchPlantData(base64Image);
    }
  };

  const getHealthColor = () => {
    if (healthPercentage < 50) return '#FF0000';
    if (healthPercentage >= 60 && healthPercentage <= 75) return '#FFA500';
    return '#008000';
  };

  const renderDiseaseInfo = () => {
    if (diagnosedDisease) {
      return (
        <View style={styles.diseaseContainer}>
          <Text style={styles.diseaseTitle}>Diagnosed Disease:</Text>
          <View style={styles.diseaseInfo}>
            <Icon name={diagnosedDisease.icon} size={24} color="#FF0000" />
            <Text style={styles.diseaseText}>Symptoms: {diagnosedDisease.symptoms}</Text>
          </View>
          <Text style={styles.diseaseText}>Affected Appearance: {diagnosedDisease.affectedAppearance || "N/A"}</Text>
          <Text style={styles.diseaseText}>Treatment: {diagnosedDisease.treatment}</Text>
        </View>
      );
    }
    return null;
  };
  

  if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasMediaLibraryPermission === false) {
    return <Text>No access to media library</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Plant Assessment</Text>
      </View>
      
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Button title="Capture Image with Camera" onPress={captureImage} />
      </View>

      {loading && <Text style={styles.loadingText}>Assessing Plant...</Text>}
      
      {plantName && (
        <View style={styles.cardContainer}>
          {plantHealth && (
            <>
              <Text style={styles.cardTitle}>Health Assessment:</Text>
              <View style={styles.healthContainer}>
                <Icon name="heart" size={24} color={getHealthColor()} />
                <Text style={[styles.cardText, { color: getHealthColor() }]}>{plantHealth}</Text>
              </View>
              {renderDiseaseInfo()}
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    marginLeft: 5,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 16,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  healthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  diseaseContainer: {
    marginTop: 20,
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 8,
  },
  diseaseInfo: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center align items vertically
    marginBottom: 5, // Add spacing below this section
  },
  diseaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  diseaseText: {
    fontSize: 16,
    marginLeft: 10, // Add margin for spacing between icon and text
  },
});

export default App;
