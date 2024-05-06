// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJmB7F0-jnDfKQB0ZnlKed2oCyErFaFZQ",
  authDomain: "learn-firebase-768a9.firebaseapp.com",
  projectId: "learn-firebase-768a9",
  storageBucket: "learn-firebase-768a9.appspot.com",
  messagingSenderId: "83014481023",
  appId: "1:83014481023:web:a4fb135c4df09330967b4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
