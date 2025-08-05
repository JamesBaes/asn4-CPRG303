import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export const signUp = async (
  fullName: string,
  username: string,
  email: string,
  phoneNum: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (user) {
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      username,
      email,
      phoneNum,
    });
  }
};

export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const addEmployee = async (
  fullname: string,
  email: string,
  phoneNum: string,
  address: string,
  startDate: string
) => {
  await addDoc(collection(db, "employees"), {
    fullname,
    email,
    phoneNum,
    address,
    startDate,
  });
};