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
import { emailChanged, passwordChanged, loginUser } from '../redux/actions';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  componentWillReceiveProps() {
    const userToken = this._asyncGetUserFromStorage();
  }

  _asyncGetUserFromStorage = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      this.props.navigation.navigate('App');
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
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

          <Button title="Sign in!" onPress={this.onButtonPress.bind(this)} />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
    const { email, password, user } = state.auth;
    return {
        email,
        password,
        user
    };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(SignInScreen);