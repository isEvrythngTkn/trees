import React from 'react';
import { View, Text, Image, ListView } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ordersFetch } from '../redux/actions';

class OrdersScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentWillMount() {
    this.props.ordersFetch(this.props.userToken);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ orders }) {
    console.log(orders);
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(orders);
  }

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Previous Orders'
    });
  }

  renderRow(order) {
    return (
      <Text>{order.title}</Text>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  const { userToken } = state.auth;
  const { orders } = state.orders;
  return { balance, userToken, orders };
};

export default connect(mapStateToProps, { ordersFetch })(OrdersScreen);