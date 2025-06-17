import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpV-5tAuLEeG13C14OEzF_czZXBmWOC7A",
  authDomain: "facebook-md-4d0d9.firebaseapp.com",
  projectId: "facebook-md-4d0d9",
  storageBucket: "facebook-md-4d0d9.appspot.com",
  messagingSenderId: "947886762844",
  appId: "1:947886762844:web:a3786c7f402359713cef99",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();
const db = app.firestore();
const storage = firebase.storage();

export { auth, db, storage, firebase }; // ✅ now firebase is exported
