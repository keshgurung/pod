import { useEffect, useState } from 'react';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';
import { doc, getDoc, collection } from 'firebase/firestore';

const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(FIRESTORE_DB, 'users', uid);
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserProfile(userData);
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
      fetchUserProfile();
    }
  }, [uid]);

  return { userProfile, loading, error };
};

export default useUserProfile;
