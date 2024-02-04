import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import PrimaryButton from '../components/CustomUI/PrimaryButton';
import { useLogin } from '../hook/useLogin';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin()

  const handleSubmit = () => {
    login(email, password)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subTitle}>Sign in to continue</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        secureTextEntry={false}
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
        style={styles.input}
      />

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {!isPending ? (
         <View style={styles.buttons}>
         <PrimaryButton onPress={() => handleSubmit()} >
           Log In
         </PrimaryButton>
       </View>
      ) : (
        <View style={styles.buttons}>
          <ActivityIndicator size="small" color="white" />
        </View>
      )}
      {error && alert('Sign up failed: ' + error.message)}

      <View style={styles.commonLine} />

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => { /* handle navigation to SignUp */ }}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
    marginBottom: 40,
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 16,
  },
  forgotPasswordText: {
    color: 'blue',
    marginTop: 16
  },
  loginButton: {
    marginTop: -30,
  },
  commonLine: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 40,
  },
  signUpText: {
    color: 'gray',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 5,
  },
  buttons: {
    marginTop: 12,
  }
});

