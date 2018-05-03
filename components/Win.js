import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
import confetti from '../assets/animations/confetti.json';
import { MontserratBlack } from '../components/StyledText';

const { Lottie } = DangerZone;

class Win extends React.Component {
  state = {
    animation: confetti
  };

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <MontserratBlack>
            <Text style={styles.titleText}>Winner! {this.props.amount} TREES</Text>
          </MontserratBlack>
        </View>
        <Lottie
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 340,
            height: 340
          }}
          source={this.state.animation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-evenly'
  },
  titleContainer: {
    alignItems: 'center', 
    paddingTop: 30, 
    paddingBottom: 30
  },
  titleText: {
    fontSize: 34
  }
});

export default Win;