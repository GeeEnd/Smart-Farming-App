// DashboardStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  weatherContainer: {
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    borderRadius: 5,
    padding: 15,
    marginTop: 0,
    marginBottom: 0,
    marginVertical: 0,
    alignItems: 'center',
  },
  weatherCardImage: {
    backgroundColor: 'rgba(49, 81, 30, 0.7)',
    borderRadius: 0,
    padding: 0,
   
    marginVertical: 0,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItem: {
    alignItems: 'center',
    flex: 1,
  },
  weatherValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherLabel: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  locationText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 5,
  },
  descriptionText: {
    color: '#000',
    fontSize: 14,
  },
  isButton: {
    flex: 1,
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',  // Arrange icon and text side-by-side
    alignItems: 'center',  // Align icon and text vertically
  },
  diagnosisButtonText: {
    color: '#FFF',
    fontSize: 12,
    marginRight: 10,
    marginLeft: 8,
    padding: 2,  // Add space between icon and text
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  diagnosisButton: {
    flex: 1,
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    padding: 10,
    marginBottom: 2,
    borderRadius: 5,
    marginHorizontal: 5,
    flexDirection: 'row',  // Arrange icon and text side-by-side
    alignItems: 'center',  // Align icon and text vertically
  },
  diagnosisButtonText: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: 8,  // Add space between icon and text
  },
  dropButton: {
    flex: 1,
    backgroundColor: 'rgba(49, 81, 30, 0.8)',
    padding: 3,
borderRadius: 5,
marginBottom: 5, 
    flexDirection: 'row',  // Arrange icon and text side-by-side
    alignItems: 'center',  // Align icon and text vertically
  },
  dropButtonText: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: 8,  // Add space between icon and text
  },
  backgroundImage: {
    resizeMode: 'cover', // Adjusts the image to cover the entire background
  },
  insectCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  insectImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  topSection: {
    marginBottom: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust this for transparency
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  topBar: {
    paddingTop: 40,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  communityContainer: {
    flex: 1,
    paddingTop: 40,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
alignContent: 'flex-end',
left: 110,

  },
  sendButton: {
    backgroundColor: '#28A745',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postText: {
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  appTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userIcon: {
    width: 30,
    height: 30,
  },
 // Adjust zIndex and elevation in the dropdown menu style
dropdownMenu: {
  position: 'absolute',
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 5,
  elevation: 5, // for Android
  zIndex: 10, // for iOS
},

  dropdownMenuItem: {
    padding: 5,
    fontSize: 16,
  },
  welcomeText: {
  
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 10,
  
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  bellIconContainer: {
    marginLeft: 10, // Adjust space between user icon and bell icon
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  galleryImage: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  communityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  tabLabel: {
    paddingLeft: 3, // Adjust this for better positioning
    color: '#000',
    fontSize: 10,
  },
  tabIcon: {
    padding: 0,
    marginLeft: 50, // reduce padding to bring icons closer
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 16,
    marginVertical: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  likesText: {
    fontSize: 14,
    marginTop: 5,
  },
  likeButton: {
    backgroundColor: '#28A745',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  likeButtonText: {
    color: '#fff',
  },
  communityContainer: {
    flex: 1,
    padding: 20,
    
    backgroundColor: '#f0f0f0',
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  userImage: {
    width: 30,
    height: 30,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 16,
    marginVertical: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  likesText: {
    fontSize: 14,
    marginTop: 5,
  },
  likeButton: {
    backgroundColor: '#28A745',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  likeButtonText: {
    color: '#fff',
  },
  communityContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  imageCard: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    color: 'black',
    paddingHorizontal: 0,
  },
  aboutButtonText: {
    color: 'black',
    paddingTop: 5,
  },
  galleryContainer: {
    marginTop: 20,
    padding: 10,
  },
  galleryImage: {
    width: 100, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    marginRight: 10,
    borderRadius: 8,
  },
  
  questionPrompt: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: '#28A745',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  postText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  likesCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#28A745',
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#6c757d',
  },
  commentSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  commentInput: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentIcon: {
    marginRight: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  commentInput: {
    flex: 1, // Take up available space
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10, // Space between input and icon
  },
  sendCommentButton: {
    padding: 10, // Adjust padding as necessary
  },
  
  
  imageCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postText: {
    fontSize: 16,
    marginBottom: 8,
  },
  likesCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 4,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    paddingLeft: 10,  // To align the comments slightly indented, adjust as needed
  },
  commentIcon: {
    marginRight: 5,  // Space between the icon and the text
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#333',   // Or any preferred color
    marginRight: 3,
  },
  commentText: {
    color: '#555',
    marginTop: 5,
    marginBottom: 10,  // Or any preferred color
  },
  
  welcomeImage: {
    width: 330, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 5, // For circular image
    marginRight: 0,
  },
  likesCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    borderColor: '#000'
  },
  sendButton: {
    backgroundColor: 'rgba(49, 81, 30, 0.9)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 2,
  },

  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentIcon: {
    marginRight: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  commentsText: {
    marginLeft: 4,
    marginBottom: 10,
  },
  likesCommentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default styles;
