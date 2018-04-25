/// @source: https://reactnavigation.org/docs/auth-flow.html

import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            keyboardType='email-address'
          />

          <FormLabel>Password</FormLabel>
          <FormInput
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

export default SignInScreen;