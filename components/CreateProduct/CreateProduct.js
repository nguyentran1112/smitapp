//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  auth,
  onValue,
  onAuthStateChanged,
  firebaseSet,
  firebaseRef,
  firebaseDatabase,
} from '../../firebase/firebase';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors} from '../../constrants';
import DropDownPicker from 'react-native-dropdown-picker';
import {isValidLink, isValidNumber} from '../../utilities/Validation';

// create a component
const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Snack', value: 2000},
    {label: 'Thực phẩm khô', value: 3000},
    {label: 'Nước đóng chai/lon', value: 4000},
    {label: 'Sữa và chế phẩm từ sữa', value: 5000},
    {label: 'Sản phẩm đóng gói khác', value: 6000},
  ]);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [linkImg, setLinkImg] = useState('');
  //
  const [errorName, setErrorName] = useState('');
  const [errorId, setErrorId] = useState('');
  const [errorQuantity, setErrorQuantity] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const [errorCost, setErrorCost] = useState('');
  const [errorLink, setErrorLink] = useState('');
  const Validation = () => {
    return (
      name.length > 0 &&
      isValidNumber(id) &&
      isValidNumber(quantity) &&
      isValidNumber(price) &&
      isValidNumber(cost) &&
      isValidLink(linkImg)
    );
  };
  console.log(Validation());
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.lable}>Chọn nhóm sản phẩm</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            zIndex={1000}
            style={{
              backgroundColor: colors.third,
            }}
            textStyle={{
              fontSize: 14,
            }}
            theme="LIGHT"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.lable}>Tên sản phẩm</Text>
          <TextInput
            value={name}
            placeholder="Nhập tên sản phẩm"
            onChangeText={text => {
              setErrorName(
                text.length >= 1 ? '' : 'Dữ liệu không đúng định dạng',
              );
              setName(text);
            }}
            style={tw`bg-blue-300 px-4 py-3 rounded-xl text-white text-lg font-semibold`}></TextInput>
          <Text style={{color: 'red', fontSize: 13}}>{errorName}</Text>
        </View>
        <View style={styles.formDoubleControl}>
          <View style={styles.formInput}>
            <Text style={styles.lable}>Mã sản phẩm</Text>
            <TextInput
              value={id}
              keyboardType="phone-pad"
              placeholder="Nhập mã"
              onChangeText={text => {
                setErrorId(
                  isValidNumber(text) ? '' : 'Dữ liệu không đúng định dạng',
                );
                setId(Number(text));
              }}
              style={tw`bg-blue-300 px-4 py-3 rounded-xl text-white text-lg font-semibold`}></TextInput>
            <Text style={{color: 'red', fontSize: 13}}>{errorId}</Text>
          </View>
          <View style={styles.formInput}>
            <Text style={styles.lable}>Số lượng</Text>
            <TextInput
              keyboardType="phone-pad"
              value={quantity}
              placeholder="Nhập số lượng"
              onChangeText={text => {
                setErrorQuantity(
                  isValidNumber(text) ? '' : 'Dữ liệu không đúng định dạng',
                );
                setQuantity(Number(text));
              }}
              style={tw`bg-blue-300 px-4 py-3 rounded-xl text-white text-lg font-semibold`}></TextInput>
            <Text style={{color: 'red', fontSize: 13}}>{errorQuantity}</Text>
          </View>
        </View>
        <View style={styles.formDoubleControl}>
          <View style={styles.formInput}>
            <Text style={styles.lable}>Giá bán lẻ</Text>
            <TextInput
              keyboardType="phone-pad"
              value={price}
              placeholder="Nhập giá bán lẻ"
              onChangeText={text => {
                setErrorPrice(
                  isValidNumber(text) ? '' : 'Dữ liệu không đúng định dạng',
                );
                setPrice(Number(text));
              }}
              style={tw`bg-blue-300 px-4 py-3 rounded-xl text-white text-lg font-semibold`}></TextInput>
            <Text style={{color: 'red', fontSize: 13}}>{errorPrice}</Text>
          </View>
          <View style={styles.formInput}>
            <Text style={styles.lable}>Giá nhập</Text>
            <TextInput
              value={cost}
              keyboardType="phone-pad"
              placeholder="Nhập giá nhập"
              onChangeText={text => {
                setErrorCost(
                  isValidNumber(text) ? '' : 'Dữ liệu không đúng định dạng',
                );
                setCost(Number(text));
              }}
              style={tw`bg-blue-300 px-4 py-3 rounded-xl text-white text-lg font-semibold`}></TextInput>
            <Text style={{color: 'red', fontSize: 13}}>{errorCost}</Text>
          </View>
        </View>

        <View style={styles.formControl}>
          <Text style={styles.lable}>Đường dẫn hình ảnh</Text>
          <TextInput
            placeholder="Nhập đường dẫn hình ảnh"
            onChangeText={text => {
              setErrorLink(
                isValidLink(text) ? '' : 'Dữ liệu không đúng định dạng',
              );
              setLinkImg(text);
            }}
            style={tw`bg-blue-300 px-4 py-3 rounded-xl text-white text-lg font-semibold`}></TextInput>
          <Text style={{color: 'red', fontSize: 13}}>{errorLink}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            let newProduct = {
              id: id,
              name: name,
              img: linkImg,
              grId: value,
              cost: cost,
              price: price,
              quantity: quantity,
            };
            firebaseSet(
              firebaseRef(firebaseDatabase, `products/${id}`),
              newProduct,
            ).then(() => {});
            setPrice('');
            setCost('');
            setName('');
            setQuantity('')
            setLinkImg('')
          }}
          disabled={!Validation()}
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
            marginTop: 18,
          }}>
          <Text style={styles.appButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
  },
  formControl: {
    width: '100%',
    marginBottom: 4,
  },
  formDoubleControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lable: {
    color: 'rgb(30, 64, 175)',
    alignItems: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  formInput: {
    width: '45%',
  },
});

//make this component available to the app
export default CreateProduct;
