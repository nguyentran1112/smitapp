//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {colors, images} from '../../constrants';
import {Table, Row, Rows} from 'react-native-table-component';
import QRCode from 'react-native-qrcode-svg';
import { addCommas } from '../../utilities';

// create a component
const CheckBillItem = ({bill}) => {
  const creator = bill.map(bill => bill.creator.toString());
  const id = bill.map(bill => bill.id.toString());
  const cash = bill.map(bill => Number(bill.cash.toString()));
  const payingGuests = bill.map(bill => Number(bill.payingGuests.toString()));
  const totalPrice = bill.map(bill => Number(bill.totalPrice.toString()));
  const totalQuantity = bill.map(bill => Number(bill.totalQuantity.toString()));
  const dateOfBill = bill.map(bill => bill.dateOfBill.toString());
  const arryItems = bill.map(bill => bill.Items);
  let logoFromFile = require('../../assets/smitaLogo.jpg');
  const tableHead = ['Mã', 'Tên', 'SL', 'Đơn giá', 'TT'];
  // const tableData = [
  //   ['1', '2', '3', '4'],
  //   ['a', 'b', 'c', 'd'],

  // ];
  const tableData = [];
  var first = function (element) {
    return !!element;
  };
  var gotcha = arryItems.find(first);
  if (typeof gotcha !== 'undefined') {
    gotcha.forEach(element => {
      element.totalPrice = element.productQuantity * element.productPrice;
      tableData.push(Object.values(element));
      console.log(element);
    });
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginVertical: 16, alignItems: 'center'}}>
            <Text style={styles.headerTitle}>HÓA ĐƠN SMITA</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginVertical: 4,
            }}>
            <Text style={{flex: 1, fontSize: 16, color: 'black'}}>
              Cửa hàng: SMITA
            </Text>
            <Text style={styles.styleTextInfo}>NV: {creator}</Text>
          </View>
          <View style={styles.styleViewInfo}>
            <Text style={styles.styleTextInfo}>Thời gian: {dateOfBill} </Text>
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
          <View style={styles.styleViewInfo}>
            <Text style={{flex: 1, fontSize: 16, color: 'black'}}>
              Tổng số lượng hàng:
            </Text>
            <Text style={styles.styleTextInfo}>{totalQuantity} sản phẩm</Text>
          </View>
          <View style={styles.styleViewInfo}>
            <Text style={{flex: 1, fontSize: 16, color: 'black'}}>
              Chiết khấu hóa đơn:
            </Text>
            <Text style={styles.styleTextInfo}>0 VNĐ</Text>
          </View>
          <View style={styles.styleViewInfo}>
            <Text style={{flex: 1, fontSize: 16, color: 'black'}}>
              Tổng tiền:
            </Text>
            <Text style={styles.styleTextInfo}>{addCommas(totalPrice)} VNĐ</Text>
          </View>

          <View style={styles.styleViewInfo}>
            <Text style={{flex: 1, fontSize: 16, color: 'black'}}>
              Khách trả:
            </Text>
            <Text style={styles.styleTextInfo}>{addCommas(cash)} VNĐ</Text>
          </View>
          <View style={styles.styleViewInfo}>
            <Text style={{flex: 1, fontSize: 16, color: 'black'}}>
              Trả lại khách:
            </Text>
            <Text style={styles.styleTextInfo}>{addCommas(payingGuests)} VNĐ</Text>
          </View>
          <View style={styles.styleViewInfo}>
            <Text style={styles.styleTextInfo}>Loại thanh toán: Tiền mặt</Text>
          </View>
          <View style={styles.styleViewInfo}>
            <Text style={styles.styleTextInfo}>Mã hóa đơn: {id}</Text>
          </View>
          <View style={{alignSelf: 'center', marginVertical: 4}}>
            <QRCode
              value={id}
              logo={logoFromFile}
              logoSize={30}
              logoBackgroundColor="transparent"
            />
          </View>
          <View style={styles.styleViewInfoFooter}>
            <Text style={{fontSize: 15, marginVertical: 4}}>
              Quý khách vui lòng kiểm tra kỹ hóa đơn trước khi rời cửa hàng
            </Text>
          </View>
          <View style={styles.styleViewInfoFooter}>
            <Text style={{fontSize: 15, marginVertical: 4}}>
              Mọi thông tin thắc mắc và đóng góp ý kiến xin gửi về email:
              smitapp@cnfit.com
            </Text>
          </View>
          
        </View>
      </ScrollView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.third,
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  styleViewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  styleTextInfo: {
    fontSize: 16,
    color: 'black',
  },
  styleViewInfoFooter: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: 'black'},
});

//make this component available to the app
export default CheckBillItem;
