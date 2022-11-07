// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAirPYUAIZhS0gd6_g13p18zsMbG4UxF-0",
  authDomain: "linkedin-cd450.firebaseapp.com",
  projectId: "linkedin-cd450",
  storageBucket: "linkedin-cd450.appspot.com",
  messagingSenderId: "235182667558",
  appId: "1:235182667558:web:e882227c70442b8fb673e7",
};

// Initialize Firebase
const app = () => {
  initializeApp(firebaseConfig);
};

export default app;
