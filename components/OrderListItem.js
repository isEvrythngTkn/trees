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

class OrderListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  viewOrderDetails() {
    console.log('view order details', this.props.order);
    this.props.navigation.navigate('OrderDetails', this.props.order);
  }

  renderCompleted(completed) {
    if (completed) {
      return <Text>Completed</Text>;
    } else {
      return <Text>Incomplete</Text>;
    }
  }

  render() {
    const { title, description, image_url, price, completed } = this.props.order;

    return (
      <TouchableWithoutFeedback onPress={this.viewOrderDetails.bind(this)}>
        <View>
          <Image 
            style={{ width: 100, height: 100 }}
            source={{ uri: image_url }}
          />
          <Text>{title}</Text>
          <Text style={{ flex: 1 }}>{description}</Text>
          <Text>{price} Trees</Text>
          {this.renderCompleted(completed)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(null, {})(OrderListItem);
