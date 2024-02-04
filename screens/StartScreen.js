import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import PrimaryButton from '../components/CustomUI/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const StartScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRegisterPress = () => {
    navigation.navigate('RegistrationSelectorScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/LR.jpeg')}
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          WELCOME!
        </Text>

        <Text style={styles.subtitle}>
          Please Login or Register for New User
        </Text>

        <View style={styles.buttons}>
          <PrimaryButton onPress={handleLoginPress} >
            Log In
          </PrimaryButton>
          <Button title="Register" onPress={handleRegisterPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '40%',
    aspectRatio: 1,
    borderRadius: 300,
    position: 'absolute',
    top: 80,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    paddingVertical: 16,
  },
  buttons: {
    marginTop: 12,
  },
});

export default StartScreen;
