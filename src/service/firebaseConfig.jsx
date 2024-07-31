// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "aitrips.firebaseapp.com",
  projectId: "aitrips",
  storageBucket: "aitrips.appspot.com",
  messagingSenderId: "249016426049",
  appId: "1:249016426049:web:a86dfcc63ea93093b1f0c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);