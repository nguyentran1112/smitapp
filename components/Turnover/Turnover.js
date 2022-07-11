//import liraries
import React, {Component, useState, useEffect} from 'react';
import tw from 'twrnc';
import {images, colors} from '../../constrants';
import {
  onValue,
  auth,
  firebaseSet,
  firebaseRef,
  createUserWithEmailAndPassword,
  firebaseDatabase,
  sendEmailVerification,
  reateUserWithEmailAndPassword,
  get,
  child,
} from '../../firebase/firebase';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// create a component
const Turnover = () => {
  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'bills'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = await snapshot.val();
        setlistBill(
          Object.keys(snapshotObject).map(eachKey => {
            let eachObject = snapshotObject[eachKey];
            return {
              creator: eachObject.creator,
              id: eachObject.id,
              dateOfBill: eachObject.dateOfBill,
              totalPrice: eachObject.totalPrice,
              totalQuantity: eachObject.totalQuantity,
            };
          }),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  const [listBill, setlistBill] = useState([]);
  const turnover = listBill.reduce((total, bill) => total + bill.totalPrice, 0);
  const totalProducts = listBill.reduce(
    (total, product) => total + product.totalQuantity,
    0,
  );
  const totalBill = listBill.length;
  console.log(totalBill);
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingEnd: 10,
          flex: 1,
          flexDirection: 'row',
          marginVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            backgroundColor: colors.secondary,
            paddingHorizontal: 15,
            paddingBottom: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            borderRadius: 20,
          }}>
          <View>
            <View style={tw`pt-4 items-center`}>
              <View style={{}}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 16}}>
                  TỔNG DOANH THU
                </Text>
              </View>
            </View>
            <View style={{justifyContent: 'center', marginTop: 8}}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                {turnover} VNĐ
              </Text>
            </View>
            <View
              style={{
                marginTop: 8,
                paddingTop: 4,
                borderTopWidth: 1,
                width: '100%',
                borderColor: 'gray',
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>Đơn hàng đã bán</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.primary,
                  fontSize: 16,
                }}>
                {totalBill} đơn
              </Text>
            </View>
            <View
              style={{
                marginTop: 8,
                paddingTop: 4,
                borderTopWidth: 1,
                width: '100%',
                borderColor: 'gray',
              }}>
              <Text style={{color: 'gray', fontSize: 15}}>Số hàng đã bán</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.primary,
                  fontSize: 16,
                }}>
                {totalProducts} sản phẩm
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Turnover;
