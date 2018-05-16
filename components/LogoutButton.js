import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions';

class LogoutButton extends React.Component {
  onSignoutButtonPress() {
    this.props.logoutUser();
  }

  render() {
    return (
      <Button 
        title="Logout" 
        onPress={this.onSignoutButtonPress.bind(this)}
        containerViewStyle={styles.containerViewStyle}
        backgroundColor={this.props.color}
        borderRadius={5}
        icon={{name: 'exit-to-app', color: '#fff' }}
        />
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: { 
    width: '100%', 
    marginLeft: 0 
  }
});

export default connect(null, { logoutUser })(LogoutButton);