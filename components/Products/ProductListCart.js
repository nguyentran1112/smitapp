import React, {Component, useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCart,
  increment,
  decrement,
  clear,
  removeItem,
} from '../../redux/cartSlice';

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
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import ProductItemCart from '../Products/ProductItemCart';
import cartTotalSelector from '../../redux/selectors';
import cartTotalPriceSelector from '../../redux/selectors';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, images} from '../../constrants';

const ProductListCart = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  //Navigation
  const {navigation, routes} = props;
  //Functions of navigate to / back
  const {navigate, goBack} = navigation;
  //const count = useSelector(selectCount);
  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'products'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = await snapshot.val();
        dispatch(
          setCart(
            Object.keys(snapshotObject).map(eachKey => {
              let eachObject = snapshotObject[eachKey];
              return {
                img: eachObject.img,
                id: eachObject.id,
                name: eachObject.name,
                price: eachObject.price,
                stock: eachObject.quantity,
                quantity: 0,
              };
            }),
          ),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  const [category, setCategory] = useState([
    {
      nameCategory: 'Đồ khô',
      icon: images.iconNoodel,
    },
    {
      nameCategory: 'Nước ngọt',
      icon: images.iconBottleGas,
    },
    {
      nameCategory: 'Nước khoáng',
      icon: images.iconBottle,
    },
    {
      nameCategory: 'Mỹ phẩm',
      icon: images.iconSkincare,
    },
    {
      nameCategory: 'Snacks',
      icon: images.iconSnack,
    },
    {
      nameCategory: 'Kẹo',
      icon: images.iconCandy,
    },
    {
      nameCategory: 'Văn phòng phẩm',
      icon: images.iconPen,
    },
  ]);

  const filterProduct = () =>
    cart.filter(eachProduct =>
      eachProduct.name
        .toString()
        .toLowerCase()
        .includes(searchText.toString().toLowerCase()),
    );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerProductList}>
          <View style={styles.topHeaderProductList}>
            <Icon style={styles.iconSearch} name={'search'}></Icon>
            <TextInput
              placeholder="Tìm kiếm sản phẩm"
              onChangeText={text => {
                setSearchText(text);
              }}
              style={tw`bg-blue-300 h-10 px-4 pl-10 py-2 rounded-xl text-white text-base font-semibold flex-1`}></TextInput>
            {/* <Icon style={styles.iconBars} name={'bars'}></Icon> */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.third,
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginLeft: 14,
              }}>
              <Icon style={styles.iconBarCode} name={'barcode'}></Icon>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{flex: 1}}
            horizontal
            data={category}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    alert(`Đây là nhóm ${item.nameCategory}`);
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image style={styles.CateImage} source={item.icon} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={eachCategory => eachCategory.nameCategory}
          />
        </View>
        {/* {products.map(product => 
          <ProductItem product={product} key={product.nameProduct}/>
        )} */}
        {filterProduct().length > 0 ? (
          <FlatList
            data={filterProduct()}
            renderItem={({item}) => (
              <ProductItemCart
                product={item}
                key={item.name}
              />
            )}
            keyExtractor={eachProduct => eachProduct.name}
          />
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
      <View style={tw`bg-blue-200 px-3 py-1 rounded-full mx-2 my-2`}>
        <Text
          style={{
            backgroundColor: colors.success,
            width: 40,
            right: 30,
            fontSize: 18,
            paddingLeft: '25%',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            color: colors.secondary,
            position: 'absolute',
            right: '4%',
            top: '25%',
          }}>
          {cart.reduce((total, current) => (total += current.quantity), 0)}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={tw`text-blue-800 text-xl font-semibold mr-1`}>
            Tổng tiền:
          </Text>
          <Text style={tw`text-blue-800 text-xl font-semibold`}>
            {cart.reduce(
              (total, current) => (total += current.price * current.quantity),
              0,
            )}{' '}
            VND
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerProductList: {
    height: 160,
  },
  topHeaderProductList: {
    height: 70,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  bottomHeaderProductList: {
    backgroundColor: 'blue',
    flex: 1,
    marginBottom: 15,
  },
  CateImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
    backgroundColor: 'rgb(147, 197, 253)',
    marginRight: 10,
  },
  textInputSearch: {},
  iconSearch: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
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
  iconBars: {
    color: colors.secondary,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    // position: 'absolute',
    // right: 10,
    // top: 10
  },
  iconBarCode: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

export default ProductListCart;
