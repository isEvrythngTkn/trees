import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux';

class NewHeader extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Text>{this.props.balance} Trees</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
}

export default connect(mapStateToProps, {})(NewHeader);