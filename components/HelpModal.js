import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { MyAppTitleText } from './StyledText';

const HelpModal = ({ children, visible, title, close }) => {
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
      //closeOnTouchOutside={true}
    >
    <View style={styles.menu}>
      <TouchableOpacity onPress={close}>
        <Text style={styles.close}>
          <MyAppTitleText>
            Close x
          </MyAppTitleText>
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.titleWrap}>
      <Text style={styles.title}>
        <MyAppTitleText>
          {title}
        </MyAppTitleText>
      </Text>
    </View>
    <View style={styles.contentWrap}>
      <Text style={styles.content}>
        {children}
      </Text>
    </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 5,
    right: 10
  },
  close: {
    fontSize: 16
  },
  titleWrap: {
    marginTop: 5
  },
  title: {
    fontSize: 22
  },
  contentWrap: {
    marginTop: 8
  },
  content: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333'
  }
});

export default HelpModal;