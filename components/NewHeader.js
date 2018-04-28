import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

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

export default NewHeader;