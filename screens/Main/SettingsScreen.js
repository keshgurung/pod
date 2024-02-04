// import { StyleSheet,View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
// import { useLogout } from '../../hook/useLogout';
// import { useAuthContext } from '../../hook/useAuthContext';
// import PrimaryButton from '../../components/CustomUI/PrimaryButton';
// import { Colors } from '../../common/styles'
// import useUserProfile from '../../hook/useUserProfile'

// const SettingsScreen = () => {
//   const { logout } = useLogout()
//   const { user } = useAuthContext()
//   const { userProfile, loading, error } = useUserProfile(user?.uid);
//   return (
//     <View style={styles.container}>
//    <View style={styles.buttons}>
//          <PrimaryButton onPress={logout} >
//            Logout
//          </PrimaryButton>
//        </View>
//   </View>
//   )
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: Colors.primary100,
//   },
// });

// export default SettingsScreen;


import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { useLogout } from '../../hook/useLogout';
import { useAuthContext } from '../../hook/useAuthContext';
import PrimaryButton from '../../components/CustomUI/PrimaryButton';
import { Colors } from '../../common/styles';
import useUserProfile from '../../hook/useUserProfile';
import QualificationScreen from './QualificationScreen';

const SettingsScreen = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { userProfile, loading, error } = useUserProfile(user?.uid);
  const [isAddQualificationModalVisible, setIsAddQualificationModalVisible] = useState(false);

  const handleAddQualification = () => {
    setIsAddQualificationModalVisible(true);
  };

  const handleAddQualificationClose = () => {
    setIsAddQualificationModalVisible(false);
  };

  return (
    <View style={styles.container}>

        {userProfile?.userType === 'Doctor' && (
          <TouchableOpacity style={styles.addQualificationButton} onPress={handleAddQualification}>
            <Text style={styles.addQualificationButtonText}>Add Qualification</Text>
          </TouchableOpacity>
        )}

      <View style={styles.buttons}>
        <PrimaryButton onPress={logout}>
          Logout
        </PrimaryButton>

      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isAddQualificationModalVisible}
        onRequestClose={handleAddQualificationClose}
      >
        <QualificationScreen onClose={handleAddQualificationClose} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.primary100,
  },
  buttons: {
    marginTop: 20,
  },
  addQualificationButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  addQualificationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
