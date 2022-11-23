// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3i6jVbNwkbSqA75XtY7VRCym5tNhLJFs",
  authDomain: "resaler-560cc.firebaseapp.com",
  projectId: "resaler-560cc",
  storageBucket: "resaler-560cc.appspot.com",
  messagingSenderId: "508259368820",
  appId: "1:508259368820:web:b7280fb4579fe0d1af7621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app)