// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrf2FBj01VUJ0OPLSvY2CORMr1zdcsRH8",
  authDomain: "imageuploadcloudinary-d33ff.firebaseapp.com",
  projectId: "imageuploadcloudinary-d33ff",
  storageBucket: "imageuploadcloudinary-d33ff.firebasestorage.app",
  messagingSenderId: "124839051175",
  appId: "1:124839051175:web:92e86af8e4d8ef8dd58082"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };