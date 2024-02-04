import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, updateDoc } from 'firebase/firestore';

const auth = FIREBASE_AUTH;

export const signIn = async(email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  } catch (error) {
    console.log(error);
    alert('Sign in failed:' + error.message);
  }
};

export const handleRegistration = async (email, password, name, specialty, location, userType) => {
    // Create user with email and password
    try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);

    if (userType === "Doctor") {
      await addDoc(collection(FIRESTORE_DB, "users"), {
        uid: user.uid,
        name,
        email,
        userType,
        specialty,
        location,
        });
    } else {
      await addDoc(collection(FIRESTORE_DB, "users"), {
        uid: user.uid,
        name,
        email,
        userType
        });
    }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
};
