// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.Firebase_Api_Key,
  authDomain: process.env.Firebase_Auth_Domain,
  projectId: process.env.Firebase_ProjectId,
  storageBucket: process.env.Firebase_Storage_Bucket,
  messagingSenderId: process.env.Firebase_Messaging_SenderId,
  appId: process.env.Firebase_AppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;