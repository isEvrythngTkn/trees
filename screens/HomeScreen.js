import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from 'react-native-elements';
import { MyAppText, MontserratBlack } from '../components/StyledText';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ContainerStyle } from '../components/styles';

const primaryActionTextColor = '#333';

class HomeScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Home'
    });
  }

  _goToPlay() {
    this.props.navigation.navigate('Play');
  }

  render() {
    return (
      <ScrollView style={styles.pageStyle}>
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
          <ImageBackground 
            source={require('../assets/images/bg-vector-trees.jpg')}
            borderRadius={10}
            style={styles.actionSection}>
            <Text style={styles.primaryActionText}>
              <MontserratBlack>
                Scan and Win!
              </MontserratBlack>
            </Text>
            <Button 
              title="Play Now!" 
              backgroundColor={primaryActionTextColor}
              color='#74d3b3'
              borderRadius={4}
              icon={{name: 'check-circle', color: '#74d3b3' }}
              buttonStyle={{
                paddingLeft: 40,
                paddingRight: 40
              }}
              onPress={this._goToPlay.bind(this)} />
          </ImageBackground>
        
          <ImageBackground 
          source={require('../assets/images/misty-trees.jpg')}
          borderRadius={10}
          style={styles.actionSection}>
            <MontserratBlack>
              <Text style={styles.skip}>
                Order Ahead
              </Text>
            </MontserratBlack>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.preorderText}>
                <MyAppText> 
                  Order from your phone, then pick up at your store. Pay with TREES.
                </MyAppText>
              </Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  actionSection: {
    height: 240,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  primaryActionText: {
    fontSize: 30,
    color: primaryActionTextColor,
  },
  preorderText: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    color: 'white'
  },
  skip: {
    fontSize: 24,
    color: 'black',
  },
  separator: {
    borderTopWidth: .5,
    borderTopColor: '#ccc',
    paddingTop: 30,
    paddingBottom: 30,
  }
});

const mapStateToProps = state => {
  const { user } = state.auth;
  const { balance } = state.ost;
  return {
    user,
    balance
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
