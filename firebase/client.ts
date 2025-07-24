import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyChm3a2DshTNeQDM5WX7ZuVX2EKdbjIEbs",
    authDomain: "acetheinterview-f1e55.firebaseapp.com",
    projectId: "acetheinterview-f1e55",
    storageBucket: "acetheinterview-f1e55.firebasestorage.app",
    messagingSenderId: "1064424862375",
    appId: "1:1064424862375:web:5a67190a5cd3248fec6182",
    measurementId: "G-547KETWVZX"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
