import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
const Background = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <LottieView source={require('../../assets/bgdot.json')} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    
  },
});
export default Background;