import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MyAppText from './MyAppText';
import { connect } from 'react-redux';

class NewHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContainerStyle}>
        <View style={styles.titleTextContainerStyle}>
          <MyAppText>
            <Text style={styles.titleTextStyle}>
              {this.props.title}
            </Text>
          </MyAppText>
        </View>
        <View style={styles.balanceTextContainerStyle}>
          <Text style={styles.balanceTextStyle}>{this.props.balance} T</Text>
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
    paddingLeft: 10,
    paddingRight: 10
  },
  titleTextContainerStyle: {
    flex: 3
  },
  titleTextStyle: {
    fontSize: 26
  },
  balanceTextContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  balanceTextStyle: {
    fontSize: 15
  }
});

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
}

export default connect(mapStateToProps, {})(NewHeader);