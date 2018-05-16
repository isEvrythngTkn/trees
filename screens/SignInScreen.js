/// @source: https://reactnavigation.org/docs/auth-flow.html

import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import { emailChanged, passwordChanged, loginUser } from '../redux/actions';
import { MyAppText } from '../components/StyledText';

class SignInScreen extends React.Component {
  state = {
    loading: false,
    signup: false
  }

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

  onSignInPress() {
    const { email, password } = this.props;
    this.setState({ loading: true });
    this.props.loginUser({ email, password });
  }

  showSignUp() {
    this.setState({ signup: true });
  }

  showLogin() {
    this.setState({ signup: false });
  }

  renderEmailInput() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder="jane@example.com"
          keyboardType='email-address'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
      </View>
    );
  }

  renderPasswordInput() {
    return (
      <View>
        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          secureTextEntry
        />
      </View>
    );
  }

  renderButton(title, onPress) {
    return (
      <Button 
        title={title} 
        backgroundColor="#74d3b3"
        borderRadius={5}
        loading={this.state.loading}
        onPress={onPress} />
    );
  }

  renderSignup() {
    return (
      <Card title="Sign up for Trees App" containerStyle={styles.card}>
        <View style={styles.form}>
          <FormLabel>Name</FormLabel>
          <FormInput
            placeholder="name"
          />
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
        </View>
        {this.renderButton('Sign up!', this.onSignInPress.bind(this))}
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ marginRight: 10, fontSize: 18 }}>
            <MyAppText>
              Already have an account?
            </MyAppText>
          </Text>
          <TouchableOpacity onPress={this.showLogin.bind(this)}>  
            <Text style={{ fontSize: 18, color: '#2A4F6E' }}>
              <MyAppText>
                Sign In
              </MyAppText>
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  renderSignin() {
    return (
      <Card title="Login to the Trees App" containerStyle={styles.card}>
        <View style={styles.form}>
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
        </View>
        {this.renderButton('Sign in!', this.onSignInPress.bind(this))}
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ marginRight: 10, fontSize: 18 }}>
            <MyAppText>
              Not yet a user?
            </MyAppText>
          </Text>
          <TouchableOpacity onPress={this.showSignUp.bind(this)}>  
            <Text style={{ fontSize: 18, color: '#2A4F6E' }}>
              <MyAppText>
                Sign Up
              </MyAppText>
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  render() {
    const content = this.state.signup ? this.renderSignup() : this.renderSignin();
    return (
      <ImageBackground 
          source={require('../assets/images/signin.jpg')}
          style={styles.container}
          resizeMode="cover"
          >
          {content}
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