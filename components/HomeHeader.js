import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import { MyAppTitleText, MyAppText, MontserratBlack } from './StyledText';
import { connect } from 'react-redux';
import { playAgain } from '../redux/actions/PlayActions';

class NewHeader extends React.Component {
  renderAction() {
    return (
      <View style={styles.textContainer}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#364035' }}>
            <MyAppTitleText>
              Recently made a purchase?
            </MyAppTitleText>
          </Text>
          <Text style={{ fontSize: 42, color: '#364035' }}>  
            <MontserratBlack>
              Scan and Play
            </MontserratBlack>
          </Text>
          <Button 
            title="Play Now!" 
            backgroundColor='#364035'
            color='#74d3b3'
            borderRadius={5}
            containerViewStyle={{
              marginLeft: 0,
              marginTop: 10
            }}
            icon={{name: 'check-circle', color: '#74d3b3' }}
            onPress={() => {this.props.navigation.navigate('Play')}} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.headerContainerStyle}>
        <ImageBackground 
          source={require('../assets/images/bg-vector-trees.jpg')}
          style={{ flex: 1, height: 500, paddingTop: 5, paddingRight: 5, alignItems: 'center', justifyContent: 'center' }}>

          {this.renderAction()}
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    flex: 5,
    borderRadius: 0,
    overflow: 'hidden',
  },
  textContainer: { 
    flexDirection: 'row', 
    paddingLeft: 30, 
    paddingRight: 30 
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5
  },
});

const mapStateToProps = state => {
  const { balance } = state.ost;
  return {
    balance
  };
}

export default connect(mapStateToProps, { playAgain })(NewHeader);