import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getNavigationOptions } from '../navigation/NavigationOptions';

class RedeemScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Redeem'
    });
  }


  render() {
    return (
        <View>
            <Text>
                Will need a ListView here.
            </Text>
        </View>
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
};

export default connect(mapStateToProps, {})(RedeemScreen);