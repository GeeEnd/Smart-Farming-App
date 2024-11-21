import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AddEventScreen from '../components/AddEventScreen';
import { db } from '../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CalendarScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState({});
  const [eventList, setEventList] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [expandedDate, setExpandedDate] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const newEvents = {};
      const newEventList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.date;

        if (!newEvents[date]) {
          newEvents[date] = { marked: true, dotColor: data.color };
        }

        newEventList.push({ ...data, id: doc.id });
      });

      setEvents(newEvents);
      setEventList(newEventList);
    });

    return unsubscribe;
  }, []);

  const handleDayPress = (day) => {
    const eventsForDay = eventList.filter(event => event.date === day.dateString);
    setSelectedDayEvents(eventsForDay);
    setSelectedDate(day.dateString);

    if (expandedDate === day.dateString) {
      setExpandedDate(null);
    } else {
      setExpandedDate(day.dateString);
    }
  };

  const closeAddEvent = () => {
    setModalVisible(false);
  };

  const refreshEvents = () => {
    handleDayPress({ dateString: new Date().toISOString().split('T')[0] });
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      refreshEvents();
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Calendar</Text>
      <Calendar
        markedDates={events}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: '#27AE60',
          arrowColor: '#27AE60',
          todayTextColor: '#2980B9',
        }}
      />
      <FlatList
        data={expandedDate ? selectedDayEvents : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.eventItem, { backgroundColor: item.color }]}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>{item.eventName}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => { /* handle edit */ }}>
                  <Icon name="edit" size={24} color="#2C3E50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Alert.alert("Delete Event", "Are you sure?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: () => handleDeleteEvent(item.id), style: "destructive" }
                  ]);
                }}>
                  <Icon name="delete" size={24} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.eventDate}>{`${item.date} ${item.startTime}`}</Text>
            <Text>{item.description}</Text>
            <Text>{`Duration: ${item.duration} hour(s)`}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <AddEventScreen onClose={closeAddEvent} refreshEvents={refreshEvents} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2C3E50',
  },
  eventItem: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  eventDate: {
    color: '#555',
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 15,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31511E',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    marginLeft: 5,
    fontSize: 15,
  },
});

export default CalendarScreen;
