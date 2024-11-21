// CropScreen.js
import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text,  ScrollView, Image,Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';

const cropData = {
  "Cooler, Drier Months": {
    months: [11, 12, 1, 2], // November to February
    crops: [
      { name: 'Lettuce', 
        imageUri: 'https://cdn.pixabay.com/photo/2018/06/27/17/37/salad-3502149_640.jpg', 
        id: 'Lettuce', 
        details: 'Lettuce grows best in cool weather. It requires well-drained soil and full sunlight but can tolerate partial shade.', 
        germination: '7-14 days',
      temperature: 'Prefers 60-65°F (16-18°C).',
      soilType: 'Grows best in well-draining, fertile soil rich in organic matter.',
      growth: 'Typically ready to harvest in 30-70 days.',
        waterAmount: 'Requires 1-2 inches of water per week.',
      waterFrequency: 'Water 1-2 times per week.'
  },
  {
    name: 'Spinach',
    imageUri: 'https://cdn.pixabay.com/photo/2016/01/07/07/57/vegetables-1125420_640.jpg',
    details: 'Spinach thrives in cool weather and is best planted in early spring or fall. It prefers well-drained soil with plenty of organic matter.',
    germination: '7-14 days',
    temperature: '50-70°F (10-21°C)',
    soilType: 'Rich, well-drained, and moisture-retentive soil',
    growth: '40-50 days to maturity',
    waterAmount: '1-2 inches per week',
    waterFrequency: 'Every 5-7 days, maintain moist soil',
  },
  
  {
    name: 'Radish',
    imageUri: 'https://cdn.pixabay.com/photo/2019/06/11/11/54/radishes-4266807_640.jpg',
    details: 'Radishes grow quickly and prefer cooler weather. They require well-drained soil and can be sown directly into the ground.',
    germination: '5-10 days',
    temperature: '50-65°F (10-18°C)',
    soilType: 'Light, well-drained soil, preferably sandy loam',
    growth: '25-30 days to maturity',
    waterAmount: '1 inch per week',
    waterFrequency: 'Every 5-7 days, avoid waterlogging',
  },
  {
    name: 'Garlic',
    imageUri: 'https://cdn.pixabay.com/photo/2018/10/14/18/58/garlic-3747176_640.jpg',
    details: 'Garlic requires well-drained soil and plenty of sunlight. It is usually planted in the fall or spring.',
    germination: '7-14 days',
    temperature: '60-80°F (16-27°C)',
    soilType: 'Fertile, well-drained soil with a pH of 6.0-7.0',
    growth: '150-210 days to maturity',
    waterAmount: '1 inch per week',
    waterFrequency: 'Every 7 days, reduce watering as harvest time approaches',
  }
,
{
  name: 'Onions',
  imageUri: 'https://cdn.pixabay.com/photo/2016/08/03/01/13/onion-1565604_640.jpg',
  details: 'Onions grow best in well-drained soil and full sun. They can be started from seeds, sets, or transplants.',
  germination: '7-10 days',
  temperature: '60-75°F (16-24°C)',
  soilType: 'Loamy soil with good drainage and rich in organic matter',
  growth: '90-180 days to maturity, depending on variety',
  waterAmount: '1 inch per week',
  waterFrequency: 'Every 5-7 days, more frequent during dry spells',
}
,
  {
    name: 'Peas',
    imageUri: 'https://cdn.pixabay.com/photo/2017/07/04/00/18/pea-2469490_640.jpg',
    details: 'Peas prefer cool temperatures and are often sown early in the spring. They grow well in well-drained, rich soil.',
    germination: '7-14 days',
    temperature: '45-75°F (7-24°C)',
    soilType: 'Loamy soil with good drainage',
    growth: '60-70 days to maturity',
    waterAmount: '1-2 inches per week',
    waterFrequency: 'Every 7 days, keep soil consistently moist',
  },
  {
    name: 'Cabbage',
    imageUri: 'https://cdn.pixabay.com/photo/2018/10/03/21/57/cabbage-3722498_1280.jpg',
    details: 'Cabbage prefers cool weather and well-drained soil. It can be grown in spring or fall.',
    germination: '7-10 days',
    temperature: '60-70°F (15-21°C)',
    soilType: 'Fertile, well-drained soil rich in organic matter',
    growth: '70-100 days to maturity',
    waterAmount: '1-1.5 inches per week',
    waterFrequency: 'Every 5-7 days, keep soil evenly moist',
  }
,  
{
  name: 'Cauliflower',
  imageUri: 'https://cdn.pixabay.com/photo/2024/04/24/14/14/ai-generated-8717843_640.jpg',
  details: 'Cauliflower prefers cool temperatures and needs rich, well-drained soil for optimal growth.',
  germination: '7-12 days',
  temperature: '60-70°F (15-21°C)',
  soilType: 'Well-drained, fertile soil with high organic matter',
  growth: '70-100 days to maturity',
  waterAmount: '1-1.5 inches per week',
  waterFrequency: 'Every 5-7 days, maintain consistent moisture',
}
,
    ],
  },
  "Hottest Months": {
    months: [3, 4, 5], // March to May
    crops: [
      {
        name: 'Tomatoes',
        imageUri: 'https://cdn.pixabay.com/photo/2021/09/10/21/18/tomatoes-6614242_640.jpg',
        details: 'Tomatoes require warm weather and should be planted after the last frost. They prefer well-drained, nutrient-rich soil.',
        germination: '5-10 days',
        temperature: '70-85°F (21-29°C)',
        soilType: 'Fertile, well-drained soil with a pH of 6.0 to 6.8',
        growth: '60-90 days to maturity',
        waterAmount: '1-2 inches per week',
        waterFrequency: 'Every 5-7 days, deep watering is essential',
      }
      ,
      {
        name: 'Peppers',
        imageUri: 'https://cdn.pixabay.com/photo/2023/12/09/21/03/chilli-pepper-8440176_640.jpg',
        details: 'Peppers thrive in warm weather and require full sun. They need well-drained, fertile soil to produce well.',
        germination: '7-14 days',
        temperature: '70-85°F (21-29°C)',
        soilType: 'Loamy or sandy soil with good drainage',
        growth: '60-90 days to maturity',
        waterAmount: '1-2 inches per week',
        waterFrequency: 'Every 5-7 days, avoid overhead watering',
      }
      ,
      {
        name: 'Eggplant',
        imageUri: 'https://cdn.pixabay.com/photo/2021/01/09/13/34/eggplant-5902352_640.jpg',
        details: 'Eggplants prefer warm conditions and should be planted after the last frost. They need rich, well-drained soil.',
        germination: '7-14 days',
        temperature: '70-85°F (21-29°C)',
        soilType: 'Well-drained, rich soil with high organic matter',
        growth: '70-80 days to maturity',
        waterAmount: '1-2 inches per week',
        waterFrequency: 'Every 5-7 days, consistent moisture is key',
      }
      ,
      {
        name: 'Corn',
        imageUri: 'https://cdn.pixabay.com/photo/2023/05/30/14/49/corn-8028831_1280.jpg',
        details: 'Corn requires warm soil and plenty of sunlight. It grows best in well-drained, nutrient-rich soil.',
        germination: '7-12 days',
        temperature: '60-95°F (15-35°C)',
        soilType: 'Loamy soil with good drainage',
        growth: '60-100 days to maturity',
        waterAmount: '1-1.5 inches per week',
        waterFrequency: 'Every 7 days, especially during dry spells',
      }
      ,
      {
        name: 'Zucchini',
        imageUri: 'https://cdn.pixabay.com/photo/2016/06/23/10/33/zucchini-1477378_640.jpg',
        details: 'Zucchini thrives in warm weather and requires well-drained soil with full sun exposure.',
        germination: '7-14 days',
        temperature: '70-95°F (21-35°C)',
        soilType: 'Fertile, well-drained soil with good organic content',
        growth: '50-65 days to maturity',
        waterAmount: '1-2 inches per week',
        waterFrequency: 'Every 5-7 days, water deeply',
      }
,
{
  name: 'Squash',
  imageUri: 'https://cdn.pixabay.com/photo/2020/07/31/06/07/squash-4450251_640.jpg',
  details: 'Squash prefers warm weather and well-drained soil. It can be direct-seeded or transplanted.',
  germination: '7-14 days',
  temperature: '70-95°F (21-35°C)',
  soilType: 'Loamy, well-drained soil rich in organic matter',
  growth: '50-90 days to maturity, depending on variety',
  waterAmount: '1-2 inches per week',
  waterFrequency: 'Every 5-7 days, avoid overhead watering',
}
,
{
  name: 'Pumpkin',
  imageUri: 'https://cdn.pixabay.com/photo/2019/10/04/19/14/pumpkins-4542414_640.jpg',
  details: 'Pumpkins thrive in warm conditions and require plenty of sunlight. They prefer rich, well-drained soil.',
  germination: '7-14 days',
  temperature: '70-90°F (21-32°C)',
  soilType: 'Fertile, well-drained soil with a pH of 6.0-6.8',
  growth: '75-120 days to maturity',
  waterAmount: '1-2 inches per week',
  waterFrequency: 'Every 5-7 days, keep soil consistently moist',
}

    ],
  },
  "Early Rainy Season": {
    months: [6, 7, 8], // June to August
    crops: [
      {
        name: 'Leafy Greens',
        imageUri: 'https://cdn.pixabay.com/photo/2018/12/07/00/19/savoy-cabbage-3860933_1280.jpg',
        details: 'Leafy greens like cool weather and can be sown in early spring or late summer. They prefer fertile, well-drained soil.',
        germination: '7-14 days',
        temperature: '50-70°F (10-21°C)',
        soilType: 'Fertile, well-drained soil rich in organic matter',
        growth: '30-60 days to maturity, depending on variety',
        waterAmount: '1-2 inches per week',
        waterFrequency: 'Every 5-7 days, keep soil moist but not soggy',
      }
      ,
      {
        name: 'Cauliflower',
        imageUri: 'https://cdn.pixabay.com/photo/2024/04/24/14/14/ai-generated-8717843_640.jpg',
        details: 'Cauliflower prefers cool temperatures and needs rich, well-drained soil for optimal growth.',
        germination: '7-12 days',
        temperature: '60-70°F (15-21°C)',
        soilType: 'Well-drained, fertile soil with high organic matter',
        growth: '70-100 days to maturity',
        waterAmount: '1-1.5 inches per week',
        waterFrequency: 'Every 5-7 days, maintain consistent moisture',
      }
,      
      {
        name: 'Cabbage',
        imageUri: 'https://cdn.pixabay.com/photo/2018/10/03/21/57/cabbage-3722498_1280.jpg',
        details: 'Cabbage prefers cool weather and well-drained soil. It can be grown in spring or fall.',
        germination: '7-10 days',
        temperature: '60-70°F (15-21°C)',
        soilType: 'Fertile, well-drained soil rich in organic matter',
        growth: '70-100 days to maturity',
        waterAmount: '1-1.5 inches per week',
        waterFrequency: 'Every 5-7 days, keep soil evenly moist',
      }
,      
      {
        name: 'Beans',
        imageUri: 'https://cdn.pixabay.com/photo/2022/07/04/10/41/beans-7300846_640.jpg',
        details: 'Beans grow best in warm weather and are best planted after the last frost. They thrive in well-drained soil.',
        germination: '7-14 days',
        temperature: '60-85°F (16-29°C)',
        soilType: 'Well-drained, light to medium soil',
        growth: '50-70 days to maturity',
        waterAmount: '1 inch per week',
        waterFrequency: 'Every 5-7 days, especially during dry periods',
      }
      ,
      {
        name: 'Okra',
        imageUri: 'https://cdn.pixabay.com/photo/2020/08/02/12/39/plant-5457543_640.jpg',
        details: 'Okra prefers warm weather and should be planted after the last frost. It thrives in fertile, well-drained soil.',
        germination: '7-14 days',
        temperature: '75-90°F (24-32°C)',
        soilType: 'Fertile, well-drained soil with a pH of 6.5-7.5',
        growth: '50-65 days to maturity',
        waterAmount: '1 inch per week',
        waterFrequency: 'Every 5-7 days, especially in dry spells',
      }
      ,
    ],
  },
  "Peak Rainy Season": {
    months: [9, 10, 11], // September to November
    crops: [
      {
        name: 'Taro',
        imageUri: 'https://cdn.pixabay.com/photo/2017/10/07/09/44/taro-root-2825925_640.jpg',
        details: 'Taro thrives in warm, humid conditions and requires a lot of water. It prefers rich, well-drained soil.',
        germination: '14-30 days',
        temperature: '70-95°F (21-35°C)',
        soilType: 'Rich, loamy soil with good moisture retention',
        growth: '180-365 days to maturity, depending on variety',
        waterAmount: 'Consistent moisture, keep soil wet',
        waterFrequency: 'Water daily or keep submerged in wetland conditions',
      }
      ,
      { name: 'Carrots', imageUri: 'https://cdn.pixabay.com/photo/2018/05/29/23/23/carrots-3440368_1280.jpg', id: 'Carrots',
        details: 'Carrots prefer cool weather and grow best in loose, well-drained soil. They can be sown directly into the ground.',
        germination: '14-21 days',
        temperature: '60-70°F (15-21°C)',
        soilType: 'Loose, sandy loam with good drainage',
        growth: '70-80 days to maturity',
        waterAmount: '1 inch per week',
        waterFrequency: 'Every 5-7 days, keep soil moist',
       },
       {
        name: 'Root Crops',
        imageUri: 'https://imgs.search.brave.com/O-VIDAbaMC-BY1zos7ZuAqxaJlkNEzdWzCITVdHc0AY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9leHRl/bnNpb24udXN1LmVk/dS92ZWdldGFibGVn/dWlkZS9pbWFnZXMv/cm9vdHMtaW1hZ2Vz/L3Jvb3Rjcm9wc19m/YXJteWFyZGZyZXNo/LkpQRw',
        details: 'Root crops prefer loose, well-drained soil with plenty of organic matter. They thrive in cooler weather but can also be grown in warmer temperatures, depending on the specific type of crop.',
        germination: 'Carrots: 14-21 days, Beets: 5-10 days, Potatoes: 14-30 days',
        temperature: 'Ideal temperature range is typically between 60°F to 75°F (15°C to 24°C).',
        soilType: 'Loamy or sandy soils are preferred for good drainage and root development.',
        growth: 'Carrots: 70-80 days, Beets: 55-70 days, Potatoes: 70-120 days (varies by type).',
        waterAmount: 'Root crops generally require about 1 inch (2.5 cm) of water per week, depending on the climate and soil type.',
        waterFrequency: 'Regular watering is essential, especially during dry periods, but avoid waterlogging. Deep watering is recommended to encourage deep root growth.'
      },
       ],
  },
};

const CropScreen = () => {
  const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)
  const currentSeason = Object.values(cropData).find(season => season.months.includes(currentMonth));

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const openModal = (crop) => {
    setSelectedCrop(crop);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCrop(null);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Best Crops to Plant This Month</Text>
      <Text style={styles.seasonLabel}>Season: {Object.keys(cropData).find(season => cropData[season] === currentSeason)}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {currentSeason?.crops.map((crop, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(crop)}>
            <Image source={{ uri: crop.imageUri }} style={styles.galleryImage} />
            <Text style={styles.cropName}>{crop.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for crop details */}
      {selectedCrop && (
  <Modal visible={modalVisible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.cropTitle}>{selectedCrop.name}</Text>
        <Image source={{ uri: selectedCrop.imageUri }} style={styles.modalImage} />

        {/* Crop Details with Borders and Icons */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              🌱 Details: {selectedCrop.details}
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              🌱 Germination: {selectedCrop.germination}
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              🌍 Soil Type: {selectedCrop.soilType}
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              📅 Growth Duration: {selectedCrop.growth}
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              🌡️ Temperature: {selectedCrop.temperature}
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              💧 Water Amount: {selectedCrop.waterAmount}
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.cropDetails}>
              ⏳ Water Frequency: {selectedCrop.waterFrequency}
            </Text>
          </View>
        </View>
        
        <Button title="Close" onPress={closeModal} />
      </View>
    </View>
  </Modal>
)}


    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  seasonLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  galleryImage: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  cropName: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  cropTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  cropDetails: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
});

export default CropScreen;