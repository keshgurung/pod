// import { useEffect, useState } from 'react';
// import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';
// import { doc, getDoc, collection } from 'firebase/firestore';

// const fetchDoctorQualification = (uid) => {
//   const [userQualification, setUserQualification] = useState(null);
//   const [qualificationLoading, setQualificationLoading] = useState(true);
//   const [qualificationError, setQualificationError] = useState(null);

//   useEffect(() => {
   
//     const fetchUserQualification = async () => {
//       try {
//         const userDocRef = doc(FIRESTORE_DB, 'exp', uid);
//         const userDocSnapshot = await getDoc(userDocRef);
    
//         if (userDocSnapshot.exists()) {
//           const userData = userDocSnapshot.data();
//           setUserQualification(userData);
//         } else {
//           setQualificationError('User not found');
//         }
//       } catch (qualificationError) {
//         setQualificationError('Error fetching user qualificaton');
//       } finally {
//         setQualificationLoading(false);
//       }
//     };
    
//     if (uid) {
//       fetchUserQualification();
//     }
//   }, [uid]);

//   return { userQualification, qualificationLoading, qualificationError };
// };

// export default fetchDoctorQualification;

// import { useState, useEffect } from 'react';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';

// const fetchDoctorQualification = (uid, userType) => {
//   const [qualification, setQualification] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const appointmentCollection = collection(FIRESTORE_DB, 'qualification');
        
//     if (!userType) {
//       console.log('userType is not available yet.');
//       return;
//     }

//     let qualificationQuery;
//     if (userType === 'Doctor') {
//     qualificationQuery = query(appointmentCollection, where('uid', '==', uid));
//     }
//     const unsubscribe = onSnapshot(qualificationQuery, (snapshot) => {
//       const appointmentData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setQualification(appointmentData);
//       setLoading(false);
//     });

//     return () => {
//       // Unsubscribe from real-time updates when the component unmounts
//       unsubscribe();
//     };
//   }, [uid, userType]);

//   return [qualification, setQualification, loading, error];
// };

// export default fetchDoctorQualification;

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from '../Firebase/FirebaseConfig';

const fetchDoctorQualification = (docId, userType) => {
  const [qualification, setQualification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        // Check if the user is a doctor before making the query
        if (userType === 'Doctor') {
          const qualificationCollection = collection(FIRESTORE_DB, 'qualification');
          const qualificationQuery = query(qualificationCollection, where('uid', '==', docId));

          const unsubscribe = onSnapshot(qualificationQuery, (snapshot) => {
            const qualificationData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setQualification(qualificationData);
            setLoading(false);
          });

          return () => {
            // Unsubscribe from real-time updates when the component unmounts
            unsubscribe();
          };
        } else {
          // If the user is not a doctor, set loading to false
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching qualification');
        setLoading(false);
      }
    };

    fetchQualification();
  }, [docId, userType]);

  return [qualification, setQualification, loading, error];
};

export default fetchDoctorQualification;
