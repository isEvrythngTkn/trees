import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
 
const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, buttonWrapperStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Text style={textStyle}>{children}</Text>
        <View style={buttonWrapperStyle}>
          <Button 
            containerViewStyle={styles.buttonStyle} 
            title="No" 
            onPress={onDecline} 
            large
            backgroundColor='#444'
          />
          <Button 
            containerViewStyle={styles.buttonStyle} 
            title="Yes" 
            onPress={onAccept} 
            large
            backgroundColor='#5E9732'
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(255, 255, 255, .95)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 40
  },
  buttonWrapperStyle: {
    flexDirection: 'row'
  },
  buttonStyle: {
    flex: 1
  }
};

export default Confirm;