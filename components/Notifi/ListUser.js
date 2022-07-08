import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
//import { Icon } from 'react-native-elements';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import {colors} from '../../constrants';

const ListUser = props => {
  let {name, img, messenge, userId} = props.user;
  const {onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          marginBottom: 5,
          height: 70,
          backgroundColor: colors.secondary,
          padding: 5,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}>
        <Image
          style={styles.chatImage}
          source={{
            uri: img,
          }}
        />
        <View >
          <Text
            style={{
              color: 'black',
              fontSize: 16,
             
            }}>
            {name}
          </Text>
          <Text style={{color: 'rgb(107, 114, 128)'}}>{messenge}</Text>
        </View>
        <Text
          style={{
            color: 'rgb(107, 114, 128)',
            fontSize: 11,
            position: 'absolute',
            right: 10,
            top: 35,
          }}>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 5,
  },
});
export default ListUser;
