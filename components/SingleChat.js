import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy, where, updateDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SingleChat = ({ route, navigation }) => {
  const { name, userName } = route.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('sender', 'in', [name, userName]),
      where('receiver', 'in', [name, userName]),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      let unreadMessages = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({ id: doc.id, ...data });

        // Count unread messages sent to the current user
        if (data.receiver === name && !data.isRead) {
          unreadMessages++;
        }

      
      });

      setMessages(messagesData);
      setUnreadCount(unreadMessages);

      // Scroll to the bottom when messages are updated
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => unsubscribe();
  }, [name, userName]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: message,
          sender: name,
          receiver: userName,
          timestamp: new Date(),
        });
        
        setMessage('');
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    } else {
      console.warn("Message is empty");
    }
  };

  const handleDeleteMessage = async (id) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: async () => {
            try {
              await deleteDoc(doc(db, 'messages', id));
            } catch (error) {
              console.error("Error deleting message: ", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.header}>
              Chat with {userName}
            </Text>
          </View>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => handleDeleteMessage(item.id)}>
                <View style={[styles.messageContainer, item.sender === name ? styles.sentMessage : styles.receivedMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                  <Text style={styles.timestamp}>{new Date(item.timestamp.seconds * 1000).toLocaleTimeString()}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Icon name="send" size={24} color="#6200ea" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    padding: 10,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  header: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#d1c4e9',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#bbdefb',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 15,
  },
  sendButton: {
    padding: 10,
    marginBottom: 15,
  },
});

export default SingleChat;
