

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJKEd0LjOqSO9AHK_OwqBrXD1ivfCxZaY",
    authDomain: "crud-master-3013d.firebaseapp.com",
    databaseURL: "https://crud-master-3013d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "crud-master-3013d",
    storageBucket: "crud-master-3013d.appspot.com",
    messagingSenderId: "267781587938",
    appId: "1:267781587938:web:629079ca405fef5b5a6fbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

export { db }; // Export the Firestore instance
