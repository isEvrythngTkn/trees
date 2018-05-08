import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
import teddy from '../assets/animations/cries.json';
import { MontserratBlack } from '../components/StyledText';

const { Lottie } = DangerZone;

class Lose extends React.Component {
  state = {
    animation: teddy
  };

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <MontserratBlack>
            <Text style={styles.titleText}>OH NO! You Lost!</Text>
          </MontserratBlack>
        </View>
        <Lottie
          ref={animation => {
            this.animation = animation;
          }}
          resizeMode="contain"
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

export default Lose;