import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/CustomUI/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const RegistrationSelectorScreen = () => {

  const navigation = useNavigation();
  const handleOptionSelect = (role) => {
    navigation.navigate('RegistrationScreen', { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please confirm your choice!</Text>

      <View style={styles.buttons}>
          <PrimaryButton onPress={() => handleOptionSelect('Patient')} >
            Patient
          </PrimaryButton>
        </View>

        <View style={styles.buttons}>
          <PrimaryButton onPress={() => handleOptionSelect('Doctor')}>
            Doctor
          </PrimaryButton>
        </View>
    </View>
  );
};

export default RegistrationSelectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
});

