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
import { MyAppText, MyAppTitleText } from '../components/StyledText';
import HomeHeader from '../components/HomeHeader';
import { getHomeNavigationOptions } from '../navigation/NavigationOptions';

const primaryActionTextColor = '#333';

class HomeScreen extends React.Component {
  static navigationOptions = getHomeNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Welcome!'
    });
  }

  _goToPlay() {
    this.props.navigation.navigate('Play');
  }

  renderOrderAhead() {
    return (
      <View>
        <Text style={{ fontSize: 20 }}>
          <MyAppTitleText>
            Order Ahead
          </MyAppTitleText>
        </Text>
        <View style={styles.actionSectionWrapper}>
          <ImageBackground 
          source={require('../assets/images/vectorbluemountains.jpg')}
          borderRadius={10}
          style={styles.actionSection}>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.preorderText}>
                <MyAppText> 
                  Order from your phone, then pick up at your store. Pay with TREES.
                </MyAppText>
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    )
  }

  renderMostRecentOrder() {
    return (
      <View />
    );
  }

  render() {
    return (
      <ScrollView style={styles.pageStyle}>
        <HomeHeader balance={this.props.balance} title='Welcome!' navigation={this.props.navigation} />
        <View style={{ padding: 30 }}>
          <View style={{ marginBottom: 25 }}>
            {this.renderOrderAhead()}
          </View>
          {this.renderMostRecentOrder()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  actionSectionWrapper: {
    height: 150,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 20
  },
  actionSection: {
    height: 200,
    padding: 20,
    alignItems: 'center',
  },
  preorderText: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    color: 'white',
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
