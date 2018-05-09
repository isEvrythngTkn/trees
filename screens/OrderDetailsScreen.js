import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { productShots } from '../assets/images';
import { MyAppText, MyAppTitleText } from '../components/StyledText';

class OrderDetailsScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Your Order'
    });
  }

  render() {
    const { 
      _id, 
      orderTitle, 
      created, 
      description, 
      image_key, 
      completed, 
      price, 
      transaction_uuid,
      completed_at
    } = this.props.navigation.state.params;

    const orderId = _id ? (
      <View>
        <Text style={styles.ids}>
          <MyAppText>Order id: {_id}</MyAppText>
        </Text>
        <View style={styles.spacer} />
      </View>
    ) : (
      <View />
    );

    const status = completed ? 
      `You picked up this order on ${moment(completed_at).format('ddd, MMM D, YYYY')}` : 'You have not yet picked up this order.';

    return (
      <View style={styles.container}>
        <Card title="Order Details">
          <View style={styles.dateWrapper}>
            <MyAppText style={styles.date}>Ordered on {moment(created).format('ddd, MMM D, YYYY')}</MyAppText>
          </View>
          <View style={styles.details}>
            <Image 
              style={{ width: 100, height: 100 }}
              resizeMode='cover'
              source={productShots[image_key]}
            />
            <View style={styles.productWrap}>
              <Text style={styles.orderTitle}>
                <MyAppTitleText>
                  {orderTitle}
                </MyAppTitleText>
              </Text>
              <Text style={styles.price}>
                <MyAppText>{price} TREES</MyAppText>
              </Text>
            </View>
          </View>
          <View style={styles.idsWrapper}>
            {orderId}
            <Text style={styles.ids}>
              <MyAppText>Transaction ID: {transaction_uuid}</MyAppText>
            </Text>
          </View>
          <View>
            <MyAppTitleText>{status}</MyAppTitleText>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  const { currentOrder } = state.redeem;
  return { balance, currentOrder };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  dateWrapper: {
    alignItems: 'center',
    borderBottomWidth: .5,
    borderBottomColor: '#ccc',
    paddingBottom: 15,
  },
  date: {
    fontSize: 12
  },
  details: {
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 20,
    borderBottomWidth: .5,
    borderBottomColor: '#ccc',
    flexDirection: 'row'
  },
  price: {
    fontSize: 14
  },
  orderTitle: {
    fontSize: 20
  },
  productWrap: {
    marginLeft: 15,
  },
  idsWrapper: {
    paddingBottom: 20, 
    marginBottom: 20,
    borderBottomWidth: .5,
    borderBottomColor: '#ccc'
  },
  ids: {
    fontSize: 14,
  },
  spacer: {
    height: 10
  }
});

export default connect(mapStateToProps, {})(OrderDetailsScreen);