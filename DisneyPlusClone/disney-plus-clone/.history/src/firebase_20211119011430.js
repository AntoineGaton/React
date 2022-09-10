// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHSSSqxZLWrlY34ucqzXOIUuGWPFKIY2A",
  authDomain: "disneyplus-clone-5379b.firebaseapp.com",
  projectId: "disneyplus-clone-5379b",
  storageBucket: "disneyplus-clone-5379b.appspot.com",
  messagingSenderId: "560998370771",
  appId: "1:560998370771:web:df34341d66f7fc77aab326"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;