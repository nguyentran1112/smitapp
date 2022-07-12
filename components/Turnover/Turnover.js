//import liraries
import React, {Component, useState, useEffect} from 'react';
import tw from 'twrnc';
import {images, colors} from '../../constrants';
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
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
// create a component
const Turnover = () => {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'bills'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = await snapshot.val();
        setlistBill(
          Object.keys(snapshotObject).map(eachKey => {
            let eachObject = snapshotObject[eachKey];
            return {
              creator: eachObject.creator,
              id: eachObject.id,
              dateOfBill: eachObject.dateOfBill,
              totalPrice: eachObject.totalPrice,
              totalQuantity: eachObject.totalQuantity,
              totalCost: eachObject.totalCost,
            };
          }),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    onValue(firebaseRef(firebaseDatabase, 'products'), async snapshot => {
      if (snapshot.exists()) {
        let snapshotObject = await snapshot.val();
        setProducts(
          Object.keys(snapshotObject).map(eachKey => {
            let eachObject = snapshotObject[eachKey];
            return {
              name: ` ${eachObject.name}`,
              sold: eachObject.sold,
              color: generateColor().toString(),
              legendFontColor: 'white',
              legendFontSize: 11,
            };
          }),
        );
      } else {
        console.log('No data');
      }
    });
  }, []);
  const [listBill, setlistBill] = useState([]);
  const turnover = listBill.reduce((total, bill) => total + bill.totalPrice, 0);
  const totalProducts = listBill.reduce(
    (total, product) => total + product.totalQuantity,
    0,
  );
  const grossProfit =
    turnover - listBill.reduce((total, bill) => total + bill.totalCost, 0);
  const totalBill = listBill.length;
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              paddingEnd: 10,
              flex: 1,
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                width: '100%',
                backgroundColor: colors.secondary,
                paddingHorizontal: 15,
                paddingBottom: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                borderRadius: 20,
              }}>
              <View>
                <View style={tw`pt-4 items-center`}>
                  <View style={{}}>
                    <Text
                      style={{color: 'gray', fontWeight: 'bold', fontSize: 16}}>
                      TỔNG DOANH THU
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center', marginTop: 8}}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: 'bold',
                      fontSize: 22,
                    }}>
                    {turnover} VNĐ
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 8,
                    paddingTop: 4,
                    borderTopWidth: 1,
                    width: '100%',
                    borderColor: 'gray',
                  }}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Đơn hàng đã bán
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {totalBill} đơn
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 8,
                    paddingTop: 4,
                    borderTopWidth: 1,
                    width: '100%',
                    borderColor: 'gray',
                  }}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Số hàng đã bán
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {totalProducts} sản phẩm
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 8,
                    paddingTop: 4,
                    borderTopWidth: 1,
                    width: '100%',
                    borderColor: 'gray',
                  }}>
                  <Text style={{color: 'gray', fontSize: 15}}>Lãi gộp</Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {grossProfit} VNĐ
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            color: '#1f2687',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Doanh thu và lãi gộp
        </Text>
        <BarChart
          data={{
            labels: ['Doanh thu', 'Lãi gộp'],
            datasets: [
              {
                data: [turnover, grossProfit],
              },
            ],
          }}
          withVerticalLabels="true"
          width={Dimensions.get('window').width - 20}
          height={260}
          fromZero={true}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#373ea3',
            backgroundGradientFrom: '#0f145c',
            backgroundGradientTo: '#1f2687',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            fillShadowGradientOpacity: 1,
            fillShadowGradient: '#ffffff',
          }}
          style={{
            margin: 8,
            borderRadius: 20,
            alignSelf: 'center',
          }}
        />

        <Text
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            color: '#1f2687',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 16
          }}>
          Cơ cấu sản phẩm bán ra
        </Text>
        <PieChart
          data={products}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#373ea3',
            backgroundGradientFrom: '#0f145c',
            backgroundGradientTo: '#1f2687',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 20,
            },
          }}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            margin: 8,
            borderRadius: 20,
            backgroundColor: '#1f2687',
            backgroundGradientFrom: '#0f145c',
            backgroundGradientTo: '#1f2687',
          }}
          accessor="sold"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute //for the absolute number remove if you want percentage
        />
      </ScrollView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Turnover;
