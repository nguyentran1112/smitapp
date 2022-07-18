import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
const Loading = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <LottieView source={require('../../assets/loader.json')} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 2
  },
});
export default Loading;
