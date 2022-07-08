import React, {useState} from 'react';
import tw from 'twrnc';
import {images, colors} from '../../constrants';
import {
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

function NotificationItem(props) {
  const {img, date, messenge} = props.item;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingEnd: 10,
          flex: 1,
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            backgroundColor: colors.secondary,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            borderRadius: 10,
          }}>
          <Image
            style={{height: 85, width: 200, marginRight: 15}}
            source={{uri: img}}></Image>
          <View>
            <View style={tw`pt-4 items-center`}>
              <View style={tw`bg-blue-200 px-3 py-1 rounded-full`}>
                <Text style={tw`text-blue-800 font-semibold`}>
                  {messenge}
                </Text>
              </View>
            </View>
            <View style={tw`pt-4 items-center`}></View>
            <View style={tw`bg-blue-200 px-3 py-1 rounded-full`}>
              <Text style={tw`text-blue-800 font-semibold`}>
               {date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NotificationItem;
