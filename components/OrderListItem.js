import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  Image,
  LayoutAnimation
} from 'react-native';
import { Button, Card } from 'react-native-elements';
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
    const { title, description, image_url, price, completed, date, response_date } = this.props.order;

    return (
      <Card title={`${title} - ${response_date.substring(0, 16)}`}>
        <TouchableWithoutFeedback onPress={this.viewOrderDetails.bind(this)}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image 
              style={{ width: 100, height: 100 }}
              source={{ uri: image_url }}
              resizeMode='contain'
            />
            <View style={{ marginLeft: 10}}>
              <Text>{price} Trees</Text>
              <Text style={{ flex: 1 }}>{description}</Text>
              {this.renderCompleted(completed)}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}

export default connect(null, {})(OrderListItem);
