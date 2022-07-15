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
import DropDownPicker from 'react-native-dropdown-picker';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
// create a component
const Turnover = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Snack', value: 2000},
    {label: 'Thực phẩm khô', value: 3000},
    {label: 'Nước đóng chai/lon', value: 4000},
    {label: 'Sữa và chế phẩm từ sữa', value: 5000},
    {label: 'Sản phẩm đóng gói khác', value: 6000},
  ]);
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
              cash: eachObject.cash,
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
              name: eachObject.name,
              sold: eachObject.sold,
              color: generateColor().toString(),
              cost: eachObject.cost,
              quantity: eachObject.quantity,
              price: eachObject.price,
              legendFontColor: 'white',
              legendFontSize: 10,
              groupId: eachObject.grId,
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
  const totalCash = listBill.reduce((total, bill) => total + bill.cash, 0);

  const labelPieChart = items
    .filter(item => item.value == value)
    .map(item => item.label);
  const totalBill = listBill.length;
  console.log(labelPieChart);
  const totalCost = products.reduce(
    (total, product) => total + product.cost * product.quantity,
    0,
  );
  const totalSale = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <>
      <View style={styles.header}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          zIndex={1000}
          style={{
            backgroundColor: colors.third,
          }}
          textStyle={{
            fontSize: 15,
          }}
          theme="LIGHT"
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              paddingEnd: 10,
              flex: 1,
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <View style={styles.card}>
              <View>
                <View style={tw`pt-4 items-center`}>
                  <View>
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
                <View style={styles.sparator}>
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
                <View style={styles.sparator}>
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
                <View style={styles.sparator}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Tiền nhận thực tế
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {totalCash > turnover ? turnover : totalCash} VNĐ
                  </Text>
                </View>
                <View style={styles.sparator}>
                  <Text style={{color: 'gray', fontSize: 15}}>Chênh lệch</Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {turnover - totalCash < 0 ? 0 : turnover - totalCash} VNĐ
                  </Text>
                </View>
                <View style={styles.sparator}>
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
                <View style={styles.sparator}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Tổng tiền hàng
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {totalCost} VNĐ
                  </Text>
                </View>
                <View style={styles.sparator}>
                  <Text style={{color: 'gray', fontSize: 15}}>
                    Doanh thu dự kiến
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.primary,
                      fontSize: 16,
                    }}>
                    {totalSale} VNĐ
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
            marginTop: 16,
            justifyContent: 'center',
            alignSelf: 'center',
            color: '#1f2687',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Tổng tiền hàng và doanh thu dự kiến
        </Text>
        <BarChart
          data={{
            labels: ['Tổng tiền hàng', 'Doanh thu dự kiến'],
            datasets: [
              {
                data: [totalCost, totalSale],
              },
            ],
          }}
          withVerticalLabels="true"
          width={Dimensions.get('window').width - 20}
          height={220}
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
            marginBottom: 16
          }}
        />

        {value != null ? (
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              color: '#1f2687',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Bán ra theo nhóm {labelPieChart.toString()}
          </Text>
        ) : null}
        {value != null ? (
          <PieChart
            data={products.filter(product => product.groupId == value)}
            width={Dimensions.get('window').width - 20}
            height={250}
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
              marginVertical: 8,
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
        ) : null}
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
  header: {
    zIndex: 1,
    height: 70,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
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
  },
  sparator: {
    marginTop: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    width: '100%',
    borderColor: 'gray',
  },
});

//make this component available to the app
export default Turnover;
