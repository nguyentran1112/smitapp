import React, {useState} from 'react';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
  auth,
  firebaseSet,
  firebaseRef,
  createUserWithEmailAndPassword,
  firebaseDatabase,
  sendEmailVerification,
  reateUserWithEmailAndPassword,
} from '../../firebase/firebase';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images} from '../../constrants';
import {isValidEmail, isValidPassword} from '../../utilities/index';
import {
  Alert,
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
const Login = props => {
  //state for validate inputs
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRePassword, setErrorRePassword] = useState('');
  //state for store inputs
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');
  //Validation is Okay
  const Validation = () => {
    return (
      Email.length > 0 &&
      Password.length > 0 &&
      RePassword.length > 0 &&
      isValidPassword(Password) &&
      isValidEmail(Email) &&
      Password === RePassword
    );
  };

  return (
    <ImageBackground
      source={images.backgroundLogin}
      resizeMode="cover"
      style={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={tw`items-center absolute inset-x-0 top-10 h-16`}>
        <View style={tw`bg-blue-200 px-3 py-1 rounded-full`}>
          <Text style={tw`text-blue-800 text-2xl font-semibold`}>
            Đăng ký tài khoản SMITA
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              value={Email}
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
              value={Password}
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
          <View style={styles.formControl}>
            <Text style={styles.lable}>Nhập lại mật khẩu</Text>
            <TextInput
              value={RePassword}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={true}
              onChangeText={text => {
                setErrorRePassword(
                  Password === text ? '' : 'Mật khẩu không khớp',
                );
                setRePassword(text);
              }}
              style={tw`bg-blue-400 px-4 py-3 rounded-2xl text-white text-base text-lg font-semibold`}></TextInput>
            <Text style={{color: 'red', fontSize: 14}}>{errorRePassword}</Text>
          </View>
          <View>
            <TouchableOpacity
              disabled={!Validation()}
              onPress={() => {
                createUserWithEmailAndPassword(auth, Email, Password)
                  .then(userCredentails => {
                    const user = userCredentails.user;
                    sendEmailVerification(user).then(() => {});
                  })
                  .catch(error => {
                    (error.code = 'auth/email-already-in-use')
                      ? alert('Tài khoản đã tồn tại')
                      : alert(`${error.code}`);
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
              <Text style={styles.appButtonText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </ImageBackground>
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
