import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../config/firebase';
import styles from '../components/CommunityStyles';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  increment,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

const CommunityScreen = ({ route }) => {
  const { name } = route.params; // Name of the logged-in user
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [newPostModalVisible, setNewPostModalVisible] = useState(false); // State to manage new post modal visibility
  const [commentsModalVisible, setCommentsModalVisible] = useState(false); // State to manage comments modal visibility
  const [selectedPost, setSelectedPost] = useState(null); // State to manage the selected post
  const [postTitle, setPostTitle] = useState(''); // State for post title
  const [postContent, setPostContent] = useState(''); // State for post content

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const handleLikePost = async (postId) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: increment(1),
    });
  };

  const handleAddComment = async (postId, comment) => {
    const postRef = doc(db, 'posts', postId);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const existingComments = postData.comments || [];

      await updateDoc(postRef, {
        comments: [...existingComments, { name, comment }],
      });
    } else {
      console.error("Post not found");
    }
  };

  const handleDeletePost = async (postId) => {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef).catch((error) => {
      console.error("Error deleting post: ", error);
    });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post for comments modal
    setCommentsModalVisible(true); // Show comments modal
  };

  const handleAddNewPost = async () => {
    // Logic to add a new post
    if (postTitle.trim() && postContent.trim()) {
      const postsRef = collection(db, 'posts');
      await addDoc(postsRef, {
        name,
        title: postTitle,
        content: postContent,
        likes: 0,
        comments: [],
        timestamp: new Date(),
      });
      setPostTitle('');
      setPostContent('');
      setNewPostModalVisible(false); // Close the new post modal after adding
    }
  };

  return (
   

      <View style={styles.communityContainer}>
        <View style={styles.headCard}>
          <View style={styles.welcomeSection}>
            <Image source={require('../assets/images/weeeew.jpg')} style={styles.welcomeImage} />
          </View>
          <Text style={styles.welcomeText}>Welcome to the community!</Text>
          <Text style={styles.questionPrompt}>Ask a question!</Text>
          <TouchableOpacity onPress={() => setNewPostModalVisible(true)} style={styles.newPostButton}>
            <Text style={styles.newPostButtonText}>Add New Post</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 15 : 0}
        >
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Image source={require('../assets/images/profile.png')} style={styles.userImage} />
                  <Text style={styles.postAuthor}>{item.name}</Text>
                  {item.name === name && (
                    <TouchableOpacity onPress={() => handleDeletePost(item.id)} style={styles.deleteButton}>
                      <Icon name="trash" size={20} color="#dc3545" />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postText}>{item.content}</Text>
                <View style={styles.likesCommentsContainer}>
                  <TouchableOpacity onPress={() => handleLikePost(item.id)} style={styles.likeButton}>
                    <Icon name="thumbs-up" size={20} color="#28A745" />
                    <Text style={styles.likesText}>{item.likes} Likes</Text>
                  </TouchableOpacity>
                  <View style={styles.commentsContainer}>
                    <Icon name="comment" size={20} color="#6c757d" />
                    <Text style={styles.commentsText}>{item.comments.length} Comments</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handlePostClick(item)} style={styles.viewCommentsButton}>
                  <Text style={styles.viewCommentsText}>View Comments</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </KeyboardAvoidingView>

        {/* Modal for creating a new post */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={newPostModalVisible}
          onRequestClose={() => {
            setNewPostModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Create New Post</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Post Title"
                onChangeText={(text) => setPostTitle(text)}
                value={postTitle}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Post Content"
                multiline
                numberOfLines={4}
                onChangeText={(text) => setPostContent(text)}
                value={postContent}
              />
              <TouchableOpacity onPress={handleAddNewPost} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNewPostModalVisible(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for viewing comments */}
        {selectedPost && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={commentsModalVisible}
            onRequestClose={() => {
              setCommentsModalVisible(false);
              setSelectedPost(null);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{selectedPost.title}</Text>
                <Text style={styles.modalContent}>{selectedPost.content}</Text>
                <ScrollView style={styles.commentsScroll}>
                  {selectedPost.comments.map((comment, index) => (
                    <View key={index} style={styles.commentContainer}>
                      <Icon name="user" size={16} color="#6c757d" style={styles.commentIcon} />
                      <Text style={styles.commentAuthor}>{comment.name}:</Text>
                      <Text style={styles.commentText}> {comment.comment}</Text>
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.commentSection}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={commentText}
                    onChangeText={setCommentText}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (commentText.trim()) {
                        handleAddComment(selectedPost.id, commentText);
                        setCommentText('');
                      }
                    }}
                    style={styles.sendCommentButton}
                  >
                    <Icon name="paper-plane" size={20} color="#007bff" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setCommentsModalVisible(false)} style={styles.modalCloseButton}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>

  );
};

export default CommunityScreen;
