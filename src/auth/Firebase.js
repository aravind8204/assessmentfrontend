
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBg2SXPeUBOBXxwhfaGpsaYqj-IjIEWmhU",
  authDomain: "assessment-platform-a0f4a.firebaseapp.com",
  projectId: "assessment-platform-a0f4a",
  storageBucket: "assessment-platform-a0f4a.appspot.com",
  messagingSenderId: "852189433247",
  appId: "1:852189433247:web:e83b22744e5abd2d05c1aa",
  measurementId: "G-CCGRM1560S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);

