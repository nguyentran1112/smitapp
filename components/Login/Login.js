import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import AsyncStorage from '@react-native-community/async-storage';
import {
  signInWithCredential,
  credential,
  getRedirectResult,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  firebaseSet,
  firebaseRef,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseDatabase,
  sendEmailVerification,
  reateUserWithEmailAndPassword,
} from '../../firebase/firebase';
import {images} from '../../constrants';
import {isValidEmail, isValidPassword} from '../../utilities/index';
import TouchID from 'react-native-touch-id';
import {
  Alert,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import Loading from '../Loading/Loading';
const Login = props => {
  //state for validate inputs
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [Auth, setAuth] = useState(null);

  AsyncStorage.getItem('user')
    .then(user => {
      setAuth(user);
    })
    .catch(err => {
      console.log(err);
    });

  //state for store inputs
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const optionalConfigObject = {
    title: 'Đăng nhập với vân tay', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const handleBiometrics = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              console.log(success);
              Auth != null
                ? navigate('UITap')
                : alert('Chưa có tài khoản, vui lòng đăng nhập');
            })
            .catch(error => {
              alert(error);
            });
        }
      })
      .catch(error => {
        // Failure code
        Alert.alert('Lỗi', 'Thiết bị không hỗ trợ vân tay', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log(error);
      });
  };

  //Validation is Okay
  const Validation = () => {
    return (
      Email.length > 0 &&
      Password.length > 0 &&
      isValidPassword(Password) &&
      isValidEmail(Email)
    );
  };

  //Navigation
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  //Loading
  const [loginPending, setLoginPending] = useState(false);
  const checkLoginPending = user => {
    return user != null ? setLoginPending(true) : false;
  };

  return (
    <>
      <ImageBackground
        source={images.backgroundLogin}
        resizeMode="cover"
        style={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={tw`items-center absolute inset-x-0 top-10 h-16`}>
          <View style={tw`bg-blue-200 px-3 py-1 rounded-full`}>
            <Text style={tw`text-blue-800 text-2xl font-semibold`}>
              Đăng nhập vào SMITA
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.lable}>Email</Text>
              <TextInput
                placeholder="Nhập email"
                onChangeText={text => {
                  setErrorEmail(
                    isValidEmail(text)
                      ? ''
                      : 'Địa chỉ email không đúng định dạng',
                  );
                  setEmail(text);
                }}
                style={tw`bg-blue-400 px-4 py-3 rounded-2xl text-white text-lg font-semibold`}></TextInput>
              <Text style={{color: 'red', fontSize: 14}}>{errorEmail}</Text>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.lable}>Mật khẩu</Text>
              <TextInput
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                onChangeText={text => {
                  setErrorPassword(
                    isValidPassword(text)
                      ? ''
                      : 'Mật khẩu phải có độ dài tối thiểu 6 ký tự',
                  );
                  setPassword(text);
                }}
                style={tw`bg-blue-400 px-4 py-3 rounded-2xl text-white text-lg font-semibold`}></TextInput>
              <Text style={{color: 'red', fontSize: 14}}>{errorPassword}</Text>
            </View>

            <View>
              <TouchableOpacity
                disabled={!Validation()}
                onPress={() => {
                  signInWithEmailAndPassword(auth, Email, Password)
                    .then(userCredentails => {
                      const user = userCredentails.user;
                      checkLoginPending(user);
                      //setLoginPending(false);
                    })
                    .catch(error => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      alert(errorMessage);
                    });
                }}
                style={{
                  elevation: 8,
                  backgroundColor: Validation()
                    ? 'rgb(37, 99, 235)'
                    : 'rgb(107, 114, 128)',
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  width: '100%',
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text style={styles.appButtonText}>Đăng nhập</Text>
              </TouchableOpacity>

              {/* Đăng nhập với tài khoản GG */}
              <TouchableOpacity
                onPress={handleBiometrics}
                style={styles.appBtnSubmitLoginGoogle}>
                <Text style={styles.appButtonTextLoginGoogle}>
                  Đăng nhập với vân tay
                </Text>
                {/* <Icon name={'google'} style={styles.logoGoogle}></Icon> */}
                <Image
                  style={styles.logoGoogle}
                  source={images.iconFingerprint}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      {loginPending ? <Loading /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  logoGoogle: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 12,
    left: 65,
  },
  appBtnSubmitLogin: {},
  appBtnSubmitRegister: {
    elevation: 8,
    backgroundColor: 'rgb(37, 99, 235)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  appBtnSubmitLoginGoogle: {
    borderColor: 'rgb(37, 99, 235)',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 50,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  appButtonTextLoginGoogle: {
    fontSize: 18,
    color: 'rgb(37, 99, 235)',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    shadowColor: 'white',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    borderRadius: 10,
  },
  formControl: {
    width: '100%',
    marginBottom: 12,
  },
  lable: {
    color: 'rgb(30, 64, 175)',
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Login;
