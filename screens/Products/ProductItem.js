import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { Icon } from 'react-native-elements';
import {images, colors} from '../../constrants';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';


const _checkQuantityRender = (quantityProduct) => {
    return (quantityProduct <= 0 ?'rgba(115, 147, 179, 0.2)':'rgb(59, 130, 246)')
}
const ProductItem = (props) => {
    let {id, name, price, quantity, img} = props.product;
    const {onPress} = props
    return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        marginBottom: 15,
        height: 120,
        backgroundColor:_checkQuantityRender(quantity),
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
          <Text style={styles.idOfProduct}>{quantity}</Text>
        </Text>
        <Text
          style={styles.priceOfProduct}>
            <Icon style={styles.iconDollar} name={'dollar'}> </Icon>
            {price}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
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
  iconDollar : {
    fontSize: 18,
    color: 'rgb(249, 115, 22)',
    fontWeight: 'bold',

  }
});
export default ProductItem;
