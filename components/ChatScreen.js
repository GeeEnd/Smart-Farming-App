import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import userIcon from '../assets/images/profile.png';
import { db } from '../config/firebase'; // Import your Firestore db instance
import { collection, query, onSnapshot } from 'firebase/firestore';

const ChatScreen = ({ navigation, route }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = route.params;

  useEffect(() => {
    const fetchActiveUsers = () => {
      const usersQuery = query(
        collection(db, 'users')
      );

      const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActiveUsers(usersData);
        setLoading(false); // Set loading to false after fetching users
      }, (error) => {
        console.error("Error fetching users: ", error);
        setLoading(false); // Also set loading to false on error
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    };

    fetchActiveUsers();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('SingleChat', { name: name, userId: item.id, userName: item.name })}>
      <View style={styles.userContainer}>
        <Image source={userIcon} style={styles.userIcon} />
        <Text style={styles.userName}>
          {item.name}
          {item.unreadCount > 0 && ` (${item.unreadCount} unread)`}
        </Text>
        <View style={[styles.onlineStatus, { backgroundColor: item.online ? 'green' : 'red' }]} />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Active Users</Text>
      <FlatList
        data={activeUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  onlineStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default ChatScreen;
