import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkSkQptjGn5EVz7Bq1GzUE-CmVmnKW1Gw",
  authDomain: "signal-clone-yt-build-709c3.firebaseapp.com",
  projectId: "signal-clone-yt-build-709c3",
  storageBucket: "signal-clone-yt-build-709c3.appspot.com",
  messagingSenderId: "1017809622665",
  appId: "1:1017809622665:web:f1b3702834315fe635d858",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { db, auth };
