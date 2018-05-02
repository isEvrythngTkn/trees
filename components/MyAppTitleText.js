import React from 'react';
import {
  Text
} from 'react-native'

class MyAppTitleText extends React.Component {
  render() {
    return <Text style={{ fontFamily: 'Montserrat-Light' }}>{this.props.children}</Text>;
  }
}

export default MyAppTitleText;