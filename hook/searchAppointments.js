import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';

const searchAppointment = (userType, uid) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const appointmentCollection = collection(FIRESTORE_DB, 'appointments');

    if (!userType) {
      console.log('userType is not available yet.');
      return;
    }
        
    let appointmentsQuery;

    if (userType === 'Doctor') {
      console.log('Fetching appointments for Doctor:', uid);
      appointmentsQuery = query(appointmentCollection, where('doctorId', '==', uid));
    } else if (userType === 'Patient') {
      console.log('Fetching appointments for Patient:', uid);
      appointmentsQuery = query(appointmentCollection, where('patientId', '==', uid));
    } else {
      console.error('Invalid userType:', userType);
      setError('Invalid userType');
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
      const appointmentData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentData);
      setLoading(false);
    });

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      unsubscribe();
    };
  }, [uid, userType]);

  return [appointments, setAppointments, loading, error];
};

export default searchAppointment;
