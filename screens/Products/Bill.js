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
  Modal,
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
import ModalPayment from './ModalPayment';
// create a component
const Bill = ({navigation, route}) => {
  const dateOfBill = new Date().toLocaleString();
  //Code for ProductList and Bill
  const listProduct = route.params.cart;
  const listProductInBill = listProduct.filter(
    product => product.quantity >= 1,
  );
  const listProductUpdate = listProductInBill.map(product => product);
  console.log(listProductUpdate);
  const detailBill = listProductInBill.map(
    product => product.name + ' ' + product.price + ' ' + product.quantity,
  );
  const totalQuantity = route.params.totalQuantity;
  const totalPrice = route.params.totalPrice;
  const totalCost = route.params.totalCost;

  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  //Truyen data tu con len cha
  const [isModal, setIsModal] = useState(false);
  const [cash, setCash] = useState(0);
  const [data, setChoiceData] = useState('');
  let changeModalVisible = bool => {
    setIsModal(bool);
  };

  console.log(`Khách trả ${cash}`);
  console.log(`Trạng thái ${isModal}`);
  const setData = data => {
    setChoiceData(data);
  };
  let changeCash = cash => {
    if (isModal) {
      setCash(cash);
      if (cash > 0) {
        alert('Thanh toán thành công');
        const idBill = nanoid();
        let newBil = {
          id: idBill,
          totalPrice: totalPrice,
          totalCost: totalCost,
          totalQuantity: totalQuantity,
          dateOfBill: dateOfBill.toString(),
          creator: email,
          payingGuests: cash - totalPrice,
          inDebt: cash - totalPrice >= 0 ? 0 : cash - totalPrice,
          cash: cash,
        };
        firebaseSet(
          firebaseRef(firebaseDatabase, `bills/${idBill}`),
          newBil,
        ).then(() => {});
        listProductInBill.forEach(element => {
          firebaseSet(
            firebaseRef(
              firebaseDatabase,
              `bills/${idBill}/Items/${element.id}`,
            ),
            element,
          ).then(() => {});
        });

        listProductUpdate.forEach(element => {
          if (typeof element.id !== 'undefined') {
            firebaseSet(
              firebaseRef(firebaseDatabase, `products/${element.id}/quantity`),
              element.stock - element.quantity,
            ).then(() => {});
            firebaseSet(
              firebaseRef(firebaseDatabase, `products/${element.id}/sold`),
              element.sold + element.quantity,
            ).then(() => {});
          } else {
            return null;
          }
        });
        navigate('Home');
      }
    } else {
      setCash(0);
    }
  };
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
              changeModalVisible(true);
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
              marginTop: 16,
              marginBottom: 4,
            }}>
            <Text style={styles.appButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          animations={true}
          visible={isModal}
          nRequestClose={() => changeModalVisible(false)}>
          <ModalPayment
            changeModalVisible={changeModalVisible}
            setData={setData}
            changeCash={changeCash}
          />
        </Modal>
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
    backgroundColor: 'rgb(191, 219, 254)',
    padding: 10,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  billInfo: {
    backgroundColor: 'rgb(191, 219, 254)',
    padding: 16,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
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
