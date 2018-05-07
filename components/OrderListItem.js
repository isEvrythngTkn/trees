import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  Image,
  LayoutAnimation
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { productShots } from '../assets/images';

class OrderListItem extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  viewOrderDetails() {
    console.log('view order details', this.props.order);
    const newProps = {
      ...this.props.order,
      orderTitle: this.props.order.title
    }
    this.props.navigation.navigate('OrderDetails', newProps);
  }

  renderCompleted(completed) {
    if (completed) {
      return <Text>Completed</Text>;
    } else {
      return <Text>Incomplete</Text>;
    }
  }

  render() {
    const { title, description, image_key, price, completed, date, created, transaction_uuid } = this.props.order;

    return (
      <Card title={`${title} - ${moment(created).format('MMM D, YYYY')}`}>
        <TouchableWithoutFeedback onPress={this.viewOrderDetails.bind(this)}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image 
              style={{ width: 100, height: 100 }}
              source={productShots[image_key]}
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
