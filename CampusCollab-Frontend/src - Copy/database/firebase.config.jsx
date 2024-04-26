import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDS1LtiGKWDejagBD_oGaMblNWqprXlbhU",
	authDomain: "talkingapp-60a9f.firebaseapp.com",
	projectId: "talkingapp-60a9f",
	storageBucket: "talkingapp-60a9f.appspot.com",
	messagingSenderId: "939190502126",
	appId: "1:939190502126:web:caf69390cc904e0e7829ff",
	measurementId: "G-FD47YE3Z4Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
