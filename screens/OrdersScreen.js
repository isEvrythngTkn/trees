import _ from 'lodash';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ordersFetch } from '../redux/actions';
import OrderListItem from '../components/OrderListItem';
import { FlatListStyle } from '../components/styles';

class OrdersScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Your Orders'
    });
  }

  componentWillMount() {
    this.props.ordersFetch(this.props.userToken);
  }

  renderRow(order) {
    return <OrderListItem order={order.item} navigation={this.props.navigation} />
  }

  render() {
    let orders = _.values(this.props.orders);

    if (_.isEmpty(orders)) {
      return <Text>No Orders</Text>;
    } else {
      return (
        <FlatList
          data={orders}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={FlatListStyle.styles}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  const { userToken } = state.auth;
  const { orders } = state.orders;
  return { balance, userToken, orders };
};

export default connect(mapStateToProps, { ordersFetch })(OrdersScreen);