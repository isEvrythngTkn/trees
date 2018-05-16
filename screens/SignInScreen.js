/// @source: https://reactnavigation.org/docs/auth-flow.html

import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import { emailChanged, passwordChanged, loginUser } from '../redux/actions';
import { MyAppText, MyAppTitleText } from '../components/StyledText';

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
        <FormInput
          placeholder="email"
          keyboardType='email-address'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          containerStyle={styles.input}
        />
      </View>
    );
  }

  renderPasswordInput() {
    return (
      <View>
        <FormInput
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          containerStyle={styles.input}
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
        containerViewStyle={{ width: 300 }}
        loading={this.state.loading}
        onPress={onPress} />
    );
  }

  renderSignup() {
    return (
      <View style={{ alignItems: 'center', width: 300 }}>
        <Text style={{ fontSize: 16 }}>
          <MyAppText>
            SIGN UP WITH YOUR EMAIL
          </MyAppText>
        </Text>
        <View style={[styles.form, { height: 180 }]}>
          <FormInput
            placeholder="name"
            containerStyle={styles.input}
          />
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
        </View>
        {this.renderButton('SIGN UP', this.onSignInPress.bind(this))}
        {this.renderOtherScreenLink('Already have an account?', 'Sign in', this.showLogin.bind(this))}
      </View>
    );
  }

  renderSignin() {
    return (
      <View style={{ alignItems: 'center', width: 300 }}>
        <Text style={{ fontSize: 16 }}>
          <MyAppText>
            SIGN IN
          </MyAppText>
        </Text>
        <View style={[styles.form, { height: 120 }]}>
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
        </View>
        {this.renderButton('SIGN IN', this.onSignInPress.bind(this))}
        {this.renderOtherScreenLink('Not yet a user?', 'Sign up', this.showSignUp.bind(this))}
      </View>
    );
  }

  renderOtherScreenLink(question, action, onPress) {
    return (
      <View style={styles.otherScreenOption}>
        <Text style={styles.otherScreenQuestion}>
          <MyAppText>
            {question}
          </MyAppText>
        </Text>
        <TouchableOpacity onPress={onPress}>  
          <Text style={styles.changeScreenText}>
            <MyAppText>
              {action}
            </MyAppText>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const content = this.state.signup ? this.renderSignup() : this.renderSignin();

    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/trees_logo_w_words_small.png')}
          style={styles.logo}
          resizeMode="contain" />
          <View style={styles.formWrapper}>
            {content}
          </View>
      </View>
    );
  }

  // render() {
  //   
  //   return (
  //     <ImageBackground 
  //         source={require('../assets/images/signin.jpg')}
  //         style={styles.container}
  //         resizeMode="cover"
  //         >
  //         {content}
  //     </ImageBackground>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingLeft: 50, 
    paddingRight: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 180,
  },
  formWrapper: {
    marginTop: 30
  },
  form: {
    width: 300,
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    marginLeft: 0, 
    marginRight: 0
  },
  otherScreenOption: { 
    marginTop: 45, 
    alignItems: 'center' 
  },
  otherScreenQuestion: { 
    marginRight: 10, 
    fontSize: 18, 
    fontStyle: 'italic' 
  },
  changeScreenText: { 
    fontSize: 18, 
    color: '#2A4F6E' 
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