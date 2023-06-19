// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { useAuth } from "./AuthContext";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore, doc, collection, getDoc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPwy4L5uvHAunClLPioTJWL0rMv0RBXA4",
    authDomain: "notes-db07b.firebaseapp.com",
    projectId: "notes-db07b",
    storageBucket: "notes-db07b.appspot.com",
    messagingSenderId: "392466526277",
    appId: "1:392466526277:web:bf75eedf3e934e0806b32c",
    measurementId: "G-Z1M6MLLLV3"
};

// const { user } = useAuth();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
console.log("xdddd")
const googleProvider = new GoogleAuthProvider();
const collectionRef = collection(db, 'users');
// const docref = doc(db, 'users', 'arya232004@gmail.com');
export {
    auth,
    googleProvider,
    signInWithPopup,
    signOut,
    db,
    signInWithRedirect,
    getRedirectResult,
    collectionRef,
    // docref,
    getDoc,
    arrayUnion,
    updateDoc,
    arrayRemove,
    doc,
};
// export default db;