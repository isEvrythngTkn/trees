import React from 'react';
import { StyleSheet } from 'react-native';
import NewHeader from '../components/NewHeader';

export const getNavigationOptions = ({ navigation }) => {
  const { params } = navigation.state;
  const balance = params ? params.balance : 'fetching';
  const title = params ? params.title : '';

  return {
    headerTitle: <NewHeader balance={balance} title={title} />,
    headerStyle: { 
      height: 72,
      elevation: 0,       //remove shadow on Android
      shadowOpacity: 0,   //remove shadow on iOS,
      //borderBottomWidth: StyleSheet.hairlineWidth,
      //borderBottomColor: '#ccc',
      backgroundColor: '#489174'
    }
  }
};