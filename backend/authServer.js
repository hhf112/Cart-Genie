import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "dotenv/config"

const firebaseConfig = {
 apiKey: import.meta.env.VITE_APIKEY,            // example for Vite
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
