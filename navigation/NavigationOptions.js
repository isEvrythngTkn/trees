import React from 'react';
import { View, StyleSheet } from 'react-native';
import NewHeader from '../components/NewHeader';
import HomeHeader from '../components/HomeHeader';
import store from '../redux/store';
import { PLAY_AGAIN } from '../redux/actions/types';

const _sharedNavigationOptions = (navigation, headerType, height, backgroundColor, tintColor, wordmark) => {
  const { params } = navigation.state;
  const balance = params ? params.balance : 'fetching';
  const title = params ? params.title : '';

  let headerTitle;

  headerTitle = ( <NewHeader 
                    balance={balance} 
                    title={title} 
                    navigation={navigation} 
                    tintColor={tintColor} 
                    wordmark={wordmark}/> );

  return {
    headerTitle: headerTitle,
    headerTintColor: tintColor,
    headerStyle: { 
      height: height,
      elevation: 0,       //remove shadow on Android
      shadowOpacity: 0,   //remove shadow on iOS,
      backgroundColor: backgroundColor
    },
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      store.dispatch({ type: PLAY_AGAIN });
      jumpToIndex(scene.index);
    }
  }
};

export const getNavigationOptions = ({ navigation }) => {
  return _sharedNavigationOptions(navigation, 'standard', 72, '#489174', 'white', false);
};

export const getHomeNavigationOptions = ({ navigation }) => {
  // return _sharedNavigationOptions(navigation, 'home', 0, '#cef5e3');
  return _sharedNavigationOptions(navigation, 'standard', 72, '#cef5e3', 'black', true);
};

