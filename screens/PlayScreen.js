import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import QrCodeReader from '../components/QrCodeReader';
import Win from '../components/Win';
import Lose from '../components/Lose';
import Playing from '../components/Playing';
import { userPlays, userWins, userLoses, playAgain } from '../redux/actions';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ContainerStyle } from '../components/styles';
import { MyAppText, MontserratBlack } from '../components/StyledText';

class PlayScreen extends React.Component {
  static navigationOptions = getNavigationOptions;

  componentDidMount() {
    this.props.navigation.setParams({
     balance: this.props.balance,
     title: 'Play'
    });
  }

  handleBarCodeRead({ type, data }) {
    //console.log('just read a qr code', data);
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
    return (
      <View style={styles.playingContainer}>
        <Playing />
      </View>
    );
  }

  renderWinner() {
    return (
      <View style={styles.winnerContainer}>
        <View style={{ flex: 4 }}>
          <Win amount={this.props.amount} />
        </View>
        <View style={styles.centered}>
          {this.renderButtons()}
        </View>
      </View>
    );
  }

  renderLoser() {
    return (
      <View style={styles.winnerContainer}>
        <View style={{ flex: 4 }}>
          <Lose />
        </View>
        <View style={styles.centered}>
          {this.renderButtons()}
        </View>
      </View>
    );;
  }

  renderButton(title, onPress, backgroundColor) {
    return (
      <Button 
        title={title} 
        onPress={onPress} 
        backgroundColor={backgroundColor}
        color='#fff'
        borderRadius={5}
        containerViewStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    );
  }

  renderButtons() {
    return (
      <View style={styles.buttonsContainer}>
        {this.renderButton('Play Again!', this.onPlayAgainPress.bind(this), '#444')}
        {this.renderButton('Redeem!', this.onRedeemPress.bind(this), '#2A4F6E')}
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
    flex: 1
  },
  instructionsText: {
    fontSize: 18,
  },
  scanner: {
    flex: 4,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    margin: 0,
    backgroundColor: '#ff0000'
  },
  buttonsContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  winnerContainer: { 
    flex: 1,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  playingContainer: {
    flex: 1, 
    backgroundColor: '#042037', 
    padding: 20, 
    justifyContent: 'center'
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center' 
  }
});

const mapStateToProps = state => {
  const { amount, playing, won, lost } = state.play;
  const { ostUUID, userToken } = state.auth;
  const { balance } = state.ost;
  //console.log('ostUUID', ostUUID );
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