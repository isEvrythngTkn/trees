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

    const status = completed ? 
      `You picked up this order on ${moment(completed_at).format('ddd, MMM D, YYYY')}` : 'You have not yet picked up this order.';

    return (
      <Card title={`Ordered on ${moment(created).format('MMM D, YYYY')}`} titleStyle={styles.date}>
        <View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image 
              style={{ width: 75, height: 75, borderColor: '#ccc', borderWidth: .5 }}
              source={productShots[image_key]}
              resizeMode='contain'
            />
            <View style={{ marginLeft: 10}}>
              <MyAppTitleText>
                <Text style={styles.title}>
                  {title}
                </Text>
              </MyAppTitleText>
              <Text style={styles.price}>{price} TREES</Text>
            </View>
          </View>
          <View style={styles.statusWrap}>
            <Feather 
              name={ completed ? 'check-circle' : 'alert-circle'} 
              size={20} 
              color={ completed ? 'green' : '#daa50f' }
              style={{ marginRight: 10 }} />
            <MyAppText>{status}</MyAppText>
          </View>
          <View style={styles.buttonWrap}>
            <Button 
              title="View Details" 
              onPress={this.viewOrderDetails.bind(this)}
              containerViewStyle={styles.buttonContainer}
              backgroundColor='#444'
              icon={{name: 'add-circle', color: '#74d3b3' }}
              />
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  date: { 
    fontSize: 14, 
    textAlign: 'left' 
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
    fontSize: 18
  },
  price: {
    fontSize: 14
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
