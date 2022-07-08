import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, colors} from '../../constrants';
import {useSelector, useDispatch} from 'react-redux';
import {setCart,increment, decrement, clear, removeItem} from '../../redux/cartSlice';
import {cartTotalPriceSelector} from '../../redux/selectors';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const amount = 0;
const _checkQuantityRender = quantityProduct => {
  return quantityProduct <= 0
    ? 'rgba(115, 147, 179, 0.2)'
    : 'rgb(59, 130, 246)';
};
const ProductItemCart = props => {
  let {id, name, price, quantity, img, stock} = props.product;
  const cart = useSelector(state => state.cart);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const dispatch = useDispatch();
  return (
    <>
      <View >
        <View
          style={{
            marginBottom: 15,
            height: 120,
            backgroundColor: _checkQuantityRender(stock),
            padding: 5,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <Image
            style={styles.ProductImage}
            source={{
              uri: img,
            }}
          />
          <View style={styles.boxContextOfProduct}>
            <Text style={styles.nameOfProduct}>{name}</Text>
            <Text>
              <Icon style={styles.iconBarCode} name={'barcode'}>
                {' '}
              </Icon>
              <Text style={styles.idOfProduct}>{id}</Text>
            </Text>
            <Text>
              <Icon style={styles.iconArchive} name={'archive'}>
                {' '}
              </Icon>
              <Text style={styles.idOfProduct}>{stock}</Text>
            </Text>
            <Text style={styles.priceOfProduct}>
              <Icon style={styles.iconDollar} name={'dollar'}>
                {' '}
              </Icon>
              {price}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              top: '50%',
              right: '2%',
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(decrement(id));
                if(quantity <= 0) {
                  dispatch(increment(id));
                }
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.subColor,
                height: 40,
                width: 40,
                borderRadius: 20,
              }}>
              <Text style={styles.iconPlusSub}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                top: '8%',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                marginHorizontal: 16,
              }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if(quantity >= stock) {
                  dispatch(decrement(id))
                }
                dispatch(increment(id));
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.success,
                height: 40,
                width: 40,
                borderRadius: 20,
              }}>
              <Text style={styles.iconPlusSub}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
    marginRight: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  boxContextOfProduct: {
    //backgroundColor: 'green',
    flex: 1,
  },
  nameOfProduct: {
    marginRight: 5,
    color: colors.secondary,
    fontSize: 17,
    fontWeight: 'bold',
  },
  idOfProduct: {
    color: colors.secondary,
    fontSize: 15,
  },
  iconBarCode: {
    color: colors.secondary,
    fontSize: 15,
  },
  iconArchive: {
    color: colors.secondary,
    fontSize: 15,
  },
  priceOfProduct: {
    fontSize: 16,
    color: 'rgb(249, 115, 22)',
    fontWeight: 'bold',
  },
  iconDollar: {
    fontSize: 18,
    color: 'rgb(249, 115, 22)',
    fontWeight: 'bold',
  },
  iconPlusSub: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default ProductItemCart;
