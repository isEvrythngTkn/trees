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
  render() {
    return (
      <View style={styles.headerContainerStyle}>
        <ImageBackground 
          source={require('../assets/images/bg-vector-trees.jpg')}
          style={{ flex: 1, height: 500, paddingTop: 5, paddingRight: 5 }}>
          <View style={styles.balanceTextContainerStyle}>
            <MyAppText>
              <Text style={styles.homeBalanceTextStyle}>{this.props.balance}</Text>
            </MyAppText>
            <Image
              source={require('../assets/images/tree-with-many-leaves_black.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/trees_logo_w_words.png')}
              resizeMode="contain"
              style={styles.logoStyle} />
          </View>
          <View style={styles.textContainer}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#364035' }}>
                <MyAppTitleText>
                  Recently made a purchase?
                </MyAppTitleText>
              </Text>
              <Text style={{ fontSize: 36, color: '#364035' }}>  
                <MontserratBlack>
                  Scan and Play
                </MontserratBlack>
              </Text>
              <Button 
                title="Play Now!" 
                backgroundColor='#364035'
                color='#74d3b3'
                borderRadius={10}
                containerViewStyle={{
                  marginLeft: 0,
                  marginTop: 10
                }}
                icon={{name: 'check-circle', color: '#74d3b3' }}
                onPress={() => {this.props.navigation.navigate('Play')}} />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: { 
    flex: 1, 
    height: 380, 
    overflow: 'hidden' 
  },
  logoStyle: { 
    width: 170, 
    height: 117, 
    marginTop: -15 
  },
  textContainer: { 
    marginTop: 70, 
    flexDirection: 'row', 
    paddingLeft: 30, 
    paddingRight: 30 
  },
  balanceTextContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  homeBalanceTextStyle: {
    color: 'black',
    fontSize: 18,
    lineHeight: 30
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