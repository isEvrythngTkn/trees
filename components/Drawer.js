import React from 'react';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
import { DrawerItems } from 'react-navigation';
import LogoutButton from './LogoutButton';

export default class Drawer extends React.Component {
  render() {
    return (
      <View style={styles.drawer}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../assets/images/trees_logo_w_words_small_white.png')}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 3, justifyContent: 'space-between' }}>
          <DrawerItems {...this.props.parentProps} />
          <View style={styles.logoutWrap}>
            <LogoutButton color='#666' />
          </View>
        </View>
      </View>
    );     
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#333',
  },
  logoutWrap: {
    padding: 15,
    marginBottom: 20
  }
});