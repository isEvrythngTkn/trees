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
    console.log(this.props.redeemables);
    this.dataSource = ds.cloneWithRows(this.props.redeemables);
  }

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Redeem'
    });
  }

  renderRow(item) {
    return <Item item={item} navigation={this.props.navigation} />;
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
  return {
    balance,
    redeemables
  };
};

export default connect(mapStateToProps, {})(RedeemScreen);