// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDWF9RnVo-geAG5D14NTRpPGytS1exa6w",
  authDomain: "appointment-project-a0c71.firebaseapp.com",
  projectId: "appointment-project-a0c71",
  storageBucket: "appointment-project-a0c71.appspot.com",
  messagingSenderId: "1079536330712",
  appId: "1:1079536330712:web:4d2bfec461993a8e8074ad"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);