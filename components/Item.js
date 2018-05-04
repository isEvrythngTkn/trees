import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  Image,
  LayoutAnimation,
  StyleSheet
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Confirm from './Confirm';
import { userRedeems, fetchBalance } from '../redux/actions';
import { MyAppText } from './StyledText';

class Item extends Component {
  state = { showModal: false };

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
    const { id, title, description, image_url, price } = this.props.item;

    return (
      <Card title={title}>
        <View style={styles.container}>
          
          <Image 
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            source={{ uri: image_url }}
          />
          
          <View style={{ marginLeft: 10 }}>
            <MyAppText>
              <Text style={styles.price}>{price} <Text style={{ fontSize: 13 }}>Trees</Text></Text>
            </MyAppText>
            <MyAppText>
              <Text style={styles.description}>{description}</Text>
            </MyAppText>
          </View>
        </View>
        <Button 
          title="Order" 
          onPress={() => this.setState({ showModal: !this.state.showModal })}
          containerViewStyle={{ width: '100%', marginLeft: 0 }}
          backgroundColor='#2A4F6E'
          icon={{name: 'add-circle', color: '#74d3b3' }}
          />

        <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
        >
            Are you sure you want to redeem your TREES?
        </Confirm>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row', 
    marginBottom: 15 
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16
  }
});

const mapStateToProps = state => {
  const { ostUUID, userToken } = state.auth;
  return { ostUUID, userToken };
}

export default connect(mapStateToProps, { userRedeems, fetchBalance })(Item);



