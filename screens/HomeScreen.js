import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from 'react-native-elements';
import { 
  MyAppTitleText, 
  MyAppText,
  MontserratBlack,
} from '../components/StyledText';
import { logoutUser } from '../redux/actions';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ContainerStyle } from '../components/styles';


class HomeScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Home'
    });
  }

  onSignoutButtonPress() {
    this.props.logoutUser();
    this.props.navigation.navigate('Auth');
  }

  _goToPlay() {
    this.props.navigation.navigate('Play');
  }

  render() {
    return (
      <View style={styles.pageStyle}>
        <ImageBackground 
          source={require('../assets/images/bg-vector-trees.jpg')}
          style={styles.primaryActionSection}>
          <Text style={styles.primaryActionText}>
            <MontserratBlack>
              Scan and Win!
            </MontserratBlack>
          </Text>
          <Button 
            title="Play Now!" 
            backgroundColor='#555'
            color='#74d3b3'
            borderRadius={4}
            icon={{name: 'check-circle', color: '#74d3b3' }}
            buttonStyle={{
              paddingLeft: 40,
              paddingRight: 40
            }}
            onPress={this._goToPlay.bind(this)} />
        </ImageBackground>
      </View>
    );
  }
}

        /*
        <TouchableHighlight onPress={this._goToPlay.bind(this)}>
            <Ionicons name="md-qr-scanner" size={60} color="#555" />
          </TouchableHighlight>
        <View style={ContainerStyle.styles}>
          <View style={welcomeContainer}>
            <Text style={treesTitle}>TREES</Text>
            <Text>Your Balance: {this.props.balance} Trees</Text>
            <Button title="Logout" onPress={this.onSignoutButtonPress.bind(this)} />
          </View>
        </View>*/
const styles = StyleSheet.create({
  pageStyle: {
    flex: 1
  },
  primaryActionSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    paddingTop: 40,
    paddingBottom: 80
  },
  primaryActionText: {
    fontSize: 42,
    color: '#555',
    marginBottom: 25
  },
  // overlay: {
  //   flex: 1,
  //   backgroundColor: 'black',
  //   opacity: 0.9,
  //   position: 'absolute',
  //   left: 0,
  //   top: 0
  // }
});

const mapStateToProps = state => {
  console.log('state', state);
  const { user } = state.auth;
  const { balance } = state.ost;
  return {
    user,
    balance
  };
};

export default connect(mapStateToProps, { logoutUser })(HomeScreen);
