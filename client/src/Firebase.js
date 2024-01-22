// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-69b82.firebaseapp.com",
  projectId: "mern-blog-69b82",
  storageBucket: "mern-blog-69b82.appspot.com",
  messagingSenderId: "108014406940",
  appId: "1:108014406940:web:6ed55f370a13431594fed9",
  measurementId: "G-8EWXMFRMFQ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
