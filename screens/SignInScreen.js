/// @source: https://reactnavigation.org/docs/auth-flow.html

import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import { emailChanged, passwordChanged, loginUser } from '../redux/actions';

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
      <ImageBackground 
          source={require('../assets/images/signin.jpg')}
          style={styles.container}
          resizeMode="cover"
          >
        
          <Card title="Login to the Trees App" containerStyle={styles.card}>
            <View style={styles.form}>
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
            </View>
            <Button 
              title="Sign in!" 
              backgroundColor="#74d3b3"
              borderRadius={5}
              onPress={this.onButtonPress.bind(this)} />
          </Card>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  form: {
    paddingBottom: 15
  },
  card: {
    paddingBottom: 25
  }
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