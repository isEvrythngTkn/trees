import React from 'react';
import { View, Text, ListView,
    TouchableWithoutFeedback, 
    LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import Item from '../components/Item';

class RedeemScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentWillMount() {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(this.props.redeemables);
  }

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Redeem'
    });
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    // if (newProps.order && newProps.order.transaction_uuid) {
    //   this.props.navigation.navigate('OrderDetails', newProps.order);
    // }
  }

  renderRow(item) {
    return <Item item={item} />;
  }

  render() {
    return (
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  const { redeemables } = state;
  const { order } = state.redeem;
  return {
    balance,
    redeemables,
    order
  };
};

export default connect(mapStateToProps, {})(RedeemScreen);