import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';

const useDoctorData = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = collection(FIRESTORE_DB, 'users');
        const doctorsSnapshot = await getDocs(doctorsCollection);
        const doctorData = [];
        doctorsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userType === 'Doctor') {
            doctorData.push({ id: doc.id, name: data.name, uid: data.uid });
          }
        });
        setDoctors(doctorData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return [doctors, loading, error];
};

export default useDoctorData;
