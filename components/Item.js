import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  Image,
  LayoutAnimation,
  StyleSheet
} from 'react-native';
import { Card, Button, Separator } from 'react-native-elements';
import { connect } from 'react-redux';
import Confirm from './Confirm';
import { userRedeems, fetchBalance } from '../redux/actions';
import { MyAppText, MyAppTitleText } from './StyledText';
import { productShots } from '../assets/images';

class Item extends Component {
  state = { 
    showModal: false,
  };

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  onAccept() {
    this.props.userRedeems({ 
      userToken: this.props.userToken,
      uuid: this.props.ostUUID, 
      item: this.props.item
    });
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { id, title, description, image_key, price } = this.props.item;
    
    return (
      <Card 
        image={productShots[image_key]}
        imageProps={{
          resizeMode: 'cover'
        }}
        imageStyle={{
          height: 300,
          borderBottomWidth: .5,
          borderBottomColor: '#ccc',
          marginBottom: 10
        }}>

        <View style={styles.container}>
          <MyAppTitleText>
            <Text style={{ fontSize: 24 }}>
              {title}
            </Text>
          </MyAppTitleText>
          <View>
            <MyAppText>
              <Text style={styles.price}>{price} <Text style={{ fontSize: 13 }}>Trees</Text></Text>
            </MyAppText>
            <View style={styles.descriptionView}>
              <MyAppText>
                <Text style={styles.description}>{description}</Text>
              </MyAppText>
            </View>
          </View>
        </View>
        <Button 
          title="Order" 
          onPress={() => this.setState({ showModal: !this.state.showModal })}
          containerViewStyle={{ marginBottom: 15 }}
          backgroundColor='#496C89'
          icon={{name: 'add-circle', color: '#74d3b3' }}
          />

        <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
        >
          <Text style={{ marginBottom: 30, fontSize: 24 }}>
            <MyAppText>
              About to Redeem
            </MyAppText>
          </Text>
          <View>
            <Text style={styles.textStyle}>
              <MyAppText>
                Are you sure you want to redeem <Text style={styles.bold}>{price} TREES</Text> for: 
                <MyAppTitleText> {title}</MyAppTitleText>
              </MyAppText>
            </Text>
          </View>
        </Confirm>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bold: {
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 15,
    lineHeight: 28
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  descriptionView: {
    marginTop: 20
  },
  description: {
    fontSize: 16,
    lineHeight: 26
  }
});

const mapStateToProps = state => {
  const { ostUUID, userToken } = state.auth;
  return { ostUUID, userToken };
}

export default connect(mapStateToProps, { userRedeems, fetchBalance })(Item);



