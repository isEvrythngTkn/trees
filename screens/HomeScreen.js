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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

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
            <Button title="Logout" onPress={this._signOutAsync} />
          </View>
        </ScrollView>
      </View>
    );
  }

  // @TODO: This will need to be moved out of here, 
  // but for now it's useful for development purposes 
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
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
