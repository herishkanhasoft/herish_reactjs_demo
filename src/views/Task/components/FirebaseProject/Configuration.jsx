// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {FacebookAuthProvider, getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBjxEVw9va4tOhy5yBziInEWmGgZvl7lq0",
  authDomain: "project-test-ae124.firebaseapp.com",
  projectId: "project-test-ae124",
  storageBucket: "project-test-ae124.appspot.com",
  messagingSenderId: "273524895972",
  appId: "1:273524895972:web:cb3d0c338a571f1488bcf1",
  measurementId: "G-63NWCRD9WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerFb = new FacebookAuthProvider();

export {auth,provider,providerFb};