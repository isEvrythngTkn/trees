import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { MyAppTitleText, MyAppText } from './StyledText';
import { connect } from 'react-redux';

class NewHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContainerStyle}>
        <View style={styles.titleTextContainerStyle}>
          <MyAppTitleText>
            <Text style={styles.titleTextStyle}>
              {this.props.title}
            </Text>
          </MyAppTitleText>
        </View>
        <View style={styles.balanceTextContainerStyle}>
          <MyAppText>
            <Text style={styles.balanceTextStyle}>{this.props.balance}</Text>
          </MyAppText>
          <Image
            source={require('../assets/images/icon-tree3.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleTextContainerStyle: {
    flex: 3
  },
  titleTextStyle: {
    fontSize: 28,
    color: 'white'
  },
  balanceTextContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  balanceTextStyle: {
    fontSize: 16,
    lineHeight: 30,
    color: 'white'
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5
  }
});

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
}

export default connect(mapStateToProps, {})(NewHeader);