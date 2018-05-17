import React from 'react';
import { Text } from 'react-native'

export class MyAppText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'OpenSans-Regular' }}>{this.props.children}</Text>;
  }
}

export class MyAppTitleText extends React.Component {
  render() {

    const theText = this.props.children ? applyLetterSpacing(this.props.children) : this.props.children;
    return (
      <Text style={{ fontFamily: 'Teko-Regular' }}>{theText}</Text>
    );
  }
}

export class MontserratBlack extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'OpenSans-ExtraBold' }}>{this.props.children}</Text>;
  }   
}

export class MontserratBold extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'OpenSans-ExtraBold' }}>{this.props.children}</Text>;
  }   
}

const applyLetterSpacing = (string, count = 1) => {
  if (typeof string === 'string') {
    return string.split('').join('\u200A'.repeat(count)).toUpperCase();
  }
  return string;
}