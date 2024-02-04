import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import useUserProfile from '../../hook/useUserProfile';
import PrimaryButton from '../../components/CustomUI/PrimaryButton';
import searchDoctors from '../../hook/searchDoctors';
import DoctorProfileView from './DoctorProfile';
import { Colors } from '../../common/styles';

const SearchScreen = () => {
  const { userProfile, loading, error } = useUserProfile();

  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [specialtyModalVisible, setSpecialtyModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const specialtyOptions = [
    'dermatology',
    'cardiology',
    'endocrinology',
    'gastroenterology',
    'neurology',
    'oncology',
    'orthopedic',
    'surgery',
    'pediatrics',
    'psychiatry',
    'pulmonology',
    'rheumatology',
    'urology',
    'ophthalmology',
  ];
  const locationOptions = [
    'london',
    'glasgow',
    'manchester',
    'bristol',
    'liverpool',
    'york',
    'cambridge',
    'bath',
  ];

  const handleSearch = async () => {
    try {
      const searchResults = await searchDoctors(specialty, location);
      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleSpecialtySelect = (option) => {
    setSpecialty(option);
    setSpecialtyModalVisible(false);
  };

  const handleLocationSelect = (option) => {
    setLocation(option);
    setLocationModalVisible(false);
  };

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseProfileView = () => {
    setSelectedDoctor(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Specialty:</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setSpecialtyModalVisible(true)}>
        <Text>{specialty || 'Select Specialty'}</Text>
      </TouchableOpacity>
      <Modal visible={specialtyModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {specialtyOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSpecialtySelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Text style={styles.label}>Location:</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setLocationModalVisible(true)}>
        <Text>{location || 'Select Location'}</Text>
      </TouchableOpacity>
      <Modal visible={locationModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {locationOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleLocationSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <View style={styles.buttons}>
        <PrimaryButton onPress={handleSearch}>Search</PrimaryButton>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsInfo}>{searchResults.length} results found</Text>
        {searchResults.map((result, index) => (
          <View key={index} style={styles.resultItem}>
            <Text style={styles.resultText}>Name: {result.name}</Text>
            <Text style={styles.resultText}>Specialty: {result.specialty}</Text>
            <View style={styles.buttons}>
              <PrimaryButton onPress={() => handleViewProfile(result)}>View Profile</PrimaryButton>
            </View>
          </View>
        ))}
      </View>

      <DoctorProfileView doctor={selectedDoctor} onClose={handleCloseProfileView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 10,
  },
  buttons: {
    marginTop: 12,
  },
  resultsInfo: {
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  resultItem: {
    backgroundColor: 'lightgray',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SearchScreen;
