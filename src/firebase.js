import firebase from "firebase/app";
import "firebase/database";

// Initalize Firebase

const config = {
  apiKey: "AIzaSyC3q0r1q-0IOrYPQHK-Mt_msfDdzxmJvWg",

  authDomain: "not-so-trivial-pursuit-e7bf5.firebaseapp.com",

  databaseURL:
    "https://not-so-trivial-pursuit-e7bf5-default-rtdb.firebaseio.com",

  projectId: "not-so-trivial-pursuit-e7bf5",

  storageBucket: "not-so-trivial-pursuit-e7bf5.appspot.com",

  messagingSenderId: "810946927336",

  appId: "1:810946927336:web:6dd93e01b5f92fb00f875d",
};

// Initialize Firebase

firebase.initializeApp(config);

export default firebase;
