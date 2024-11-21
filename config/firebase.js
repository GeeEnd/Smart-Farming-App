

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR FIREBASE API KEY HERE",
    authDomain: 'AUTH DOMAIN HERE'
    databaseURL: 'DATABASE URL HERE'
    projectId: 'PROJECT ID HERE'
    storageBucket: 'STORAGE BUCKET HERE'
    messagingSenderId: ""
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

export { db }; // Export the Firestore instance
