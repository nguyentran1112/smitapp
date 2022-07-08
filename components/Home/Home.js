import React from 'react';
import Backgroud from '../Loading/Background';
import LottieView from 'lottie-react-native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {images, colors} from '../../constrants';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
const WIDTH = Dimensions.get('window').width;

const Home = (props) => {
  let today = new Date();
  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
  //Navigation
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  const addSession = hours => {
    if ((hours >= 1) & (hours < 11)) {
      const greeting = 'Xin chào buổi sáng';
      return greeting;
    } else if ((hours >= 11) & (hours <= 12)) {
      const greeting = 'Xin chào buổi trưa';
      return greeting;
    } else if ((hours > 12) & (hours <= 18)) {
      const greeting = 'Xin chào buổi chiều';
      return greeting;
    }
    const greeting = 'Xin chào buổi tối';
    return greeting;
  };
  return (
    <>
      <View style={{zIndex: 1}}>
        <SafeAreaView style={tw`h-full`}>
          <View style={tw`pt-12 items-center`}>
            <View style={tw`bg-blue-200 px-3 py-1 rounded-full`}>
              <Text style={tw`text-blue-800 text-xl font-semibold`}>
                {addSession(hours)}
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 16,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginTop: 16,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate('ProductListCart');
              }}
              style={styles.card}>
              {/* <Icon style={styles.icon} name={'shopping-cart'} /> */}
              <LottieView
                style={{width: 75, height: 75}}
                autoPlay
                loop
                source={require('../../assets/shopping-add.json')}
              />
              <Text style={styles.title}>Tạo đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LottieView
                style={{width: 75, height: 75}}
                autoPlay
                loop
                source={require('../../assets/bill.json')}
              />
              <Text style={styles.title}>Xem hóa đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LottieView
                style={{width: 75, height: 75}}
                autoPlay
                loop
                source={require('../../assets/product-scanner.json')}
              />
              <Text style={styles.title}>Tạo mã hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LottieView
                style={{width: 75, height: 75}}
                autoPlay
                loop
                source={require('../../assets/store.json')}
              />
              <Text style={styles.title}>Kết ca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LottieView
                style={{width: 75, height: 75}}
                autoPlay
                loop
                source={require('../../assets/market.json')}
              />
              <Text style={styles.title}>Nhận hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <LottieView
                style={{width: 75, height: 75}}
                autoPlay
                loop
                source={require('../../assets/exchange.json')}
              />
              <Text style={styles.title}>Trả hàng</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
      <Backgroud />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
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
    width: '30%',
    height: 120,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 16,
  },
  icon: {
    color: colors.primary,
    fontSize: 25,
  },
  title: {
    color: 'black',
    fontSize: 14,
  },
});
export default Home;
