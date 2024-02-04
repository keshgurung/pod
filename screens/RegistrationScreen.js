import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import PrimaryButton from '../components/CustomUI/PrimaryButton';
import { useSignup } from '../hook/useSignup';

const RegistrationScreen = ({ route, navigation }) => {
  const { role } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { signup, isPending, error } = useSignup()

  const specialtyOptions = ['dermatology',
    'cardiology',
    'endocrinology',
    'gastroenterology',
    'neurology',
    'oncology',
    'orthopedic', 'surgery',
    'pediatrics',
    'psychiatry',
    'pulmonology',
    'rheumatology',
    'urology',
    'ophthalmology'
    ];
  const locationOptions = ['london', 'glasgow', 'manchester', 'bristol','liverpool','york','cambridge','bath'];

  const handleSpecialtySelect = (selectedSpecialty) => {
    setSpecialty(selectedSpecialty);
    setShowSpecialtyModal(false);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocationModal(false);
  };

  const handleSubmit = () => {
    signup(email, password, name, specialty, location, role)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi!</Text>

      <Text style={styles.subHeader}>Create a new account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {role === 'Doctor' && (
        <>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowSpecialtyModal(true)}
          >
            <Text style={styles.boldText}>
    Specialty: <Text style={{ fontWeight: 'normal' }}>{specialty || 'Choose Specialty'}</Text>
         </Text>
            
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showSpecialtyModal}
            onRequestClose={() => setShowSpecialtyModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {specialtyOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => handleSpecialtySelect(option)}
                  >
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowLocationModal(true)}
          >
           <Text style={styles.boldText}>
    Location: <Text style={{ fontWeight: 'normal' }}>{location || 'Choose Location'}</Text>
          </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showLocationModal}
            onRequestClose={() => setShowLocationModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {locationOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => handleLocationSelect(option)}
                  >
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </>
      )}

      <View style={styles.buttons}>
        <PrimaryButton onPress={() => handleSubmit()}>
          Register
        </PrimaryButton>
      </View>

      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => console.log('Sign In tapped!')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'blue',
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 16,
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
  },
  alreadyHaveAccountText: {
    color: 'gray',
  },
  signInLink: {
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 5,
  },
  buttons: {
    marginTop: 12,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
