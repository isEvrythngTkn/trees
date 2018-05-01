import React from 'react';
import {
  Text
} from 'react-native'

class MyAppText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'Roboto' }}>{this.props.children}</Text>;
  }
}

export default MyAppText;