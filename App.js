import React from 'react';
import {
  Turnover,
  ModalPayment,
  Bill,
  Register,
  Home,
  Welcome,
  Login,
  ProductList,
  Setting,
  UITap,
  Notification,
  Contact,
  ProductListCart,
} from './components/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackRouter} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'Welcome'}
            component={Welcome}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'Register'}
            component={Register}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'Login'}
            component={Login}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'UITap'}
            component={UITap}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'Notification'}
            component={Notification}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'ProductListCart'}
            component={ProductListCart}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'Bill'}
            component={Bill}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'ModalPayment'}
            component={ModalPayment}
          />
          <Stack.Screen
            options={{headerTitle: 'Test', headerShown: false}}
            name={'Turnover'}
            component={Turnover}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
