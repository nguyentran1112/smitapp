//import liraries
import React, {Component, useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {
  ToastAndroid,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors} from '../../constrants';
import CheckBillItem from './CheckBillItem';
import Loading from '../Loading/Loading';
import {
  onValue,
  auth,
  firebaseSet,
  firebaseRef,
  createUserWithEmailAndPassword,
  firebaseDatabase,
} from '../../firebase/firebase';

// create a component
const CheckBill = props => {
  //Navigation
  const [findPending, setFindPending] = useState(false);
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  const [bill, setBill] = useState([]);
  const [searchText, setSearchText] = useState('');
  const checkBillItem = bill => (bill == '' ? false : true);
  const [data, setData] = useState('');
  const getData = text => {
    setData(text);
    setSearchText(text);
  };
  console.log(`Day la data ${searchText}`);
  const showToastFoundedBill = () => {
    ToastAndroid.showWithGravity(
      'Đã tìm thấy hóa đơn',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  const showToastNotFoundedBill = () => {
    ToastAndroid.showWithGravity(
      'Không tìm thấy hóa đơn',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  return (
    <>
      <View style={styles.topHeaderProductList}>
        <TouchableOpacity
          onPress={() => {
            checkBillItem(bill) ? showToastFoundedBill() : null;
            onValue(firebaseRef(firebaseDatabase, 'bills'), async snapshot => {
              if (snapshot.exists()) {
                let snapshotObject = snapshot.val();
                setBill(
                  Object.keys(snapshotObject)
                    .filter(eachKey => eachKey == searchText)
                    .map(eachKey => {
                      let eachObject = snapshotObject[eachKey];
                      return {
                        id: eachObject.id,
                        creator: eachObject.creator,
                        totalPrice: eachObject.totalPrice,
                        totalQuantity: eachObject.totalQuantity,
                        dateOfBill: eachObject.dateOfBill,
                        cash: eachObject.cash,
                        inDebt: eachObject.inDebt,
                        payingGuests: eachObject.payingGuests,
                        Items: Object.keys(eachObject.Items).map(eachKey => {
                          eachObject.Items[eachKey];
                          let product = eachObject.Items[eachKey];
                          return {
                            productId: product.id,
                            productName: product.name,
                            productQuantity: product.quantity,
                            productPrice: product.price,
                          };
                        }),
                      };
                    }),
                );
              } else {
                console.log('No data');
              }
            });
          }}
          style={styles.btnSearch}>
          <Icon style={[styles.iconSearch]} name={'search'}></Icon>
        </TouchableOpacity>
        <TextInput
          defaultValue={searchText}
          placeholder="Tìm kiếm hóa đơn"
          onChangeText={text => {
            setSearchText(text);
          }}
          style={[
            tw`bg-blue-300 h-10 px-4 pl-10 py-2 rounded-xl text-white text-base font-semibold flex-1`,
            ,
            styles.textInput,
          ]}></TextInput>
        <TouchableOpacity
          onPress={() => {
            navigate('QrScanner', {getData});
          }}
          style={{
            backgroundColor: colors.third,
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginLeft: 14,
          }}>
          <Icon style={styles.iconQrCode} name={'qrcode'}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.headerProductList}></View>
        {checkBillItem(bill) ? (
          <CheckBillItem bill={bill} />
        ) : (
          <View
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
            }}>
            <LottieView
              autoPlay
              loop
              source={require('../../assets/notfound1.json')}
            />
          </View>
        )}
      </View>
      {findPending ? <Loading></Loading> : null}
    </>
  );
};
// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    paddingHorizontal: 10,
    padding: 10,
  },
  headerProductList: {
    height: 0,
  },
  topHeaderProductList: {
    height: 70,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  bottomHeaderProductList: {
    backgroundColor: 'blue',
    flex: 1,
    marginBottom: 15,
  },
  iconSearch: {
    backgroundColor: colors.subColor,
    borderRadius: 20,
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  btnSearch: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  textInput: {
    marginLeft: 10,
  },
  iconQrCode: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

//make this component available to the app
export default CheckBill;
