import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const DoctorProfileView = ({ doctor, onClose }) => {
  return (
    <Modal visible={!!doctor} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Doctor Profile</Text>
        <Text>Name: {doctor?.name}</Text>
        <Text>Email: {doctor?.email}</Text>
        <Text>Specialty: {doctor?.specialty}</Text>
        {doctor?.qualifications && (
          <>
            <Text style={styles.qualificationsTitle}>Qualifications:</Text>
            {doctor.qualifications.map((qualification, index) => (
              <View key={index} style={styles.qualificationItem}>
                <Text>Degree: {qualification.degreeName}</Text>
                <Text>Institute: {qualification.institute}</Text>
                <Text>Passing Year: {qualification.passingYear}</Text>
              </View>
            ))}
          </>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qualificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  qualificationItem: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorProfileView;