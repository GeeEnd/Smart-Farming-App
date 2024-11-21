// DashboardStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    communityContainer: {
      flex: 1,
      padding: 16,
    },
    postCard: {
      backgroundColor: '#EEEEEE',
      marginVertical: 8,
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      elevation: 1,
    },
    headCard: {
      backgroundColor: '',
      marginVertical: 8,
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      elevation: 1,
    },
    welcomeSection: {
      alignItems: 'center',
    },
    welcomeImage: {
      width: '100%',
      height: 100,
      borderRadius: 20,
    },
    welcomeText: {
      fontSize: 24,
      color: '#000',
      textAlign: 'center',
      marginVertical: 16,
    },
    questionPrompt: {
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
      marginBottom: 16,
    },
    newPostButton: {
      backgroundColor: '#28A745',
      paddingVertical: 12,
      borderRadius: 5,
      alignItems: 'center',
    },
    newPostButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    userImage: {
      width: 30,
      height: 30,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 5,
    },
    postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative', // To allow absolute positioning for the delete button
    },
    
    postAuthor: {
      fontSize: 16,
      fontWeight: 'bold',
      alignItems:'left',
      justifyContent: 'flex-start'
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    postText: {
      fontSize: 14,
      marginBottom: 8,
    },
    likesCommentsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
      margin: 20
    },
    likeButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    likesText: {
      marginLeft: 5,
    },
    commentsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    commentsText: {
      marginLeft: 5,
    },
    viewCommentsButton: {
      marginTop: 5,
    },
    viewCommentsText: {
      color: '#007bff',
      marginLeft: 20,
      marginBottom: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 50,
    },
  
    modalInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    submitButton: {
      backgroundColor: '#28A745',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    submitButtonText: {
      color: 'black',
      fontSize: 16,
    },
    modalCloseButton: {
      marginTop: 10,
      backgroundColor: '#dc3545',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    modalCloseButtonText: {
      color: 'white',
      fontSize: 16,
    },
    commentsScroll: {
      maxHeight: 200,
    },
    commentContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      paddingTop: 10,
    },
    commentIcon: {
      marginRight: 5,
    },
    commentAuthor: {
      fontWeight: 'bold',
    },
    commentText: {
        marginLeft: 5,
        flexWrap: 'wrap', // Enable text wrapping
        flexDirection: 'row', // Make sure it's set to row to wrap correctly
      },
      
    commentSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    commentInput: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
    },
    deleteButton: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 10,
    },
    sendCommentButton: {
      marginLeft: 10,
    },
  });
  export default styles;
  