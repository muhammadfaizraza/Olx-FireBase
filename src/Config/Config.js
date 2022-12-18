import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBGLe6TVxRXmGov5BO2_EioF3IB24Me5Gs",
  authDomain: "assignment-ebfe5.firebaseapp.com",
  projectId: "assignment-ebfe5",
  storageBucket: "assignment-ebfe5.appspot.com",
  messagingSenderId: "349895394315",
  appId: "1:349895394315:web:d59627c3a2c446acc6f30e",
  measurementId: "G-GMTNHQMR4E",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();
export { auth, fs, storage };
