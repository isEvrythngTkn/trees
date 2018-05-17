import { Notifications } from 'expo';
import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { StackNavigator, SwitchNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import NavigationService from './NavigationService';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import Drawer from '../components/Drawer';

const AppStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    OrderDetails: {
      screen: OrderDetailsScreen,
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      drawerLabel: () => null
    }),
  }
);

const AppDrawerNavigator = DrawerNavigator({
  Main: {
    screen: AppStackNavigator,
  },
  Orders: {
    screen: OrdersScreen,
    navigationOptions: {
      drawerLabel: "Order History",
      drawerIcon: ({ tintColor }) => <Icon name="th-list" color={tintColor} size={24} />
    },
  },
}, {
  contentComponent:(props) => (
    <Drawer parentProps={props} />
  ),
  contentOptions: {
    inactiveTintColor: 'white',
    itemStyle: {
      borderBottomWidth: .5,
      borderBottomColor: '#555',
    },
    labelStyle: {
      fontSize: 20,
      fontWeight: 'normal'
    }
  }
});

const AuthStackNavigator = StackNavigator({ SignIn: SignInScreen });

const RootStackNavigator = SwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppDrawerNavigator,
  Auth: AuthStackNavigator
}, {
  initialRouteName: 'AuthLoading',
});

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <RootStackNavigator 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
