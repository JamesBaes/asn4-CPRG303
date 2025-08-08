import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1RBUxdtZ8zEQLF6X5CRymh6_cH5eNTtw",
  authDomain: "assignment4--cprg303.firebaseapp.com",
  projectId: "assignment4--cprg303",
  storageBucket: "assignment4--cprg303.appspot.com",
  messagingSenderId: "918094209480",
  appId: "1:918094209480:web:5e6c395e157e178da3a0fd"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth(app);
