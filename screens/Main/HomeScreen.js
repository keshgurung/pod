import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { useAuthContext } from '../../hook/useAuthContext';
import useUserProfile from '../../hook/useUserProfile';
import fetchDoctorQualification from '../../hook/fetchDoctorQualification';
import DoctorQualificationScreen from './DoctorQualificationScreen';
import QualificationScreen from './QualificationScreen';
import Appointment from './Appointment';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuthContext();
  const { userProfile, loading, error } = useUserProfile(user?.uid);
  const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);
  const [isAddQualificationModalVisible, setIsAddQualificationModalVisible] = useState(false);
  const [qualification, setQualification, qualificationLoading, qualificationError] = fetchDoctorQualification(user?.uid, userProfile?.userType);

  const handleBookAppointment = () => {
    setIsAppointmentVisible(true);
  };

  const handleAppointmentClose = () => {
    setIsAppointmentVisible(false);
  };

  const handleAddQualification = () => {
    setIsAddQualificationModalVisible(true);
  };

  const handleAddExperience = () => {
    // Handle adding experience logic
  };

  const handleAddQualificationClose = () => {
    setIsAddQualificationModalVisible(false);
  };

  useEffect(() => {
    // Add any additional side effects or dependencies here
  }, [userProfile, user]);

  if (loading || qualificationLoading) {
    return (
      <View style={styles.buttons}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  }

  if (error || qualificationError) {
    return <Text>Error: {error || qualificationError}</Text>;
  }

  if (!userProfile) {
    return <Text>User profile not found</Text>;
  }

  const isPatient = userProfile.userType === 'Patient';

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>{userProfile.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.boldText}>
          Welcome, <Text style={{ fontWeight: 'bold' }}>{userProfile.name}</Text>
        </Text>

        {isPatient && !isAppointmentVisible && (
          <TouchableOpacity style={styles.appointmentButton} onPress={handleBookAppointment}>
            <Text style={styles.appointmentButtonText}>Make an Appointment</Text>
          </TouchableOpacity>
        )}

        {!isPatient && (
          <>
            <Text>Your Qualifications:</Text>
            
            {qualification.length > 0 ? (
              qualification.map((qual) => (
                <View key={qual.id} style={styles.qualificationItem}>
                  <Text style={styles.qualificationText}>Degree: {qual.degreeName}</Text>
                  <Text style={styles.qualificationText}>Institute: {qual.institute}</Text>
                  <Text style={styles.qualificationText}>Passing Year: {qual.passingYear}</Text>
                </View>
              ))
            ) : (
              <Text>No qualifications found</Text>
            )}

            <TouchableOpacity style={styles.appointmentButton} onPress={handleAddQualification}>
              <Text style={styles.appointmentButtonText}>Add Qualification</Text>
            </TouchableOpacity>
          </>
        )}

        {isAppointmentVisible && <Appointment onClose={handleAppointmentClose} />}

        <Modal
          animationType="slide"
          transparent={false}
          visible={isAddQualificationModalVisible}
          onRequestClose={handleAddQualificationClose}
        >
          <QualificationScreen onClose={handleAddQualificationClose} />
        </Modal>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  boldText: {
    marginBottom: 20,
  },
  appointmentButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  appointmentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: 20,
  },
  qualificationItem: {
    backgroundColor: '#C5C5C5', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 10, 
  },
  qualificationText: {
    fontSize: 16,
    marginBottom: 5,
  },
};

export default HomeScreen;
