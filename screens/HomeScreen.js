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
     title: 'TREES'
    });
  }

  _goToPlay() {
    this.props.navigation.navigate('Play');
  }

  renderOrderAhead() {
    return (
      <View style={styles.orderAhead}>
        <Text style={{ fontSize: 20 }}>
          <MyAppTitleText>
            Coming Soon: Order Ahead
          </MyAppTitleText>
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 26 }}>
          Skip the line! Order from your phone, pay with TREES, then pick up at your store.
        </Text>
      </View>
    )
  }

  renderMostRecentOrder() {
    return (
      <View />
    );
  }

  renderPromotion() {
    return (
      <View style={styles.promo}>
        <Text style={{ fontSize: 20, color: 'white' }}>
          <MyAppTitleText>
            Earn Bonus TREES!
          </MyAppTitleText>
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 26, color: 'white' }}>Spend $100 or more at Trees before 3PM today and get an extra 25 TREES!</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.pageStyle}>
        <HomeHeader balance={this.props.balance} title='Welcome!' navigation={this.props.navigation} />
        {this.renderOrderAhead()}
        {this.renderPromotion()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
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
  orderAhead: {  
    flex: 2, 
    padding: 30, 
    paddingTop: 20, 
    paddingBottom: 20, 
    justifyContent: 'center' 
  },
  promo: { 
    flex: 2,
    padding: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#ccc', 
    borderBottomWidth: .5, 
    backgroundColor: '#444',
    justifyContent: 'center',
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
