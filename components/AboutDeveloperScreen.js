import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutDeveloperScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/samp.jpg')} // Add a background image for visual appeal
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Overlay for readability */}
      <View style={styles.overlay} />

      {/* Go Back Button */}
      <View style={styles.topBar}>
      <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => {
                console.log("Go Back button pressed");
                navigation.goBack();
            }}
            >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
            
            </TouchableOpacity>

    </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>About the Developers</Text>

        {/* Lead Developer Section */}
        <View style={styles.card}>
          <Image source={require('../assets/images/gil.jpg')} style={styles.profilePic} />
          <Text style={styles.name}>Gil Nicholas Cagande</Text>
          <Text style={styles.role}>Lead Developer</Text>
          <Text style={styles.description}>
            Gil Nicholas Cagande, the mind behind Field Vision, is dedicated to integrating AI and IoT
            technologies to revolutionize farming. With a strong background in software development,
            Gil has been instrumental in conceptualizing and developing the app to provide real-time 
            insights and empower farmers.
          </Text>
        </View>

        {/* Team Members */}
        <Text style={styles.teamHeader}>Team Members</Text>

        <View style={styles.card}>
          <Image source={require('../assets/images/klevie.png')} style={styles.profilePic} />
          <Text style={styles.name}>Klevie Jun Caseres</Text>
          <Text style={styles.role}>Backend Developer</Text>
          <Text style={styles.description}>
            Klevie specializes in creating robust backend systems, ensuring Field Vision is reliable and efficient.
            His expertise in database management and server architecture has been key to the app’s success.
          </Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/joseph.jpg')} style={styles.profilePic} />
          <Text style={styles.name}>Joseph Abella</Text>
          <Text style={styles.role}>UI/UX Designer</Text>
          <Text style={styles.description}>
            Joseph brings Field Vision to life with a seamless and intuitive design. His eye for detail
            ensures that the app remains user-friendly, making complex data easily accessible for farmers.
          </Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/john.jpg')} style={styles.profilePic} />
          <Text style={styles.name}>John Lloyd Rojo</Text>
          <Text style={styles.role}>QA and Tester</Text>
          <Text style={styles.description}>
            John is responsible for maintaining the app's quality. His thorough testing processes
            ensure Field Vision operates smoothly, providing a reliable experience for every user.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent overlay for readability
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    paddingTop: 50,
  },

  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 20,
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  teamHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default AboutDeveloperScreen;
