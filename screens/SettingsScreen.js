import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions';
import { getNavigationOptions } from '../navigation/NavigationOptions';

class SettingsScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Settings'
    });
  }

  onSignoutButtonPress() {
    this.props.logoutUser();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.mainSection}>
          </View>
          <View style={styles.footerSection}>
            <Button 
              title="Logout" 
              onPress={this.onSignoutButtonPress.bind(this)}
              containerViewStyle={{ width: '100%', marginLeft: 0 }}
              backgroundColor='#333'
              large
              borderRadius={10}
              icon={{name: 'exit-to-app', color: '#fff' }}
              />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  mainSection: {
    flex: 5
  },
  footerSection: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
};

export default connect(mapStateToProps, { logoutUser })(SettingsScreen);