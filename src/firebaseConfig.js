// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbZBDcDurAXeuvh2FSv4EzkLMzOH_FRko",
    authDomain: "retireease-a1cba.firebaseapp.com",
    projectId: "retireease-a1cba",
    storageBucket: "retireease-a1cba.firebasestorage.app",
    messagingSenderId: "703067145169",
    appId: "1:703067145169:web:485998347c14f42dced6f0",
    measurementId: "G-G8WYXF7TGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;