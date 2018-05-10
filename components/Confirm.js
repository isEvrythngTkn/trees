import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
 
const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, buttonWrapperStyle } = styles;

  return (
    <Overlay
      visible={visible}
      transparent
      animationType="fadeInUp"
      onRequestClose={() => {}}
      containerStyle={{
        backgroundColor: 'rgba(0, 0, 0, .6)',
      }}
      childrenWrapperStyle={{
        borderRadius: 8
      }}
    >
      <View style={containerStyle}>
        <View>
          {children}
        </View>
        <View style={buttonWrapperStyle}>
          <Button 
            containerViewStyle={styles.buttonStyle} 
            title="Cancel" 
            onPress={onDecline} 
            backgroundColor='#444'
            icon={{ name: 'cancel', type: 'MaterialIcons' }}
          />
          <Button 
            containerViewStyle={styles.buttonStyle} 
            title="Accept" 
            onPress={onAccept} 
            backgroundColor='#5E9732'
            icon={{ name: 'check-circle', type: 'MaterialIcons' }}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(255, 255, 255, .95)',
    position: 'relative',
    width: 320,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttonWrapperStyle: {
    marginTop: 30,
    flexDirection: 'row'
  },
  buttonStyle: {
    marginRight: 0,
  }
};

export default Confirm;