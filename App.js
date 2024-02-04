import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './screens/Main/MainScreen';
import MainNavigation from './navigation/MainNavigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './Firebase/FirebaseConfig';
import { AuthContextProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return <MainNavigation />;
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [user, setUser] = useState(null); // Initialize with null or an empty object {}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log('authUser', authUser);
      setUser(authUser || null); // If authUser is null, set to null
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {(user === null) ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
    <AuthContextProvider>
    <StatusBar style="light" />
      <Navigation />
    </AuthContextProvider>
    </>
  );
}
