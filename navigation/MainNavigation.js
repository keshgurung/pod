import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Route} from "./Route";
import {Colors} from '../common/styles';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationSelectorScreen from '../screens/RegistrationSelectorScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MainScreen from '../screens/Main/MainScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: Colors.primary500},
      headerTintColor: 'white',
      contentStyle: {backgroundColor: Colors.primary100},
    }}>
      <Stack.Screen name={Route.StartScreen} component={StartScreen} />
      <Stack.Screen name={Route.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Route.RegistrationSelectorScreen} component={RegistrationSelectorScreen} />
      <Stack.Screen name={Route.RegistrationScreen} component={RegistrationScreen} />
      {/* <Stack.Screen name={Route.MainScreen} component={MainScreen} /> */}
      </Stack.Navigator>
  );
};

export default MainNavigation;