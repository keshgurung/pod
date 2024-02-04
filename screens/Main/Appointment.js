import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import useDoctorData from '../../hook/useDoctorData';
import PrimaryButton from '../../components/CustomUI/PrimaryButton';
import { createAppointment } from '../../hook/createAppointment';
import { useAuthContext } from "../../hook/useAuthContext"

const Appointment = () => {

  const { handleAppointment, error: appointmentError, isPending } = createAppointment();
  const { user } = useAuthContext()
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, loading, error] = useDoctorData();
  const [isDoctorModalVisible, setIsDoctorModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentMinutes = date.getMinutes();
    const roundedMinutes = Math.round(currentMinutes / 30) * 30;
    date.setMinutes(roundedMinutes);

    setTime(date);
  }, [date]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDoctorModalVisible(false);
  };

  const handleDoctorPress = () => {
    setIsDoctorModalVisible(true);
  };

  const handleDoctorModalClose = () => {
    setIsDoctorModalVisible(false);
  };


const handleSubmit = async () => {

  if (!date || !time || !selectedDoctor || !message) {
    alert('Please fill in all the required fields');
    return;
  }

  const timeString = `${time.getHours()}:${time.getMinutes()}`;
  const doctorUid = selectedDoctor.uid;
  const patientId = user.uid;
  const apnStatus = 'pending';
  await handleAppointment(date.toDateString(), timeString, doctorUid, message, patientId, apnStatus);

  setTime(new Date());
  setSelectedDoctor('');
  setMessage('');

  alert('Appointment saved successfully!');
};

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Appointment Date and Time:</Text>

      <View>
        <Button title="Select Date" onPress={handleShowDatePicker} />
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      </View>

      <View>
        <Button title="Select Time" onPress={handleShowTimePicker} />
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            minuteInterval={30}
            minimumDate={new Date(0, 0, 0, 9, 0, 0)}
            maximumDate={new Date(0, 0, 0, 17, 0, 0)}
            onChange={handleTimeChange}
          />
        )}
      </View>

    <View>
      <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Select Doctor:</Text>
        <TouchableOpacity onPress={handleDoctorPress} style={styles.dropdownButton}>
    <Text>{selectedDoctor ? selectedDoctor.name : 'Select a doctor'}</Text>
        </TouchableOpacity>
    </View>

      <View>
        <Text>Write your message:</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          placeholder="Write your message here..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
      </View>

      <Modal visible={isDoctorModalVisible} animationType="slide">
        <View style={styles.doctorModalContainer}>
          <Text style={styles.modalHeader}>Select a Doctor</Text>
          {loading && <Text>Loading doctors...</Text>}
          {error && <Text>Error fetching doctors</Text>}
          {!loading && !error && doctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={styles.doctorItem}
              onPress={() => handleDoctorSelect(doctor)}
            >
              <Text>{doctor.name}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={handleDoctorModalClose} />
        </View>
      </Modal>

      {/* {isPending && <Text>Saving appointment...</Text>} */}
      {appointmentError && <Text>Error saving appointment: {appointmentError}</Text>}

      <View style={styles.buttons}>
        <PrimaryButton onPress={handleSubmit} disabled={isPending}>
          Book Appointment
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttons: {
    marginTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  dropdownButton: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
  },
  messageInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  selectedInfoContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  doctorModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  doctorItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Appointment;

