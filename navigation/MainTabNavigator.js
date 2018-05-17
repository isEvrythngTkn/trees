import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import RedeemScreen from '../screens/RedeemScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { MyAppTitleText } from '../components/StyledText';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Play: {
      screen: PlayScreen,
    },
    Redeem: {
      screen: RedeemScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'Play':
            iconName = Platform.OS === 'ios' ? `ios-checkmark-circle${focused ? '' : '-outline'}` : 'md-checkmark-circle';
            break;
          // case 'Orders':
          //   iconName = Platform.OS === 'ios' ? `ios-list-box${focused ? '' : '-outline'}` : 'md-list-box';
          //   break;
          case 'Redeem':
            iconName =
              Platform.OS === 'ios' ? `ios-card${focused ? '' : '-outline'}` : 'md-card';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      tabBarLabel: ({ focused }) => {
        const { routeName } = navigation.state;
        let color = focused ? Colors.tabIconSelected : Colors.tabIconDefault;

        return (
          <View>
            <Text style={{ color, textAlign: 'center' }}>
              <MyAppTitleText>
                {routeName}
              </MyAppTitleText>
            </Text>
          </View>
        )
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: false,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        height: 70,
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: 13
      }
    },
  }
);
