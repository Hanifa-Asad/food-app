import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBveuv-B3HqcPhv8gcmMtj2yCgJfQE2xV8",
    authDomain: "food-app-a25c6.firebaseapp.com",
    projectId: "food-app-a25c6",
    storageBucket: "food-app-a25c6.firebasestorage.app",
    messagingSenderId: "528525072594",
    appId: "1:528525072594:web:1e6969134922f35a20750b",
    measurementId: "G-449QT93NZ4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    db,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    storage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
};
