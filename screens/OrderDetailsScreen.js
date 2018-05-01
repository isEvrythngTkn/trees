import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';

class OrderDetailsScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Your Order'
    });
  }

  render() {
    const { title, description, image_url, price, transaction_uuid } = this.props.navigation.state.params;
    return (
        <View>
          <Text>Your order</Text>
          <Text>{title}</Text>
          <Text>{description}</Text>
          <Image 
            style={{ width: 100, height: 100 }}
            source={{ uri: image_url }}
          />
          <Text>{price}</Text>
          <Text>{transaction_uuid}</Text>
        </View>
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  const { currentOrder } = state.redeem;
  return { balance, currentOrder };
};

export default connect(mapStateToProps, {})(OrderDetailsScreen);