// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA05QxF2YcUxjkudsNTPnVOUee_2pczpQM",
  authDomain: "ecportfolio-9dbfb.firebaseapp.com",
  projectId: "ecportfolio-9dbfb",
  storageBucket: "ecportfolio-9dbfb.firebasestorage.app",
  messagingSenderId: "116002871852",
  appId: "1:116002871852:web:9b82fbc0a3befe61a48f89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
