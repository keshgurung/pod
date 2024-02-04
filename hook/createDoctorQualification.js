import { useState, useEffect } from 'react';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';

export const createDoctorQualification = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleQualification = async (uid, degreeName, institute, passingYear) => {
    setError(null);
    setIsPending(true);

    try {
      const usersRef = collection(FIRESTORE_DB, 'qualification');

      await addDoc(
        usersRef,
        {
          uid,
          degreeName,
          institute,
          passingYear,
          }
      );

      if (isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { handleQualification, error, isPending };
};
