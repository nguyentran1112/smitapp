import React, {useState, useEffect} from 'react';
import {ModalEditUser} from './SimpleModal';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images} from '../../constrants';
import {StackActions} from '@react-navigation/native';
import {
  updatePassword,
  onValue,
  auth,
  onAuthStateChanged,
  firebaseSet,
  firebaseRef,
  firebaseDatabase,
} from '../../firebase/firebase';
import {
  Linking,
  Alert,
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  FlatList,
  Switch,
} from 'react-native';

const Setting = props => {
  const [user, setUser] = useState([]);
  const [isUseFingerprint, setUseFingerprin] = useState(false);
  const toggleSwitch = () => setUseFingerprin(previousState => !previousState);

  //Navigation
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  const [isModal, setIsModal] = useState(false);
  const [data, setChoiceData] = useState('');
  //console.log('Van tay',isUseFingerprint)
  AsyncStorage.setItem('fingerprint', isUseFingerprint.toString());
  AsyncStorage.getItem('fingerprint').then(fingerprint => {
    console.log('Van tay local', fingerprint);
  });
  let changeModalVisible = bool => {
    setIsModal(bool);
  };
  const setData = data => {
    setChoiceData(data);
  };

  const changePassword = pwN => {
    console.log(pwN);
    const user = auth.currentUser;
    updatePassword(user, pwN)
      .then(function () {
        console.log('Thanh cong');
      })
      .catch(function (error) {
        console.log(`thatbai ${error}`);
      });
  };

  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'user'), async snapshot => {
      if (snapshot.exists()) {
        let stringUser = await AsyncStorage.getItem('user');
        let myUserId = JSON.parse(stringUser).userId;
        let snapshotObject = snapshot.val();
        //Filter những userid mà có cái userid khác user đang đăng nhập
        setUser(
          Object.keys(snapshotObject)
            .filter(eachKey => eachKey === myUserId)
            .map(eachKey => {
              let eachObject = snapshotObject[eachKey];
              return {
                img: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
                name: eachObject.email,
                email: eachObject.email,
                userId: eachKey,
              };
            }),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  const email = user.map(user => user.email).toString();
  return (
    <View style={styles.containerSetting}>
      <View style={styles.headerSetting}>
        <Text style={styles.headerSettingTitle}>Cài đặt</Text>
      </View>
      <ScrollView>
        <View style={styles.componentSetting}>
          <Text style={styles.componentSettingTitle}>Tài khoản</Text>
        </View>
        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'id-card-o'}></Icon>
          <Text style={styles.componentSettingofTitle}>{email}</Text>
        </View>
        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconLock} name={'lock'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Đăng nhập bằng vân tay
          </Text>
          <View style={{flex: 1}}></View>
          <Switch
            style={{marginRight: 10}}
            thumbColor={
              isUseFingerprint ? 'rgb(37, 99, 235)' : 'rgb(37, 99, 235)'
            }
            trackColor={{
              false: 'rgb(212, 212, 212)',
              true: 'rgb(147, 197, 253)',
            }}
            onValueChange={toggleSwitch}
            value={isUseFingerprint}></Switch>
        </View>

        <TouchableOpacity
          onPress={() => {
            changeModalVisible(true);
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'key'}></Icon>
          <Text style={styles.componentSettingofTitle}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await auth.signOut();
            navigation.dispatch(StackActions.replace('Welcome'));
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'sign-out'}></Icon>
          <Text style={styles.componentSettingofTitle}>Đăng xuất</Text>
        </TouchableOpacity>
        <View style={styles.componentSetting}>
          <Text style={styles.componentSettingTitle}>Cửa hàng</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Thông tin cửa hàng', 'Cửa hàng SMITA');
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'home'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Xem thông tin cửa hàng
          </Text>
        </TouchableOpacity>

        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'credit-card'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Phương thức thanh toán
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Phí vận chuyển',
              'Phí vận chuyển sẽ được quyết định bởi đơn vị vận chuyển.',
            )
          }
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'truck'}></Icon>
          <Text style={styles.componentSettingofTitle}>Phí vận chuyển</Text>
        </TouchableOpacity>
        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'laptop'}></Icon>
          <Text style={styles.componentSettingofTitle}>Website bán hàng</Text>
        </View>
        <View style={styles.componentSetting}>
          <Text style={styles.componentSettingTitle}>Thiết bị</Text>
        </View>
        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'print'}></Icon>
          <Text style={styles.componentSettingofTitle}>Thêm máy in mới</Text>
        </View>
        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'qrcode'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Thêm máy scanner mới
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://phongvu.vn/cong-nghe/bat-mi-cach-chon-mua-may-in-phu-hop-tot-nhat/#:~:text=L%E1%BB%B0A%20CH%E1%BB%8CN%20M%C3%81Y%20IN%20C%C3%93%20%C4%90%E1%BB%98%20PH%C3%82N%20GI%E1%BA%A2I%20CAO&text=DPI%20%C4%91o%20l%C6%B0%E1%BB%9Dng%20c%C3%B3%20bao,nhu%20c%E1%BA%A7u%20in%20h%C3%ACnh%20%E1%BA%A3nh.',
            );
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconLock} name={'question'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Hướng dẫn mua máy in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://aidcvn.com/huong-dan-cach-su-dung-may-quet-ma-vach.html',
            );
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconLock} name={'question'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Hướng dẫn mua máy scanner
          </Text>
        </TouchableOpacity>

        <View style={styles.componentSetting}>
          <Text style={styles.componentSettingTitle}>Thông tin ứng dụng</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://forms.gle/XW5NCw7DLY1JKPuE8');
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconUser} name={'comment'}></Icon>
          <Text style={styles.componentSettingofTitle}>Đóng góp ý kiến</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Thông tin về ứng dụng',
              'Ứng dụng SMITA v0.1\nNhà phát triển: Trần Chí Nguyên',
            );
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconAbout} name={'info'}></Icon>
          <Text style={styles.componentSettingofTitle}>Về ứng dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Chính sách mã nguồn mở',
              'Các mã nguồn mở đều được công khai trên Github',
            );
          }}
          style={styles.styleSperator}>
          <Icon style={styles.iconTrash} name={'book'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Chính sách mã nguồn mở
          </Text>
        </TouchableOpacity>
        <View
          style={styles.styleSperator}>
          <Icon style={styles.iconTrash} name={'copyright'}></Icon>
          <Text style={styles.componentSettingofTitle}>
            Bản quyền thuộc về CNFIT
          </Text>
        </View>
        <Text
          style={{
            color: 'rgb(37, 99, 235)',
            alignSelf: 'center',
            fontSize: 16,
            paddingVertical: 15,
          }}>
          SMITA an toàn và bảo mật
        </Text>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        animations={true}
        visible={isModal}
        nRequestClose={() => changeModalVisible(false)}>
        <ModalEditUser
          changeModalVisible={changeModalVisible}
          setData={setData}
          changePassword={changePassword}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSetting: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerSetting: {
    height: 60,
    backgroundColor: 'rgb(37, 99, 235)',
  },
  headerSettingTitle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    lineHeight: 60,
  },
  componentSetting: {
    height: 40,
    backgroundColor: 'rgb(147, 197, 253)',
    justifyContent: 'center',
    paddingStart: 10,
  },
  componentSettingTitle: {
    color: 'rgb(30, 64, 175)',
    fontSize: 18,
  },
  iconUser: {
    fontSize: 17,
    color: 'rgb(37, 99, 235)',
  },
  iconLock: {
    fontSize: 17,
    color: 'rgb(37, 99, 235)',
    marginRight: 5,
  },
  iconTrash: {
    fontSize: 17,
    color: 'rgb(37, 99, 235)',
    marginRight: 4,
  },
  iconAbout: {
    fontSize: 17,
    color: 'rgb(37, 99, 235)',
    marginHorizontal: 6,
  },
  componentSettingofTitle: {
    color: 'black',
    fontSize: 17,
    paddingStart: 10,
  },
  styleSperator: {
    flexDirection: 'row',
    paddingStart: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
export default Setting;
