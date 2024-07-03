
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPygoZKMjlPCBpWzqrEObuWirSabrpM-U",
  authDomain: "invoice-generator-407a6.firebaseapp.com",
  projectId: "invoice-generator-407a6",
  storageBucket: "invoice-generator-407a6.appspot.com",
  messagingSenderId: "70711078720",
  appId: "1:70711078720:web:4c56ed6a02e0dcabd8d4a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);