import { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import useUserProfile from '../../hook/useUserProfile';
import { useAuthContext } from '../../hook/useAuthContext';
import searchAppointment from '../../hook/searchAppointments';
import { updateDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../Firebase/FirebaseConfig';
import { Colors } from '../../common/styles'

const AppointmentsScreen = () => {
  const { user } = useAuthContext();
  const { userProfile, loading, error } = useUserProfile(user?.uid);
  const [appointments, setAppointments, loadingAppointments, errorAppointments] = searchAppointment(userProfile?.userType, user?.uid);

  const handleAccept = async (appointmentId) => {
    try {
      const appointmentRef = doc(FIRESTORE_DB, 'appointments', appointmentId);
      await updateDoc(appointmentRef, { apnStatus: 'approved' });
    } catch (error) {
      console.error('Error updating appointment status:', error.message);
    }
  };

  const handleDecline = async (appointmentId) => {
    try {
      const appointmentRef = doc(FIRESTORE_DB, 'appointments', appointmentId);
      await updateDoc(appointmentRef, { apnStatus: 'declined' });
    } catch (error) {
      console.error('Error updating appointment status:', error.message);
    }
  };

  useEffect(() => {
  }, [userProfile, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Appointments</Text>

      {loadingAppointments && <Text>Loading appointments...</Text>}

      {appointments.length === 0 ? (
        <Text style={styles.noAppointments}>No appointments available</Text>
      ) : (
        <View style={styles.appointmentsContainer}>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentBlock}>
              <Text style={styles.boldText}>Date: {appointment.apnDate}</Text>
              <Text style={styles.boldText}>Time: {appointment.apnTime}</Text>
              <Text style={styles.boldText}>Status: {appointment.apnStatus}</Text>

              {userProfile?.userType === 'Doctor' && appointment.apnStatus === 'pending' && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleAccept(appointment.id)} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDecline(appointment.id)} style={styles.declineButton}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginTop: 40,
    // backgroundColor: Colors.primary100,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noAppointments: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  appointmentsContainer: {
    marginTop: 20,
  },
  appointmentBlock: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  declineButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppointmentsScreen;
