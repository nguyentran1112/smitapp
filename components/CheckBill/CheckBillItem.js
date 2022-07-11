//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, images} from '../../constrants';
import {Table, Row, Rows} from 'react-native-table-component';

// create a component
const CheckBillItem = ({bill}) => {
  const creator = bill.map(bill => bill.creator.toString());
  const id = bill.map(bill => bill.id.toString());
  const totalPrice = bill.map(bill => Number(bill.totalPrice.toString()));
  const totalQuantity = bill.map(bill => Number(bill.totalQuantity.toString()));
  const dateOfBill = bill.map(bill => bill.dateOfBill.toString());
  const arryItems = bill.map(bill => bill.Items);

  const tableHead = ['Mã', 'Tên', 'Số lượng', 'Đơn giá'];
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
      tableData.push(Object.values(element));
    });
  }

  console.log(tableData);
  return (
    <>
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
          <Text
            style={{flex: 1, fontSize: 17, fontWeight: 'bold', color: 'black'}}>
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
          <Text style={{flex: 1, fontSize: 17, color: 'black'}}>
            Tổng số lượng hàng:
          </Text>
          <Text style={styles.styleTextInfo}>{totalQuantity} sản phẩm</Text>
        </View>
        <View style={styles.styleViewInfo}>
          <Text style={{flex: 1, fontSize: 17, color: 'black'}}>
            Chiết khấu hóa đơn:
          </Text>
          <Text style={styles.styleTextInfo}>0 VNĐ</Text>
        </View>
        <View style={styles.styleViewInfo}>
          <Text style={{flex: 1, fontSize: 17, color: 'black'}}>
            Tổng tiền:
          </Text>
          <Text style={styles.styleTextInfo}>{totalPrice} VNĐ</Text>
        </View>
        <View style={styles.styleViewInfo}>
          <Text style={styles.styleTextInfo}>Loại thanh toán: Tiền mặt</Text>
        </View>
        <View style={styles.styleViewInfo}>
          <Text style={styles.styleTextInfo}>Mã hóa đơn: {id}</Text>
        </View>
        <View style={styles.styleViewInfoFooter}>
          <Text style={{fontSize: 15, marginVertical: 4}}>
            Quý khách vui lòng kiểm tra kỹ hóa đơn trước khi rời cửa hàng.
          </Text>
        </View>
        <View style={styles.styleViewInfoFooter}>
          <Text style={{fontSize: 15, marginVertical: 4}}>
            Email: smitapp@cnfit.com
          </Text>
        </View>
      </View>
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
    fontSize: 17,
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
