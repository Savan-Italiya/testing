// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7FiH90n8B26QhwzLvcWCdStDdAo0cg1U",
    authDomain: "scolage-backend.firebaseapp.com",
    projectId: "scolage-backend",
    storageBucket: "scolage-backend.appspot.com",
    messagingSenderId: "684349475388",
    appId: "1:684349475388:web:222f438a45e0880da05139",
    measurementId: "G-2CS5BF70QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


export default db