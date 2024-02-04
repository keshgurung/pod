import { useState, useEffect } from 'react'
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';

export const createAppointment = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

const handleAppointment = async (apnDate, apnTime, doctorId, message, patientId, apnStatus) => {
  setError(null);
  setIsPending(true);

  try {
    const usersRef = collection(FIRESTORE_DB, "appointments");

    await addDoc(usersRef, {
      apnDate,
      apnTime,
      doctorId,
      message,
      patientId,
      apnStatus
    });

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
  return () => setIsCancelled(true)
}, [])

return { handleAppointment, error, isPending }
}