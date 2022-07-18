import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import tw from 'twrnc';
import {
  onValue,
  firebaseSet,
  firebaseRef,
  firebaseDatabase,
} from '../../firebase/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors} from '../../constrants';
import NotificationItem from './NotificationItem';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
const Notification = props => {
  //const {name, img, userId} = props.route.params.user;
  // const [messenge, setMessanges] = useState([]);
  // useEffect(() => {
  //   onValue(firebaseRef(firebaseDatabase, 'chat'), snapshot => {
  //     if (snapshot.exists()) {
  //       let snapshotObject = snapshot.val();
  //       setMessanges(Object.keys(snapshotObject).map(eachKey => {
  //           return {
  //             ...snapshotObject[eachKey],
  //           };
  //         }).sort((item1, item2) => item1.timeStamp - item2.timeStamp))
  //     }
  //   });
  // },[]);
  let [messenge, setMessanges] = useState([
    // {
    //   img: 'https://cdn.tgdd.vn/Files/2015/06/20/657406/coxanhcoqua-800x340.jpg',
    //   date: '11/12/2022',
    //   messenge: 'Khuyến mãi',
    // },
  ]);
 
  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'notifications'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = await snapshot.val();
        setMessanges(
          Object.keys(snapshotObject).map(eachKey => {
              let eachObject = snapshotObject[eachKey];
              return {
                img: eachObject.img,
                date: eachObject.date,
                messenge: eachObject.messenge
              };
            }),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  return (
    <View style={styles.containerMessanges}>
      <View style={styles.headerMessanges}>
        {/* <Icon style={styles.iconSearch} name={'search'} /> */}
        <Text style={styles.headerMessangesTitle}>Thông báo</Text>
        
      </View>
      <FlatList
        style={{}}
        data={messenge}
        renderItem={({item}) => (
          <NotificationItem
            // onPress={() => alert(`${item.messenge}`)}
            item={item}
            key={`${item.timeStamp}`}
          />
        )}
      />


    </View>
  );
};
const styles = StyleSheet.create({
  containerMessanges: {
    flex: 1,
  },
  headerMessanges: {
    height: 60,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerMessangesTitle: {
    alignSelf: 'center',
    color: colors.secondary,
    fontSize: 22,
    lineHeight: 60,
  },
  iconSearch: {
    color: colors.primary,
    position: 'absolute',
    top: 10,
    right: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  messengesImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
export default Notification;
