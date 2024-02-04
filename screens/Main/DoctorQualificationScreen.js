import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthContext } from '../../hook/useAuthContext';
import { FIRESTORE_DB } from '../../Firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import useUserProfile from '../../hook/useUserProfile';
import fetchDoctorQualification from '../../hook/fetchDoctorQualification';

const DoctorQualificationScreen = () => {
  const { user } = useAuthContext();
  const { userProfile } = useUserProfile(user?.uid);
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [qualification, setQualification] = fetchDoctorQualification(user?.uid)

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        if (!user?.uid) {
          // Exit if user UID is not available
          setLoading(false);
          return;
        }
  
        const qualificationsRef = collection(FIRESTORE_DB, 'qualification');
        const qualificationsSnapshot = await getDocs(
          query(qualificationsRef, where('uid', '==', user.uid))
        );
  
        const fetchedQualifications = qualificationsSnapshot.docs.map((doc) => doc.data());
  
        setQualifications(fetchedQualifications);
      } catch (error) {
        console.error('Error fetching qualifications:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (userProfile?.userType === 'Doctor') {
      fetchQualifications();
    } else {
      setLoading(false);
    }
  }, [user, userProfile]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      {qualifications.length > 0 ? (
        <FlatList
          data={qualifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.qualificationContainer}>
              <Text style={styles.label}>Degree: {item.degreeName}</Text>

              <Text>Institute:
              {item.institute}</Text>

              <Text>Passing Year:
              {item.passingYear}</Text>

              <View style={styles.separator} />
            </View>
          )}
        />
      ) : (
        <Text>No qualifications found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  qualificationContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 8,
  },
});

export default DoctorQualificationScreen;

