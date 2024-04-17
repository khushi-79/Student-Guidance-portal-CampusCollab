
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmL1KFR_MsimpvHBId--z3Y5R4pCP3t_Y",
  authDomain: "campuscollab-31ce1.firebaseapp.com",
  projectId: "campuscollab-31ce1",
  storageBucket: "campuscollab-31ce1.appspot.com",
  messagingSenderId: "590993050623",
  appId: "1:590993050623:web:5ace30730b2c03157cb5ca",
  measurementId: "G-5SM6N3RRBL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
