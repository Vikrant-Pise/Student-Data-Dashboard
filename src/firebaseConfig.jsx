import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDJ1Q3UMrqb3WF1pGvOqGfOsOroT6lvn0U",
  authDomain: "material-kit-react-main-49705.firebaseapp.com",
  projectId: "material-kit-react-main-49705",
  storageBucket: "material-kit-react-main-49705.firebasestorage.app",
  messagingSenderId: "970035114040",
  appId: "1:970035114040:web:cb005d5f734442b1dff6cd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 

export { auth, db };
