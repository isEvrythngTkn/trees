import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import QrCodeReader from '../components/QrCodeReader';
import { userPlays, userWins, userLoses, playAgain } from '../redux/actions';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ContainerStyle } from '../components/styles';
import { MyAppText } from '../components/StyledText';

class PlayScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Play'
    });
  }

  handleBarCodeRead({ type, data }) {
    this.props.userPlays({ 
      userToken: this.props.userToken,
      uuid: this.props.ostUUID, 
      kind: data, 
    });
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
      <View style={{ flex: 1 }}>
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
        {this.renderButtons()}
      </View>
    );
  }

  renderLoser() {
    return (
      <View>
        <Text>You Lost!</Text>
        {this.renderButtons()}
      </View>
    );;
  }

  renderButtons() {
    return (
      <View>
        <Button title="Play Again!" onPress={this.onPlayAgainPress.bind(this)} />
        <Button title="Redeem" onPress={this.onRedeemPress.bind(this)} />
      </View>
    );
  }

  renderPlay() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.scanner}>
          {this.renderQrCodeReader()}
        </View>
        <View style={styles.instructionsContainer}>
          <MyAppText>
            <Text style={styles.instructionsText}>
              Scan a QR code to play
            </Text>
          </MyAppText>
        </View>
      </View>
    );
  }

  render() {
    let content;

    if (this.props.playing) {
      content = this.renderPlaying();
    } else if (this.props.won) {
      content = this.renderWinner();
    } else if (this.props.lost) {
      content = this.renderLoser();
    } else {
      content = this.renderPlay(); 
    }

    return (
      <View style={{ flex: 1 }}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
    alignSelf: 'stretch',
    zIndex: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    flex: 1
  },
  instructionsText: {
    fontSize: 18,
  },
  scanner: {
    flex: 4,
    alignSelf: 'stretch',
  }
});

const mapStateToProps = state => {
  const { amount, playing, won, lost } = state.play;
  const { ostUUID, userToken } = state.auth;
  const { balance } = state.ost;
  console.log('ostUUID', ostUUID );
  return {
    amount,
    playing,
    won,
    lost,
    ostUUID,
    userToken,
    balance,
  };
}

export default connect(mapStateToProps, {
  userLoses,
  userWins,
  userPlays,
  playAgain
})(PlayScreen);