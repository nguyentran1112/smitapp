import * as React from 'react';
import {Home, ProductList, Setting, Notification, Contact} from '../index';
import {colors, images} from '../../constrants/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const UITap = props => {
  const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarActiveTintColor: 'rgba(37, 99, 235, 1)',
    tabBarActiveBackgroundColor: 'white',
    tabBarInactiveBackgroundColor: 'white',
    tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.3)',
    tabBarIcon: ({focused, color, size}) => {
      let sreenName = route.name;
      let iconName = 'home';
      if (sreenName == 'ProductList') {
        iconName = 'shopping-cart';
      } else if (sreenName == 'Setting') {
        iconName = 'gear';
      } else if (sreenName == 'Notification') {
        iconName = 'bell';
      } else if (sreenName == 'Contact') {
        iconName = 'address-book';
      }
      return (
        <Icon
          size={22}
          weight={'bold'}
          name={iconName}
          color={focused ? colors.primary : 'rgba(0, 0, 0, 0.3)'}
        />
      );
    },
  });
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarLabelStyle: {fontSize: 12},
        }}
        name={'Home'}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Thông báo',
          tabBarLabelStyle: {fontSize: 12},
        }}
        name={'Notification'}
        component={Notification}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Sản phẩm', tabBarLabelStyle: {fontSize: 12}}}
        name={'ProductList'}
        component={ProductList}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Danh bạ', tabBarLabelStyle: {fontSize: 12}}}
        name={'Contact'}
        component={Contact}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Cài đặt', tabBarLabelStyle: {fontSize: 12}}}
        name={'Setting'}
        component={Setting}
      />
    </Tab.Navigator>
  );
};
export default UITap;
