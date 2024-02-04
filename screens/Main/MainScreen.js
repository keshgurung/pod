import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Colors} from '../../common/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';
import AppointmentsScreen from './AppointmentsScreen';
import useUserProfile from '../../hook/useUserProfile';
import { useAuthContext } from '../../hook/useAuthContext';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const { user } = useAuthContext();
  const { userProfile, loading, error } = useUserProfile(user?.uid);

  const renderTabs = () => {
    const tabs = [
      { name: 'Home', component: HomeScreen, icon: 'home', iconOutline: 'home-outline' },
      { name: 'Appointments', component: AppointmentsScreen, icon: 'calendar', iconOutline: 'calendar-outline' },
      { name: 'Search', component: SearchScreen, icon: 'search', iconOutline: 'search-outline' },
      { name: 'Settings', component: SettingsScreen, icon: 'settings', iconOutline: 'settings-outline' },
    ];

    // Filter tabs based on the condition (e.g., user is a patient)
    const filteredTabs = userProfile?.userType === 'Patient' ? tabs : tabs.filter(tab => tab.name !== 'Search');

    return filteredTabs.map(tab => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? tab.icon : tab.iconOutline} size={size} color={color} />
          ),
        }}
      />
    ));
  };

  return (
    <Tab.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: Colors.primary500},
      headerTintColor: 'white',
      contentStyle: {backgroundColor: Colors.primary100},
    }}>
    {renderTabs()}
  </Tab.Navigator>
  );
};

export default MainScreen;
