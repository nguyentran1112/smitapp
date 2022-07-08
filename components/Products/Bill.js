//import liraries
import React, {Component, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCart,
  increment,
  decrement,
  clear,
  removeItem,
} from '../../redux/cartSlice';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import BillItem from './BillItem';
import LottieView from 'lottie-react-native';
import {colors, images} from '../../constrants/index';
import {
  auth,
  onValue,
  onAuthStateChanged,
  firebaseSet,
  firebaseRef,
  firebaseDatabase,
} from '../../firebase/firebase';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
// create a component
const Bill = ({navigation, route}) => {
  const dateOfBill = new Date();
  //Code for ProductList and Bill
  const listProduct = route.params.cart;
  const listProductInBill = listProduct.filter(
    product => product.quantity >= 1,
  );
  const listProductUpdate = listProductInBill.map(product => product);
  const detailBill = listProductInBill.map(
    product => product.name + ' ' + product.price + ' ' + product.quantity,
  );
  const totalQuantity = route.params.totalQuantity;
  const totalPrice = route.params.totalPrice;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  const [user, setUser] = useState([]);
  //get Email of user
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
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ĐƠN HÀNG</Text>
          <Text
            style={{
              paddingLeft: '40%',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              position: 'absolute',
              left: '30%',
              top: '44%',
              width: 40,
              height: 22,
              borderRadius: 10,
              backgroundColor: colors.success,
            }}>
            {totalQuantity}
          </Text>
        </View>
        <FlatList
          data={listProductInBill}
          renderItem={({item}) => <BillItem product={item} key={item.name} />}
          keyExtractor={eachProduct => eachProduct.name}
        />
        <View style={styles.billInfo}>
          <LottieView
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            autoPlay
            loop
            source={require('../../assets/bgbill.json')}
          />
          <Text
            style={{
              color: colors.primary,
              fontSize: 17,
              fontWeight: 'bold',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            THANH TOÁN
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 15,
                fontWeight: 'bold',
                justifyContent: 'center',
              }}>
              Tạm tính
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 15,
                fontWeight: 'bold',
                justifyContent: 'center',
              }}>
              {totalPrice} VND
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 15,
                fontWeight: 'bold',
                justifyContent: 'center',
              }}>
              Phí áp dụng
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 15,
                fontWeight: 'bold',
                justifyContent: 'center',
              }}>
              0 VND
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 15,
                fontWeight: 'bold',
                justifyContent: 'center',
              }}>
              Tổng tiền
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 15,
                fontWeight: 'bold',
                justifyContent: 'center',
              }}>
              {totalPrice} VND
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const idBill = nanoid();
              let newBil = {
                id: idBill,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                dateOfBill: dateOfBill.toString(),
                creator: email,
                detailBill: detailBill.toString(),
              };
              firebaseSet(
                firebaseRef(firebaseDatabase, `bills/${idBill}`),
                newBil,
              ).then(() => {
                alert('Thanh toán thành công');
              });
              listProductUpdate.forEach(element => {
                if (typeof element.id !== 'undefined') {
                  firebaseSet(
                    firebaseRef(
                      firebaseDatabase,
                      `products/${element.id}/quantity`,
                    ),
                    element.stock - element.quantity,
                  ).then(() => {});
                } else {
                  return null;
                }
              });

              navigate('Home');
            }}
            style={{
              zIndex: 1,
              backgroundColor: colors.success,
              borderRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 12,
              width: '100%',
              height: 50,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={styles.appButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  header: {
    backgroundColor: colors.third,
    padding: 10,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  billInfo: {
    backgroundColor: colors.third,
    padding: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default Bill;