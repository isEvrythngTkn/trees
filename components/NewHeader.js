import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MyAppTitleText, MyAppText } from './StyledText';
import { connect } from 'react-redux';

export class Hamburger extends React.Component {
  render() {
    return (
      <View style={styles.hamburger}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("DrawerOpen")}>
          <Ionicons
            name='md-menu'
            size={36}
            color={this.props.tintColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export class Title extends React.Component {
  render() {
    return (
      <View style={styles.titleTextContainerStyle}>
        <Text style={[styles.titleTextStyle, { color: this.props.tintColor}]}>
          <MyAppTitleText>
            {this.props.title}
          </MyAppTitleText>
        </Text>
      </View>
    );
  }
}

let Balance = ({ tintColor, balance }) => {
  const iconSource = tintColor === 'black' ? 
    require('../assets/images/tree-with-many-leaves_black.png') : require('../assets/images/icon-tree3.png');

  return (
    <View style={styles.balanceTextContainerStyle}>
      <MyAppText>
        <Text style={[styles.balanceTextStyle, { color: tintColor }]}>{balance}</Text>
      </MyAppText>
      <Image
        source={iconSource}
        style={styles.icon}
        resizeMode="contain"
      />
    </View>
  );
}

const mapStateToProps = state => {
  const { balance } = state.ost;
  return { balance };
}

export const HeaderBalance = connect(mapStateToProps, {})(Balance);

const styles = StyleSheet.create({
  hamburger: {
    paddingLeft: 15,
  },
  titleTextContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: 40,
    marginTop: 5, 
    color: 'white'
  },
  balanceTextContainerStyle: {
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  balanceTextStyle: {
    fontSize: 18,
    lineHeight: 30
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5
  }
});
