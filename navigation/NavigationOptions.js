import _ from 'lodash';
import React from 'react';
import { HeaderBackButton } from 'react-navigation';
import { Hamburger, HeaderBalance, Title } from '../components/NewHeader';
import store from '../redux/store';
import { PLAY_AGAIN } from '../redux/actions/types';

const _sharedNavigationOptions = (navigation, headerType, height, backgroundColor, tintColor) => {
  const { params } = navigation.state;
  const balance = params ? params.balance : '...';
  const title = params ? params.title : '';

  const headerLeft = _.indexOf(['OrderDetails', 'Orders'], navigation.state.routeName) < 0 ?
    <Hamburger navigation={navigation} tintColor={tintColor} /> : 
    <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={tintColor} />;

  return {
    headerTitle: (<Title tintColor={tintColor} title={title} />),
    headerRight: (<HeaderBalance tintColor={tintColor} balance={balance} />),
    headerLeft: headerLeft,
    headerTintColor: tintColor,
    headerStyle: { 
      height: height,
      elevation: 0,       //remove shadow on Android
      shadowOpacity: 0,   //remove shadow on iOS,
      backgroundColor: backgroundColor,
      borderBottomWidth: 0,
    },
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      store.dispatch({ type: PLAY_AGAIN });
      jumpToIndex(scene.index);
    }
  }
};

export const getNavigationOptions = ({ navigation }) => {
  return _sharedNavigationOptions(navigation, 'standard', 72, '#489174', 'white');
};

export const getHomeNavigationOptions = ({ navigation }) => {
  return _sharedNavigationOptions(navigation, 'standard', 72, '#cef5e3', 'black');
};

