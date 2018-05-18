import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import Item from '../components/Item';
import { FlatListStyle } from '../components/styles';

class RedeemScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Redeem'
    });
  }

  renderRow(item) {
    return <Item item={item.item} />;
  }

  render() {
    return (
        <FlatList
          data={this.props.redeemables}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (<View style={{ height: 3, backgroundColor: '#bbb' }} />)}
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