import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../Firebase/FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const auth = FIREBASE_AUTH;

  const signup = async (email, password, name, specialty, location, userType) => {
    setError(null)
    setIsPending(true)

      // signup
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        const usersRef = collection(FIRESTORE_DB, "users");

        if (userType === "Doctor") {
          await setDoc(doc(usersRef, user.uid), {
            uid: user.uid,
            name,
            email,
            userType,
            specialty,
            location,
            });
        } else {
          await setDoc(doc(usersRef, user.uid), {
            uid: user.uid,
            name,
            email,
            userType
            });
        }

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
    }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}