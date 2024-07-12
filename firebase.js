// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCGFQgE5ZHW-gZ9fd71tTfvAVak0tguso",
  authDomain: "otp-ver-d8d38.firebaseapp.com",
  projectId: "otp-ver-d8d38",
  storageBucket: "otp-ver-d8d38.appspot.com",
  messagingSenderId: "396859018362",
  appId: "1:396859018362:web:ced79e3f1fcaec0f6c3fc3",
  measurementId: "G-KYBJXEG9GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};
