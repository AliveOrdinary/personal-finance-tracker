import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBgU3SnAQJ5R9IzU2XYwPgp9B9ECrkX8U",
  authDomain: "financier-df7e7.firebaseapp.com",
  projectId: "financier-df7e7",
  storageBucket: "financier-df7e7.appspot.com",
  messagingSenderId: "5139327283",
  appId: "1:5139327283:web:c132ebf8a10a629ff13646",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
