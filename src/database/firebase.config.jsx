import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: "AIzaSyDS1LtiGKWDejagBD_oGaMblNWqprXlbhU",
// 	authDomain: "talkingapp-60a9f.firebaseapp.com",
// 	projectId: "talkingapp-60a9f",
// 	storageBucket: "talkingapp-60a9f.appspot.com",
// 	messagingSenderId: "939190502126",
// 	appId: "1:939190502126:web:caf69390cc904e0e7829ff",
// 	measurementId: "G-FD47YE3Z4Y",
// };

// const firebaseConfig = {
// 	apiKey: "AIzaSyDmL1KFR_MsimpvHBId--z3Y5R4pCP3t_Y",
// 	authDomain: "campuscollab-31ce1.firebaseapp.com",
// 	projectId: "campuscollab-31ce1",
// 	storageBucket: "campuscollab-31ce1.appspot.com",
// 	messagingSenderId: "590993050623",
// 	appId: "1:590993050623:web:5ace30730b2c03157cb5ca",
// 	measurementId: "G-5SM6N3RRBL"
//   };

const firebaseConfig = {
	apiKey: "AIzaSyAjIZr1VXRiPx_mF3YeDdxsELLFGzVpCvU",
	authDomain: "project-database-9c312.firebaseapp.com",
	projectId: "project-database-9c312",
	storageBucket: "project-database-9c312.appspot.com",
	messagingSenderId: "1023589423483",
	appId: "1:1023589423483:web:e7055155e8d54fe36e45de",
	measurementId: "G-6EQ37NRW3D"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export default app;