import React, {useState} from 'react';
import tw from 'twrnc';
import {images, colors} from '../../constrants';
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
  Dimensions,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const ModalPayment = props => {
  const [cash, setCash] = useState('');
  const closeModal = (bool, data, cash) => {
    props.changeModalVisible(bool);
    props.setData(data);
    if(bool === false) {
      props.changeCash(cash);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.headerText}>Thanh toán bằng tiền mặt</Text>
        <TextInput
          value={cash}
          placeholder="Nhập số tiền khách trả"
          onChangeText={text => {
            setCash(Number(text));
          }}
          style={tw`bg-blue-300 mt-4 h-12 px-4 pl-4 py-2 rounded-xl text-white text-base font-semibold`}></TextInput>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <TouchableOpacity
            onPress={() => {
              closeModal(false, 'Home', cash);
            }}
            style={{
              elevation: 8,
              backgroundColor: 'rgb(37, 99, 235)',
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 10,
              width: '100%',
              height: 40,
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <Text style={styles.appButtonText}>Đồng ý</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              closeModal(false, 'Cancel');
            }}
            style={{
              elevation: 8,
              backgroundColor: colors.subColor,
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 10,
              width: '100%',
              height: 40,
              alignSelf: 'center',
            }}>
            <Text style={styles.appButtonText}>Hủy</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};
export default ModalPayment;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  modal: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    justifyContent: 'center',
    alignSelf: 'center',
    width: WIDTH - 50,
    height: 250,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  appButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerText: {
    color: colors.primary,
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
