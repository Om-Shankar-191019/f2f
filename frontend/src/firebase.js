// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "learning-firebase-384c2.firebaseapp.com",
  databaseURL: "https://learning-firebase-384c2-default-rtdb.firebaseio.com",
  projectId: "learning-firebase-384c2",
  storageBucket: "learning-firebase-384c2.appspot.com",
  messagingSenderId: "121818632047",
  appId: "1:121818632047:web:918adb52819e6f252aa29a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
