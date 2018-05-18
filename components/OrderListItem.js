import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  Image,
  LayoutAnimation,
  StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button, Card } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { productShots } from '../assets/images';
import { MyAppText, MyAppTitleText } from './StyledText';

class OrderListItem extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  viewOrderDetails() {
    const newProps = {
      ...this.props.order,
      orderTitle: this.props.order.title
    }
    this.props.navigation.navigate('OrderDetails', newProps);
  }

  renderStatus(completed, completed_at) {
    const status = completed ? 
      `You picked up this order on ${moment(completed_at).format('ddd, MMM D, YYYY')}` : 
      'You have not yet picked up this order.';

    return (
      <View style={styles.statusWrap}>
        <Feather 
          name={ completed ? 'check-circle' : 'alert-circle'} 
          size={20} 
          color={ completed ? 'green' : '#daa50f' }
          style={{ marginRight: 10 }} />
        <MyAppText>{status}</MyAppText>
      </View>
    );
  }

  renderDetailsButton() {
    return (
      <View style={styles.buttonWrap}>
        <Button 
          title="View Details" 
          onPress={this.viewOrderDetails.bind(this)}
          containerViewStyle={styles.buttonContainer}
          backgroundColor='#444'
          icon={{name: 'add-circle', color: '#74d3b3' }}
          />
      </View>
    );
  }

  renderImage(image_key) {
    return (
      <Image 
        style={{ width: 75, height: 75, borderColor: '#ccc', borderWidth: .5 }}
        source={productShots[image_key]}
        resizeMode='contain'
      />
    );
  }

  render() {
    const { 
      title,
      description, 
      image_key, 
      price, 
      completed, 
      date, 
      created, 
      transaction_uuid, 
      completed_at 
    } = this.props.order;

    const ordered = `Ordered on ${moment(created).format('MMM D, YYYY')}`;

    return (
      <View style={styles.orderWrap}>
        <View style={styles.dateWrap}>
          <Text style={styles.date}>
            <MyAppText>
              {ordered}
            </MyAppText>
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View>
            <MyAppTitleText>
              <Text style={styles.title}>
                {title}
              </Text>
            </MyAppTitleText>
            <Text style={styles.price}>{price} TREES</Text>
          </View>
        </View>
        {this.renderStatus(completed, completed_at)}
        {this.renderDetailsButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderWrap: {
    padding: 30,
  },
  dateWrap: {
    marginBottom: 15,
  },
  date: { 
    fontSize: 18, 
    fontFamily: 'OpenSans-Bold'
  },
  statusWrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: .5,
    borderTopColor: '#ccc',
    borderBottomWidth: .5,
    borderBottomColor: '#ccc',
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row'
  },
  title: {
    fontSize: 28,
  },
  price: {
    fontSize: 16
  },
  buttonWrap: { 
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 10 
  },
  buttonContainer: { 
    width: '100%', 
    marginLeft: 0 
  }
});

export default connect(null, {})(OrderListItem);
