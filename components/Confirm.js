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
          <Button title="No" onPress={onDecline} />
          <Button title="Yes" onPress={onAccept} />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  }
};

export default Confirm;