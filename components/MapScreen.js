import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MapScreen = () => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedField } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [currentFieldData, setCurrentFieldData] = useState({});

    const areaData = {
        'Potato Fields': {
            latitude: 8.1321, longitude: 125.1300, area: '0.35 ha',
            soilHealth: 'Excellent', soilHealthPercentage: 90, pHLevel: 6.5, pHLevelPercentage: 85,
            moistureLevel: 'Moderate', moistureLevelPercentage: 70, nutrientLevel: 'High', nutrientLevelPercentage: 95,
            cropHealth: 'Healthy', irrigationRecommendation: 'Water every 3 days', name: 'Potato Fields'
        },
        'Tomato Fields': {
            latitude: 8.1350, longitude: 125.1345, area: '0.42 ha',
            soilHealth: 'Excellent', soilHealthPercentage: 92, pHLevel: 7.5, pHLevelPercentage: 75,
            moistureLevel: 'Moderate', moistureLevelPercentage: 60, nutrientLevel: 'High', nutrientLevelPercentage: 90,
            cropHealth: 'Healthy', irrigationRecommendation: 'Water every 2-3 hours', name: 'Tomato Fields'
        },
        'Sweet Potato Fields': {
            latitude: 8.1295, longitude: 125.1250, area: '0.30 ha',
            soilHealth: 'Moderate', soilHealthPercentage: 80, pHLevel: 5.5, pHLevelPercentage: 85,
            moistureLevel: 'Good', moistureLevelPercentage: 70, nutrientLevel: 'Low', nutrientLevelPercentage: 55,
            cropHealth: 'Healthy', irrigationRecommendation: 'Water every 5 days', name: 'Sweet Potato Fields'
        },
        'Rice Fields': {
            latitude: 8.1305, longitude: 125.1325, area: '0.50 ha',
            soilHealth: 'Poor', soilHealthPercentage: 40, pHLevel: 5.2, pHLevelPercentage: 60,
            moistureLevel: 'Low', moistureLevelPercentage: 30, nutrientLevel: 'Medium', nutrientLevelPercentage: 50,
            cropHealth: 'Pest Infestation Detected', irrigationRecommendation: 'Water daily', name: 'Rice Fields'
        },
        'Corn Fields': {
            latitude: 8.1365, longitude: 125.1265, area: '0.28 ha',
            soilHealth: 'Moderate', soilHealthPercentage: 70, pHLevel: 6.0, pHLevelPercentage: 75,
            moistureLevel: 'High', moistureLevelPercentage: 80, nutrientLevel: 'Low', nutrientLevelPercentage: 40,
            cropHealth: 'Nutrient Deficiency Detected', irrigationRecommendation: 'Water every 5 days', name: 'Corn Fields'
        },
        'Carrots Fields': {
            latitude: 8.1340, longitude: 125.1280, area: '0.22 ha',
            soilHealth: 'Good', soilHealthPercentage: 80, pHLevel: 7.0, pHLevelPercentage: 90,
            moistureLevel: 'Moderate', moistureLevelPercentage: 70, nutrientLevel: 'Optimal', nutrientLevelPercentage: 85,
            cropHealth: 'Very Healthy', irrigationRecommendation: 'Water every 4 days', name: 'Carrots Fields'
        }
    };
    
    const polygons = [
        {
            name: 'Potato Fields',
            coordinates: [
                { latitude: 8.1310, longitude: 125.1285 },
                { latitude: 8.1315, longitude: 125.1295 },
                { latitude: 8.1320, longitude: 125.1290 },
                { latitude: 8.1320, longitude: 125.1280 },
                { latitude: 8.1310, longitude: 125.1280 },
            ],
        },
        {
            name: 'Tomato Fields',
            coordinates: [
                { latitude: 8.1340, longitude: 125.1335 },
                { latitude: 8.1350, longitude: 125.1345 },
                { latitude: 8.1355, longitude: 125.1340 },
                { latitude: 8.1350, longitude: 125.1330 },
                { latitude: 8.1340, longitude: 125.1330 },
            ],
        },
        {
            name: 'Sweet Potato Fields',
            coordinates: [
                { latitude: 8.1295, longitude: 125.1250 },
                { latitude: 8.1300, longitude: 125.1260 },
                { latitude: 8.1305, longitude: 125.1255 },
                { latitude: 8.1300, longitude: 125.1245 },
                { latitude: 8.1295, longitude: 125.1245 },
            ],
        },
        {
            name: 'Rice Fields',
            coordinates: [
                { latitude: 8.1290, longitude: 125.1325 },
                { latitude: 8.1295, longitude: 125.1335 },
                { latitude: 8.1300, longitude: 125.1330 },
                { latitude: 8.1300, longitude: 125.1315 },
                { latitude: 8.1290, longitude: 125.1315 },
            ],
        },
        {
            name: 'Corn Fields',
            coordinates: [
                { latitude: 8.1360, longitude: 125.1255 },
                { latitude: 8.1370, longitude: 125.1265 },
                { latitude: 8.1375, longitude: 125.1260 },
                { latitude: 8.1370, longitude: 125.1250 },
                { latitude: 8.1360, longitude: 125.1250 },
            ],
        },
        {
            name: 'Carrots Fields',
            coordinates: [
                { latitude: 8.1335, longitude: 125.1295 },
                { latitude: 8.1340, longitude: 125.1305 },
                { latitude: 8.1345, longitude: 125.1300 },
                { latitude: 8.1340, longitude: 125.1285 },
                { latitude: 8.1335, longitude: 125.1290 },
            ],
        },
        // Define more polygons for other fields as needed
    ];
    
    
    useEffect(() => {
        if (selectedField && mapRef.current) {
            const selectedRegion = areaData[selectedField];
            mapRef.current.animateToRegion({
                ...selectedRegion,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setCurrentFieldData(selectedRegion);
            setModalVisible(true);
        }
    }, [selectedField]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 8.1335,
                    longitude: 125.1290,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {Object.entries(areaData).map(([field, data], index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
                        title={field}
                        onPress={() => {
                            setCurrentFieldData(data);
                            setModalVisible(true);
                        }}
                    >
                        <View style={styles.markerContainer}>
                            <Text style={styles.markerText}>{field}</Text>
                            <Text style={styles.markerSubText}>{data.area}</Text>
                        </View>
                    </Marker>
                ))}

                {polygons.map((polygon, index) => (
                    <Polygon
                        key={index}
                        coordinates={polygon.coordinates}
                        strokeColor="rgba(0,0,0,0.5)"
                        fillColor="rgba(0,0,0,0.1)"
                        strokeWidth={2}
                    />
                ))}
            </MapView>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Text style={styles.controlText}>-</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for displaying field information */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{currentFieldData.name || ''}</Text>

                        <Text style={styles.modalSubtitle}>Soil Health</Text>
                        <View style={styles.infoContainer}>
                            <Icon name="leaf" size={20} color="#4CAF50" />
                            <Text style={styles.infoText}>{currentFieldData.soilHealth || ''} ({currentFieldData.soilHealthPercentage || 0}%)</Text>
                        </View>

                        <Text style={styles.modalSubtitle}>pH Level</Text>
                        <View style={styles.infoContainer}>
                            <Icon name="flask" size={20} color="#2196F3" />
                            <Text style={styles.infoText}>{currentFieldData.pHLevel || ''} ({currentFieldData.pHLevelPercentage || 0}%)</Text>
                        </View>

                        <Text style={styles.modalSubtitle}>Moisture Level</Text>
                        <View style={styles.infoContainer}>
                            <Icon name="thermometer-half" size={20} color="#00BCD4" />
                            <Text style={styles.infoText}>{currentFieldData.moistureLevel || ''} ({currentFieldData.moistureLevelPercentage || 0}%)</Text>
                        </View>

                        <Text style={styles.modalSubtitle}>Nutrient Level</Text>
                        <View style={styles.infoContainer}>
                            <Icon name="leaf" size={20} color="#8BC34A" />
                            <Text style={styles.infoText}>{currentFieldData.nutrientLevel || ''} ({currentFieldData.nutrientLevelPercentage || 0}%)</Text>
                        </View>

                        <Text style={styles.modalSubtitle}>Crop Health</Text>
                        <View style={styles.infoContainer}>
                            <Icon name="heartbeat" size={20} color="#FF5722" />
                            <Text style={styles.infoText}>{currentFieldData.cropHealth || ''}</Text>
                        </View>

                        <Text style={styles.modalSubtitle}>Irrigation Recommendation</Text>
                        <View style={styles.infoContainer}>
                            <Icon name="tint" size={20} color="#03A9F4" />
                            <Text style={styles.infoText}>{currentFieldData.irrigationRecommendation || ''}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerText: {
        fontWeight: 'bold',
    },
    markerSubText: {
        fontSize: 12,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        fontWeight: 'bold',
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    controlButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    controlText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        marginLeft: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapScreen;