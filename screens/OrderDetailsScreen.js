import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem, List, Avatar } from 'react-native-elements';
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
      completed_at,
      successMessage
    } = this.props.navigation.state.params;

    const orderId = _id ? (
      this.renderDataPoint('Order ID', _id)
    ) : (
      <View />
    );

    const status = completed ? `Claimed on ${moment(completed_at).format('ddd, MMM D, YYYY')}` : 'Unclaimed';

    const items = [
      {
        title: orderTitle,
        avatar: productShots[image_key],
        subtitle: description
      }
    ];

    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <View style={styles.priceWrap}>
            <Text style={{ fontSize: 60, lineHeight: 72, color: '#333' }}>
              <MyAppTitleText>
                {price}
              </MyAppTitleText>
            </Text>
            <Image
              source={require('../assets/images/tree-with-many-leaves_black.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>
              <MyAppText>Order placed {moment(created).format('ddd, MMM D, YYYY')}</MyAppText>
            </Text>
          </View>
        </View>
        <View style={styles.itemsWrap}>
          <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: '#eee' }}>
            {
              items.map((l, i) => (
                <ListItem
                  avatar={
                    <Avatar
                      rounded
                      large
                      source={ l.avatar }
                    />
                  }
                  key={i}
                  hideChevron
                  title={l.title}
                  subtitle={l.subtitle}
                  containerStyle={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 5, 
                    paddingRight: 10
                  }}
                />
              ))
            }
          </List>
        </View>
        
        <View style={styles.dataPointsWrapper}>
          {this.renderDataPoint('Status', status)}
          {this.renderDataPoint('Transaction ID', transaction_uuid)}
          {orderId}
        </View>
        {this.renderSuccessMessage(successMessage)}
      </View>
    );
  }

  renderSuccessMessage(successMessage) {
    if (successMessage) {
      return (
        <View style={styles.successMessageWrap}>
          <Text style={styles.successMessageText}>
            <MyAppText>
              {successMessage}
            </MyAppText>   
          </Text>
        </View>
      );
    } else {
      return <View />
    }
  }

  renderDataPoint(label, value) {
    return (
      <View style={styles.dataPoint}>
        <View style={[styles.label]}>
          <Text style={styles.dataPointLabelText}>
            <MyAppText>
              {label}
            </MyAppText>
          </Text>
        </View>
        <View>
          <Text style={[styles.dataPointText]}>
            <MyAppText>
              {value}
            </MyAppText>
          </Text>
        </View>
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
  orderContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  orderHeader: {
    padding: 30,
    paddingTop: 50,
    paddingBottom: 70,
  },
  priceWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  date: {
    fontSize: 16,
  },
  dataPointsWrapper: { 
    marginTop: 0, 
    borderBottomWidth: .5,
    borderBottomColor: '#999'
  },
  dataPoint: {
    borderTopWidth: .5, 
    borderTopColor: '#999',
    paddingLeft: 15, 
    paddingRight: 10, 
    paddingTop: 10, 
    paddingBottom: 10,
  },
  label: { 
    paddingBottom: 10
  },
  dataPointLabelText: {
    fontSize: 14,
    color: '#888'
  },
  dataPointText: {
    fontSize: 20
  },
  icon: {
    width: 60,
    height: 60,
    marginLeft: 10
  },
  successMessageWrap: { 
    padding: 15, 
    paddingTop: 20,
    paddingBottom: 20, 
    position: 'absolute',
    bottom: 0,
    left: 0,
    //borderRadius: 8, 
    //borderWidth: 2, 
    backgroundColor: '#489174', 
    //margin: 20, 
    //marginBottom: 0 
  },
  successMessageText: { 
    textAlign: 'center', 
    fontSize: 20, 
    color: '#fff' 
  },
});

export default connect(mapStateToProps, {})(OrderDetailsScreen);