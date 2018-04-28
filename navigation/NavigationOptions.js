import React from 'react';
import NewHeader from '../components/NewHeader';

export const getNavigationOptions = ({ navigation }) => {
  const { params } = navigation.state;
  const balance = params ? params.balance : 'fetching';
  const title = params ? params.title : '';

  return {
    headerTitle: <NewHeader balance={balance} title={title} />
  }
};