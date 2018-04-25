/// @source: https://reactnavigation.org/docs/auth-flow.html

import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import { emailChanged, passwordChanged } from '../redux/actions';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder="jane@example.com"
            keyboardType='email-address'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            secureTextEntry
          />

          <Button title="Sign in!" onPress={this._signInAsync} />
        </Card>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
    const { email, password } = state.auth;
    return {
        email,
        password
    };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged
})(SignInScreen);