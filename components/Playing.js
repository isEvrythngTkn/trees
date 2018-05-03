import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
import playing from '../assets/animations/preloader.json';
import { MyAppTitleText } from '../components/StyledText';

const { Lottie } = DangerZone;

class Playing extends React.Component {
  state = {
    animation: playing
  };

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.titleContainer}>
          <MyAppTitleText>
            <Text style={styles.titleText}>Playing ...</Text>
          </MyAppTitleText>
        </View>
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
    fontSize: 22,
    color: '#fff'
  }
});

export default Playing;