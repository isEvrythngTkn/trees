import React from 'react';
import { View, Text } from 'react-native';
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

  renderRow(item) {
    return <Item item={item} />;
  }

  render() {
    return (
        <View>
          <Text>Your order</Text>
        </View>
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  return { balance };
};

export default connect(mapStateToProps, {})(OrderDetailsScreen);