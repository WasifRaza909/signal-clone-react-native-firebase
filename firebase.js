import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkSkQptjGn5EVz7Bq1GzUE-CmVmnKW1Gw",
  authDomain: "signal-clone-yt-build-709c3.firebaseapp.com",
  projectId: "signal-clone-yt-build-709c3",
  storageBucket: "signal-clone-yt-build-709c3.appspot.com",
  messagingSenderId: "1017809622665",
  appId: "1:1017809622665:web:f1b3702834315fe635d858",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth(app);

export { db, auth };
