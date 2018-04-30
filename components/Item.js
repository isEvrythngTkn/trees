import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  Image,
  LayoutAnimation
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Confirm from './Confirm';
import { userRedeems, fetchBalance } from '../redux/actions';

class Item extends Component {
  state = { showModal: false };

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  onAccept() {
    // use an action creator to start the transfer
    this.props.userRedeems({ 
      userToken: this.props.userToken,
      uuid: this.props.ostUUID, 
      kind: this.props.item.transaction_kind
    });
    this.setState({ showModal: false });
    console.log('record this transaction in Firebase');
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { id, title, description, image_url, price } = this.props.item;

    return (
      <View>
        <Image 
          style={{ width: 100, height: 100 }}
          source={{ uri: image_url }}
        />
        <Text>{title}</Text>
        <Text style={{ flex: 1 }}>{description}</Text>
        <Text>{price} Trees</Text>
        <Button title="Redeem" onPress={() => this.setState({ showModal: !this.state.showModal })} />
        <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
        >
            Are you sure you want to redeem your TREES?
        </Confirm>
      </View>
    );
  }
}

const mapStateToProps = state => {
  //console.log('state: ', state);
  const { ostUUID, userToken } = state.auth;
  return { ostUUID, userToken };
}

export default connect(mapStateToProps, { userRedeems, fetchBalance })(Item);



