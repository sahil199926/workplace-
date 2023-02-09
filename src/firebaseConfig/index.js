// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2f2v_QG6-83m7cCGAwaw17LOQUCiid6c",
  authDomain: "workplace-855f0.firebaseapp.com",
  projectId: "workplace-855f0",
  storageBucket: "workplace-855f0.appspot.com",
  messagingSenderId: "1018682118022",
  appId: "1:1018682118022:web:102f73cdbc4f2b5e6fe607"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);