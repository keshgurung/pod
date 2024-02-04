import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../hook/useAuthContext';
import PrimaryButton from '../../components/CustomUI/PrimaryButton';
import { createDoctorQualification } from '../../hook/createDoctorQualification';


const QualificationScreen = ({ onClose, navigation }) => {
  const { user } = useAuthContext();
  const { handleQualification, error, isPending } = createDoctorQualification();
  const [degreeName, setDegreeName] = useState('');
  const [institute, setInstitute] = useState('');
  const [passingYear, setPassingYear] = useState('');

  const handleSave = async () => {
    if (!degreeName || !institute || !passingYear) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await handleQualification(user?.uid, degreeName, institute, passingYear);
      Alert.alert('Success', 'Qualification saved successfully.');
      setDegreeName('');
      setInstitute('');
      setPassingYear('');
      onClose();
    } catch (error) {
      console.error('Error saving qualification:', error);
      Alert.alert('Error', 'Failed to save qualification. Please try again.');
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Text style={styles.backButtonText}>&lt; Back</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Degree Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter degree name"
          value={degreeName}
          onChangeText={text => setDegreeName(text)}
        />

        <Text style={styles.label}>Institute</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter institute name"
          value={institute}
          onChangeText={text => setInstitute(text)}
        />

        <Text style={styles.label}>Passing Year</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter passing year e.g: 2010"
          value={passingYear}
          onChangeText={text => setPassingYear(text)}
          keyboardType="numeric"
        />

        <View style={styles.buttons}>
         <PrimaryButton onPress={handleSave} >
           Save Qualification
         </PrimaryButton>
       </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  formContainer: {
    marginTop: 80,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  buttons: {
    marginTop: 16,
  }
});

export default QualificationScreen;
