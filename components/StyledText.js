import React from 'react';
import { Text } from 'react-native'

export class MyAppText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'OpenSans-Regular' }}>{this.props.children}</Text>;
  }
}

export class MyAppTitleText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.props.children}</Text>;
  }
}

export class MontserratBlack extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'Montserrat-Black' }}>{this.props.children}</Text>;
  }   
}

export class MontserratBold extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'Montserrat-Bold' }}>{this.props.children}</Text>;
  }   
}