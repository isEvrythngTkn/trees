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

  renderText(title, price, description) {
    return (
      <View>
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
    );
  }

  renderConfirm(title, price) {
    return (
      <Confirm
        visible={this.state.showModal}
        onAccept={this.onAccept.bind(this)}
        onDecline={this.onDecline.bind(this)}>
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
    );
  }

  render() {
    const { id, title, description, image_key, price } = this.props.item;
    
    return (
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Image
            source={productShots[image_key]}
            resizeMode='cover'
            style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          {this.renderText(title, price, description)}
          <Button 
            title="Order Now" 
            onPress={() => this.setState({ showModal: !this.state.showModal })}
            containerViewStyle={{ marginTop: 15, marginLeft: 0, marginRight: 0 }}
            buttonStyle={{ paddingTop: 20, paddingBottom: 20 }}
            textStyle={{ fontSize: 22 }}
            backgroundColor='#123552'
            borderRadius={5}
            icon={{name: 'add-circle', color: '#74d3b3' }}
            />
        </View>
        {this.renderConfirm(title, price)}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    //padding: 30, 
    backgroundColor: '#fff', 
    //marginBottom: 10, 
  },
  imageWrap: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 0,
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 10
  },
  contentContainer: {
    padding: 30,
    //paddingTop: 0,
    backgroundColor: '#eee',
    //marginBottom: 15,
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



