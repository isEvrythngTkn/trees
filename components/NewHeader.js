import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { MyAppTitleText, MyAppText, MontserratBlack } from './StyledText';
import { connect } from 'react-redux';
import { playAgain } from '../redux/actions/PlayActions';

class NewHeader extends React.Component {
  onSettingsPress() {
    this.props.navigation.navigate('Settings');
    this.props.playAgain();
  }

  renderHamburger() {
    if (_.indexOf(['OrderDetails', 'Orders'], this.props.navigation.state.routeName) < 0) {
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

  renderBalance() {
    const iconSource = this.props.tintColor === 'black' ? 
      require('../assets/images/tree-with-many-leaves_black.png') : require('../assets/images/icon-tree3.png');

    return (
      <View style={styles.balanceTextContainerStyle}>
        <MyAppText>
          <Text style={[styles.balanceTextStyle, { color: this.props.tintColor }]}>{this.props.balance}</Text>
        </MyAppText>
        <Image
          source={iconSource}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    );
  }

  renderWordMark() {
    return (
      <Image
        source={require('../assets/images/trees_wordmark.png')}
        style={styles.wordmark}
        resizeMode="contain" />
    );
  }

  renderStandardTitle() {
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

  render() {
    //const title = this.props.wordmark ? this.renderWordMark() : this.renderStandardTitle();
    return (
      <View style={styles.headerContainerStyle}>
        {this.renderHamburger()}
        {this.renderStandardTitle()}
        {this.renderBalance()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  hamburger: {
    flex: 1
  },
  titleTextContainerStyle: {
    flex: 3,
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: 40,
    lineHeight: 62,
    marginTop: 8, 
    color: 'white',
    letterSpacing: 15
  },
  balanceTextContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  balanceTextStyle: {
    fontSize: 18,
    lineHeight: 30
  },
  wordmark: {
    width: 85,
    height: 28,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5
  },
  settings: {
    marginRight: 25
  }
});

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
}

export default connect(mapStateToProps, { playAgain })(NewHeader);