import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { logoutUser } from '../redux/actions';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onSignoutButtonPress() {
    this.props.logoutUser();
    this.props.navigation.navigate('Auth');
  }

  render() {
    const { container, welcomeContainer, treesTitle, welcomeImage, contentContainer } = styles;
    return (
      <View style={container}>
        <ScrollView style={container} contentContainerStyle={contentContainer}>
          <View style={welcomeContainer}>
            <Text style={treesTitle}>TREES</Text>
            <Image
              source={require('../assets/images/logo-icon.png')}
              style={welcomeImage}
            />
            <Button title="Logout" onPress={this.onSignoutButtonPress.bind(this)} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  treesTitle: {
    fontSize: 28
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  }
});

const mapStateToProps = state => {
  console.log('state', state);
  const { user } = state.auth;
  return {
    user
  };
};

export default connect(mapStateToProps, { logoutUser })(HomeScreen);
