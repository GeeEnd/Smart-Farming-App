import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/SoilMonitoringStyles';

const SoilMonitoringScreen = () => {
    const navigation = useNavigation();
    const areaData = {
        'Potato Fields': {
            soilHealth: 'Excellent',
            soilHealthPercentage: 90,
            pHLevel: 6.5,
            pHLevelPercentage: 85,
            moistureLevel: 'Moderate',
            moistureLevelPercentage: 70,
            nutrientLevel: 'High',
            nutrientLevelPercentage: 95,
            cropHealth: 'Healthy',
            irrigationRecommendation: 'Water every 3 days',
            imageUrl: 'https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg', // Replace with actual URL
        },
        'Tomato Fields': {
            soilHealth: 'Excellent',
            soilHealthPercentage: 92,
            pHLevel: 7.5,
            pHLevelPercentage: 75,
            moistureLevel: 'Moderate',
            moistureLevelPercentage: 60,
            nutrientLevel: 'High',
            nutrientLevelPercentage: 90,
            cropHealth: 'Healthy',
            irrigationRecommendation: 'Water every 2-3 hours',
            imageUrl: 'https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_1280.jpg', // Replace with actual URL
        },
        'Sweet Potato Fields': {
            soilHealth: 'Moderate',
            soilHealthPercentage: 80,
            pHLevel: 5.5,
            pHLevelPercentage: 85,
            moistureLevel: 'Good',
            moistureLevelPercentage: 70,
            nutrientLevel: 'Low',
            nutrientLevelPercentage: 55,
            cropHealth: 'Healthy',
            irrigationRecommendation: 'Water every 5 days',
            imageUrl: 'https://cdn.pixabay.com/photo/2018/07/24/13/01/vegetable-3559112_1280.jpg', // Replace with actual URL
        },
        'Rice Fields': {
            soilHealth: 'Poor',
            soilHealthPercentage: 40,
            pHLevel: 5.2,
            pHLevelPercentage: 60,
            moistureLevel: 'Low',
            moistureLevelPercentage: 30,
            nutrientLevel: 'Medium',
            nutrientLevelPercentage: 50,
            cropHealth: 'Pest Infestation Detected',
            irrigationRecommendation: 'Water daily',
            imageUrl: 'https://cdn.pixabay.com/photo/2017/08/25/05/30/in-rice-field-2679153_1280.jpg',
        },
        'Corn Fields': {
            soilHealth: 'Moderate',
            soilHealthPercentage: 70,
            pHLevel: 6.0,
            pHLevelPercentage: 75,
            moistureLevel: 'High',
            moistureLevelPercentage: 80,
            nutrientLevel: 'Low',
            nutrientLevelPercentage: 40,
            cropHealth: 'Nutrient Deficiency Detected',
            irrigationRecommendation: 'Water every 5 days',
            imageUrl: 'https://cdn.pixabay.com/photo/2023/05/30/14/49/corn-8028831_1280.jpg', // Replace with actual URL
        },
        'Carrots Fields': {
            soilHealth: 'Good',
            soilHealthPercentage: 80,
            pHLevel: 7.0,
            pHLevelPercentage: 90,
            moistureLevel: 'Moderate',
            moistureLevelPercentage: 70,
            nutrientLevel: 'Optimal',
            nutrientLevelPercentage: 85,
            cropHealth: 'Very Healthy',
            irrigationRecommendation: 'Water every 4 days',
            imageUrl: 'https://cdn.pixabay.com/photo/2018/05/29/23/23/carrots-3440368_1280.jpg', // Replace with actual URL
        },
    };

    const [selectedArea, setSelectedArea] = useState('Potato Fields');

    const getPercentageColor = (percentage) => {
        if (percentage < 50) {
            return styles.red;
        } else if (percentage >= 50 && percentage <= 75) {
            return styles.orange;
        } else {
            return styles.green;
        };
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.header}>Soil Monitoring</Text>
            </View>

            <View style={styles.cardContainer}>
                {Object.keys(areaData).map((area) => (
                    <View key={area} style={styles.card}>
                        <Image source={{ uri: areaData[area].imageUrl }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{area}</Text>
                    
                        <TouchableOpacity
                            style={styles.goFieldButton}
                            onPress={() => {
                                setSelectedArea(area);
                                navigation.navigate('MapScreen', {
                                    selectedField: area,
                                    areaDetails: areaData[area], // Pass the area details to the Map screen
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>Go To Field</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};



export default SoilMonitoringScreen;
