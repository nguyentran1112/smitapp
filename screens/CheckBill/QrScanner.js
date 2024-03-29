//import liraries
import React, {Component, useState} from 'react';
import tw from 'twrnc';
import Clipboard from '@react-native-clipboard/clipboard';
import LottieView from 'lottie-react-native';
import {
  Image,
  ToastAndroid,
  View,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {colors, images} from '../../constrants';
import BackgroundQrcode from '../Loading/BackgroundQrcode';
// create a component
const QrScanner = ({navigation, route}) => {
  const {navigate, goBack} = navigation;
  const [dataScanner, setDataScanner] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [isTorch, setIsTorch] = useState(false);
  const [isBtn, setIsBtn] = useState(false);
  const [textBtn, setTextBtn] = useState('Sao chép');
  const [torch, setTorch] = useState('');
  
  const copyToClipboard = () => {
    Clipboard.setString(dataScanner);
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  const showToastCopied = () => {
    ToastAndroid.showWithGravity(
      `Đã copy mã thành công ${copiedText}`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  const showToastGoBack = () => {
    ToastAndroid.showWithGravity(
      `Bạn có thể tra cứu đơn hàng nhanh với mã ${copiedText}`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const onSuccess = e => {
    isValidURL(e.data)
      ? Linking.openURL(e.data).catch(err =>
          console.error('An error occured', err),
        )
      : setDataScanner(e.data);
  };
  function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (isTorch) {
              setTorch('');
              setIsTorch(false);
            } else {
              setTorch(RNCamera.Constants.FlashMode.torch);
              setIsTorch(true);
            }
          }}
          style={styles.btnTorch}>
          <Image style={styles.iconTorch} source={images.iconTorch} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goBack('CheckBill');
          }}
          style={styles.btnBack}>
          <Image style={styles.iconTorch} source={images.iconBack} />
        </TouchableOpacity>

        <QRCodeScanner
          style={{zIndex: 1}}
          onRead={onSuccess}
          flashMode={torch}
          topContent={
            <Text style={styles.centerText}>
              Di chuyển camera đến mã QR để quét
            </Text>
          }
          // bottomContent={

          // }
        />
        <TouchableOpacity
          onPress={() => {
            copyToClipboard();
            fetchCopiedText();
            route.params.getData(copiedText);
            if (isBtn) {
              showToastGoBack();
              setTextBtn('Sao chép');
              setIsBtn(false);
            } else {
              showToastCopied();
              setTextBtn('Tìm đơn hàng');
              setIsBtn(true);
            }
          }}
          style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>{textBtn}</Text>
        </TouchableOpacity>
        <BackgroundQrcode />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#555',
  },
  buttonText: {
    fontSize: 18,
    color: 'rgb(0,122,255)',
    fontWeight: 'bold',
  },
  buttonTouchable: {
    elevation: 8,
    backgroundColor: 'rgb(147, 197, 253)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 45,
    width: 255,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconTorch: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor: colors.secondary,
    
    
  },
  btnTorch: {
    position: 'absolute',
    zIndex: 1,
    right: '2%',
    top: '20%',
  },
  btnBack: {
    position: 'absolute',
    zIndex: 1,
    left: '2%',
    top: '20%',
  },
});

//make this component available to the app
export default QrScanner;
