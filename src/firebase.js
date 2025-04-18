// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcyahO_hr7lgGesajJeV2J4-oiwDziXig",
  authDomain: "onetouchmove-84f9d.firebaseapp.com",
  projectId: "onetouchmove-84f9d",
  storageBucket: "onetouchmove-84f9d.firebasestorage.app",
  messagingSenderId: "601017987417",
  appId: "1:601017987417:web:c699da0e2eb02480d51c48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);