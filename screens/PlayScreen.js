import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import QrCodeReader from '../components/QrCodeReader';
import { userPlays, userWins, userLoses, playAgain } from '../redux/actions';
import { getNavigationOptions } from '../navigation/NavigationOptions';
import { ContainerStyle } from '../components/styles';

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

  render() {
    let content;

    if (this.props.playing) {
      content = this.renderPlaying();
    } else if (this.props.won) {
      content = this.renderWinner();
    } else if (this.props.lost) {
      content = this.renderLoser();
    } else {
      content = this.renderQrCodeReader(); 
    }

    return (
      <View style={ContainerStyle.styles}>
        {content}
      </View>
    );
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