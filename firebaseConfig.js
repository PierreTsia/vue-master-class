import firebase from "firebase/app";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: "wcs-vue-workshop",
  storageBucket: "wcs-vue-workshop.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();

// firebase collections
const notesCollection = db.collection("notes");

export { db, notesCollection };
