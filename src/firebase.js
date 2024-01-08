// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVgNQbpI24Vr6TB3Rc7VvsZc8Lk9VPb6g",
  authDomain: "giamsathanhtrinh-6dcb3.firebaseapp.com",
  databaseURL:
    "https://giamsathanhtrinh-6dcb3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "giamsathanhtrinh-6dcb3",
  storageBucket: "giamsathanhtrinh-6dcb3.appspot.com",
  messagingSenderId: "790476571286",
  appId: "1:790476571286:web:68935cf569fc99850338b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDB = getDatabase(app);
