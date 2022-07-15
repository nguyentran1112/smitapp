import React, {useCallback, useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {images, colors} from '../../constrants';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import ListUser from './ListUser';
import {
  onValue,
  auth,
  firebaseSet,
  firebaseRef,
  createUserWithEmailAndPassword,
  firebaseDatabase,
} from '../../firebase/firebase';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import {
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
  Alert,
} from 'react-native';

import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';

const Contact = props => {
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  let [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'user'), async snapshot => {
      if (snapshot.exists()) {
        let stringUser = await AsyncStorage.getItem('user');
        let myUserId = JSON.parse(stringUser).userId;
        let snapshotObject = snapshot.val();
        //Filter những userid mà có cái userid khác user đang đăng nhập
        setUsers(
          Object.keys(snapshotObject)
            .filter(eachKey => eachKey != myUserId)
            .map(eachKey => {
              let eachObject = snapshotObject[eachKey];
              return {
                img: 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
                name: eachObject.email,
                email: eachObject.email,
                accessToken: eachObject.accessToken,
                userId: eachKey,
              };
            }),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  const filterContact = () =>
    users.filter(eachUser =>
      eachUser.name
        .toString()
        .toLowerCase()
        .includes(searchText.toString().toLowerCase()),
    );
  return (
    <View style={styles.containerChat}>
      <View style={styles.headerChat}>
        <Icon style={styles.iconSearch} name={'search'} />
        {/* <Text style={styles.headerChatTitle}>Danh bạ</Text> */}
        <TextInput
          placeholder="Tìm kiếm"
          onChangeText={text => {
            setSearchText(text);
          }}
          style={tw`bg-blue-300 h-10 px-4 pl-10 py-2 rounded-xl text-white text-base font-semibold`}></TextInput>
      </View>

      {filterContact().length > 0 ? (
        <FlatList
          data={filterContact()}
          renderItem={({item}) => (
            <ListUser
              onPress={() => Alert.alert('Danh bạ',`Email: ${item.email}`)}
              user={item}
              key={item.name}
            />
          )}
          keyExtractor={eachUser => eachUser.name}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '90%',
          }}>
          {/* <Text
            style={{
              color: 'gray',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Không tìm thấy người dùng
          </Text> */}
          <LottieView autoPlay loop source={require('../../assets/notfound1.json')} />
        </View>
      )}
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  containerChat: {},
  headerChat: {
    height: 70,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 20,
  },
  headerChatTitle: {
    alignSelf: 'center',
    color: colors.secondary,
    fontSize: 22,
    lineHeight: 60,
  },
  iconSearch: {
    color: colors.secondary,
    position: 'absolute',
    top: 10,
    left: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 2,
  },
});
export default Contact;
