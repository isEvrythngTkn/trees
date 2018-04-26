import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import QrCodeReader from '../components/QrCodeReader';
import { userPlays, userWins, userLoses, playAgain } from '../redux/actions';

class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Play',
  };

  handleBarCodeRead({ type, data }) {
    // trigger the userPlays action
    this.props.userPlays(data);
    
    // @TODO: Need a method for 'rolling the dice'.
    // And a way to invalidate codes that have been used already.

    // wait 3 seconds and trigger the userWins action
    setTimeout(() => {this.props.userWins(data)}, 3000);
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
  return {
    amount,
    playing
  };
}

export default connect(mapStateToProps, {
  userLoses,
  userWins,
  userPlays,
  playAgain
})(PlayScreen);