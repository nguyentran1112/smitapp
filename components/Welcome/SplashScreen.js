import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {images} from '../../constrants';
import tw from 'twrnc';
import {
  auth,
  onAuthStateChanged,
  firebaseSet,
  firebaseRef,
  firebaseDatabase,
} from '../../firebase/firebase';
const SplashScreen = props => {
  //Navigation
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  //Check user and add information to database
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const userId = user.uid;
        let userInfor = {
          userId: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          accessToken: user.accessToken,
        };
        navigate('UITap');
        firebaseSet(firebaseRef(firebaseDatabase, `user/${userId}`), userInfor);
        AsyncStorage.setItem('user', JSON.stringify(userInfor));
      } else {
        navigate('Welcome');
      }
    });
  });

  return (
    <ImageBackground
      source={images.backgroundWelcome}
      resizeMode="cover"
      style={{flex: 1, justifyContent: 'center'}}>
      <View style={tw`items-center absolute inset-x-0 top-10 h-16`}>
        <View style={tw`bg-blue-200 px-3 py-1 rounded-full`}>
          <Text style={tw`text-blue-800 text-2xl font-semibold`}>
            Welcome to SMITA
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
