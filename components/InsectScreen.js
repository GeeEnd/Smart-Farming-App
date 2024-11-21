import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

// Dummy data to simulate database entries
const pestDatabase = [
    {
        name: "Aphid",
        description: "Small green, yellow, or black insects that suck sap from plants, often found on new growth.",
        affectedAppearance: "Leaves may curl, yellow, or become distorted. Sticky honeydew may appear on leaves, leading to sooty mold.",
        management: "Use insecticidal soap, neem oil, or introduce ladybugs as natural predators.",
        icon: "bug"
    },
    {
        name: "Spider Mite",
        description: "Tiny red or green mites that damage leaves by sucking sap, commonly appearing during hot, dry weather.",
        affectedAppearance: "Leaves may show yellow or bronze speckles and webbing may be visible on the underside of leaves.",
        management: "Increase humidity, spray water on the undersides of leaves, and use miticides if necessary.",
        icon: "bug"
    },
    {
        name: "Whitefly",
        description: "Small white insects that feed on plant sap, usually found on the undersides of leaves.",
        affectedAppearance: "Leaves may yellow, wilt, or drop prematurely. Plants can become weak and stunted.",
        management: "Use yellow sticky traps, insecticidal soap, or neem oil to control whiteflies.",
        icon: "bug"
    },
    {
        name: "Caterpillar",
        description: "Larvae of moths or butterflies that chew on leaves and stems.",
        affectedAppearance: "Leaves may have large holes or may be completely eaten. Caterpillars may be visible on the plant.",
        management: "Handpick caterpillars or use a biological control like Bacillus thuringiensis (Bt) to target caterpillars.",
        icon: "bug"
    },
    {
        name: "Leaf Miner",
        description: "Small larvae that burrow and create winding trails inside leaves.",
        affectedAppearance: "Leaves display white or brown squiggly lines as larvae eat through leaf tissue.",
        management: "Remove affected leaves and use neem oil to prevent further infestation.",
        icon: "bug"
    },
    {
        name: "Mealybug",
        description: "Small, white, cotton-like pests that feed on plant sap.",
        affectedAppearance: "Leaves may yellow and drop, with white cottony masses visible in leaf joints.",
        management: "Use rubbing alcohol on a cotton swab to remove mealybugs or apply insecticidal soap.",
        icon: "bug"
    },
    {
        name: "Thrips",
        description: "Tiny, slender insects that suck sap from leaves, buds, and flowers, causing damage.",
        affectedAppearance: "Leaves may show silver streaks or small black spots (excrement). Flowers may become distorted.",
        management: "Use blue sticky traps, insecticidal soap, or neem oil. Introduce predatory insects like lacewings.",
        icon: "bug"
    },
    {
        name: "Cutworm",
        description: "Larvae that chew through young plant stems at the base, often causing plants to collapse.",
        affectedAppearance: "Plants may wilt suddenly or be cut off at soil level. Cutworms are active at night.",
        management: "Place collars around stems, hand-pick cutworms, and use diatomaceous earth around plants.",
        icon: "bug"
    },
    {
        name: "Japanese Beetle",
        description: "Metallic green and copper-colored beetles that chew on leaves, flowers, and fruit.",
        affectedAppearance: "Leaves appear skeletonized, as beetles consume the tissue between veins.",
        management: "Hand-pick beetles, use row covers, or apply neem oil or insecticidal soap to deter them.",
        icon: "bug"
    },
    {
        name: "Stink Bug",
        description: "Shield-shaped bugs that suck sap from fruits, leaves, and stems, causing damage.",
        affectedAppearance: "Fruits may show sunken, discolored spots. Leaves may have a mottled appearance.",
        management: "Hand-pick bugs, use row covers, or apply insecticidal soap. Plant trap crops to attract them away from main crops.",
        icon: "bug"
    },
    {
        name: "Scale Insect",
        description: "Small, immobile pests covered in a hard shell that feed on plant sap.",
        affectedAppearance: "Leaves may yellow, drop, and become coated in honeydew. Scale insects appear as small, brown bumps on stems or leaves.",
        management: "Scrape off scales, use horticultural oil, or apply insecticidal soap.",
        icon: "bug"
    },
    {
        name: "Root Maggot",
        description: "Larvae of flies that feed on plant roots, affecting plant growth.",
        affectedAppearance: "Plants may wilt, turn yellow, and show stunted growth. Roots may have tunnels or small white larvae.",
        management: "Use row covers to prevent egg-laying, remove affected plants, and apply beneficial nematodes.",
        icon: "bug"
    },
    {
        name: "Grasshopper",
        description: "Large insects that chew on leaves, stems, and even flowers, causing extensive damage.",
        affectedAppearance: "Leaves may be chewed with large, irregular holes. Severe infestations can defoliate plants.",
        management: "Encourage natural predators like birds or use floating row covers. Apply kaolin clay to deter them.",
        icon: "bug"
    },
];

const diseaseDatabase = [
    {
        symptoms: "Yellowing leaves with spots.",
        treatment: "Fungicide application recommended.",
        icon: "medkit" // Icon name for diseases
    },
    {
        symptoms: "Wilting leaves and stunted growth.",
        treatment: "Improve soil drainage and apply fungicides.",
        icon: "medkit" // Icon name for diseases
    }
];

const CropHealthScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [pestInfo, setPestInfo] = useState(null);
    const [diseaseInfo, setDiseaseInfo] = useState(null);
    const navigation = useNavigation();

    const handleImageCapture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Camera permission is required to capture images.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            analyzeImage(result.assets[0].uri);
        }
    };

    const analyzeImage = async (uri) => {
        // Dummy analysis simulating comparison
        const randomPest = pestDatabase[Math.floor(Math.random() * pestDatabase.length)];
        const randomDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];

        // Simulate finding a pest and a disease
        setPestInfo(randomPest);
        setDiseaseInfo(randomDisease);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.header}>Insect Monitoring</Text>
            </View>

            <TouchableOpacity style={styles.imagePicker} onPress={handleImageCapture}>
                <Text style={styles.imagePickerText}>
                    {selectedImage ? "Image Captured" : "Tap to Capture Image"}
                </Text>
            </TouchableOpacity>

            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            )}

            {pestInfo && (
                <View style={styles.infoContainer}>
                    <View style={styles.iconRow}>
                      
                        <Text style={styles.sectionHeader}>Pest Detected:</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Icon name="bug" size={20} color="#4caf50" />
                        <Text style={styles.infoText}>{pestInfo.name}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Icon name="information-circle" size={20} color="#4caf50" />
                        <Text style={styles.infoText}>{pestInfo.description}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Icon name="checkmark-circle" size={20} color="#4caf50" />
                        <Text style={styles.infoText}>Management: {pestInfo.management}</Text>
                    </View>
                </View>
            )}

        </ScrollView>
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
    header: {
        fontSize: 20,
        textAlign: 'center',
    },
    imagePicker: {
        backgroundColor: '#e0e0e0',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePickerText: {
        fontSize: 16,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 4,
    },
    icon: {
        marginBottom: 8,
    },
});

export default CropHealthScreen;
