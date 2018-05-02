import React from 'react';
import { Text } from 'react-native'

export class MyAppText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'OpenSans-Regular' }}>{this.props.children}</Text>;
  }
}

export class MyAppTitleText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'Montserrat-Medium' }}>{this.props.children}</Text>;
  }
}