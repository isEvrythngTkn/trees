import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Play',
  };

  render() {
    const { containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <Text>Needs a title/instrutions, a text input, and a button</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});
