import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD7Wu5v_x4BIqAcO3eZ7bjfp2C1Das1U9s",
    authDomain: "slack-clone-bbfb1.firebaseapp.com",
    projectId: "slack-clone-bbfb1",
    storageBucket: "slack-clone-bbfb1.appspot.com",
    messagingSenderId: "242696383152",
    appId: "1:242696383152:web:5919cee74f243db0f0e975"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


/*Old Syntax
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();*/



export { db , auth, provider };