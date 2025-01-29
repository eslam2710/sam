import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

// تكوين تطبيق الويب الخاص بـ Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoyfIt1X2gSga19q2KJgfqJBRhWUHKjWQ",
  authDomain: "saam-771a2.firebaseapp.com",
  projectId: "saam-771a2",
  storageBucket: "saam-771a2.firebasestorage.app",
  messagingSenderId: "321141185861",
  appId: "1:321141185861:web:5a5bddbead4cf79e32f22c"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const signInWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithGoogle, signInWithFacebook };