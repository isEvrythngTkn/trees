import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import QrCodeReader from '../components/QrCodeReader';
import { userPlays, userWins, userLoses, playAgain } from '../redux/actions';
import { getNavigationOptions } from '../navigation/NavigationOptions';

class PlayScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Play'
    });
  }

  handleBarCodeRead({ type, data }) {
    this.props.userPlays({ uuid: this.props.ostUUID, kind: data });
  }

  onPlayAgainPress() {
    this.props.playAgain();
  }

  onRedeemPress() {
    this.props.playAgain();
    this.props.navigation.navigate('Redeem');
  }

  renderQrCodeReader() {
    return (
      <View style={styles.containerStyle}>
        <Text>Scan a QR Code</Text>
        <QrCodeReader handleBarCodeRead={this.handleBarCodeRead.bind(this)} />
      </View>
    );
  }

  renderPlaying() {
    return <View><Text>Playing...</Text></View>;
  }

  renderWinner() {
    return (
      <View>
        <Text>Winner! You won {this.props.amount} Trees.</Text>
        <Button title="Play Again!" onPress={this.onPlayAgainPress.bind(this)} />
        <Button title="Redeem" onPress={this.onRedeemPress.bind(this)} />
      </View>
    );
  }

  renderLoser() {
    return <View><Text>You Lost!</Text></View>;
  }

  render() {
    if (this.props.playing) {
      return this.renderPlaying();
    } else if (this.props.amount !== null && this.props.amount > 0) {
      return this.renderWinner();
    } else if (this.props.amount === 0) {
      return this.renderLoser();
    } else {
      return this.renderQrCodeReader(); 
    }
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => {
  const { amount, playing } = state.play;
  const { ostUUID } = state.auth;
  const { balance } = state.ost;
  console.log('ostUUID', ostUUID );
  return {
    amount,
    playing,
    ostUUID,
    balance
  };
}

export default connect(mapStateToProps, {
  userLoses,
  userWins,
  userPlays,
  playAgain
})(PlayScreen);