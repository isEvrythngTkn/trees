/// @source: https://reactnavigation.org/docs/auth-flow.html

import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserUUID } from '../api/firebase';
import { ostUUIDFetched, userTokenFetched } from '../redux/actions/AuthActions.js';
import { fetchBalance } from '../redux/actions/OstActions';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.userTokenFetched(userToken);

    // get the OST UUID for the current user, in case we lost our state
    if (userToken && !this.props.ostUUID) {
      await getUserUUID(userToken, async (ostUUID) => {
          this.props.ostUUIDFetched(ostUUID);
          await this.props.fetchBalance({ userToken, ostUUID });
          this.props.navigation.navigate('App');
      });
    } else {
      if (userToken) {
        this.updateBalance();
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');  
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = state => {
  const { ostUUID } = state.auth;
  const { balance } = state.ost;
  return {
    ostUUID,
    balance
  };
};

export default connect(mapStateToProps, { 
  ostUUIDFetched, 
  userTokenFetched,
  fetchBalance 
})(AuthLoadingScreen);

