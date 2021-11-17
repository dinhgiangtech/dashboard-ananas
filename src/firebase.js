

import firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB30hOQP9UGGQV8cdYgmw0UI2GUbKVNufo",
  authDomain: "anans-245e1.firebaseapp.com",
  databaseURL: "https://anans-245e1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "anans-245e1",
  storageBucket: "anans-245e1.appspot.com",
  messagingSenderId: "1007835270039",
  appId: "1:1007835270039:web:049782f0f4b128181f52d2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }