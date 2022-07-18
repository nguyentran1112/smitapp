import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductItem from './ProductItem';
import {colors, images} from '../../constrants';
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
  Alert,
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

const ProductList = props => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'products'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = await snapshot.val();
        setProducts(
          Object.keys(snapshotObject).map(eachKey => {
            let eachObject = snapshotObject[eachKey];
            return {
              img: eachObject.img,
              id: eachObject.id,
              name: eachObject.name,
              price: eachObject.price,
              quantity: eachObject.quantity,
            };
          }),
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
    products.filter(eachProduct =>
      eachProduct.name
        .toString()
        .toLowerCase()
        .includes(searchText.toString().toLowerCase()),
    );

  return (
    <>
      <View style={styles.topHeaderProductList}>
        <Icon style={styles.iconSearch} name={'search'}></Icon>
        <TextInput
          placeholder="Tìm kiếm sản phẩm"
          onChangeText={text => {
            setSearchText(text);
          }}
          style={tw`bg-blue-300 h-10 px-4 pl-10 py-2 rounded-xl text-white text-base font-semibold flex-1`}></TextInput>
        {/* <Icon style={styles.iconBars} name={'bars'}></Icon> */}
      </View>
      <View style={styles.container}>
        <View style={styles.headerProductList}>
          <FlatList
            style={{flex: 1}}
            horizontal
            data={category}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Thông tin nhóm',
                      `Đây là nhóm ${item.nameCategory}`,
                      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    );
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
              <ProductItem
                onPress={() =>
                  Alert.alert(
                    'Thông tin sản phẩm',
                    'Tên sản phẩm: ' +
                      ' ' +
                      item.name +
                      '\n' +
                      'Giá: ' +
                      item.price +
                      'VNĐ' +
                      '\n' +
                      'Tồn kho: ' +
                      item.quantity,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  )
                }
                product={item}
                key={item.name}
              />
            )}
            keyExtractor={eachProduct => eachProduct.name}
          />
        ) : (
          // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          //   <Text
          //     style={{
          //       color: 'gray',
          //       fontSize: 18,
          //       fontWeight: 'bold',
          //     }}>
          //     Không tìm thấy sản phẩm
          //   </Text>
          // </View>
          <View
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
            }}>
            {/* <Text
            style={{
              color: 'gray',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Không tìm thấy người dùng
          </Text> */}
            <LottieView
              autoPlay
              loop
              source={require('../../assets/notfound1.json')}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    paddingHorizontal: 10,
    //paddingTop: 10,
  },
  headerProductList: {
    height: 80,
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
});
export default ProductList;
