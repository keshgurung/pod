import { useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';
import { doc, getDoc, collection } from 'firebase/firestore';

const fetchDoctorExperience = (uid) => {
  const [userExperience, setUserExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchUserExperience = async () => {
      try {
        const userDocRef = doc(FIRESTORE_DB, 'exp', uid);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserExperience(userData);
        } else {
          setError('User not found');
        }
      } catch (error) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };
    
    if (uid) {
      fetchUserExperience();
    }
  }, [uid]);

  return { userExperience, loading, error };
};

export default fetchDoctorExperience;
