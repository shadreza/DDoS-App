import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMZa4uNVBIbspam0xHIaSNLNlsWCbxjQQ",
  authDomain: "ddos-1a8b1.firebaseapp.com",
  projectId: "ddos-1a8b1",
  storageBucket: "ddos-1a8b1.appspot.com",
  messagingSenderId: "477793835564",
  appId: "1:477793835564:web:a0bd26f37d1d8351888f89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);