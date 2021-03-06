import _ from 'lodash';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ordersFetch } from '../redux/actions';
import OrderListItem from '../components/OrderListItem';
import { MyAppText } from '../components/StyledText';
import { FlatListStyle } from '../components/styles';

class OrdersScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Past Orders'
    });
  }

  componentWillMount() {
    this.props.ordersFetch(this.props.userToken);
  }

  renderRow(order) {
    return <OrderListItem order={order.item} navigation={this.props.navigation} />
  }

  prepareOrders(orders) {
    let unsortedOrders = _.map(this.props.orders, (value, key) => {
      value._id = key;
      return value;
    });
    return _.reverse(_.sortBy(orders, (order) => { return order.created }));
  }

  render() {
    const orders = this.prepareOrders(this.props.orders);

    if (_.isEmpty(orders)) {
      return (
        <View style={{ alignItems: 'center', flex: 1, paddingTop: 30 }}>
          <Text style={{ fontSize: 24 }}>
            <MyAppText>No Orders</MyAppText>
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={orders}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 30, backgroundColor: 'white' }}
          ItemSeparatorComponent={() => (<View style={{ height: 30, backgroundColor: '#eee' }} />)}
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