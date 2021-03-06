import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class QrCodeReader extends React.Component {
  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { containerStyle } = styles;
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <BarCodeScanner
          onBarCodeRead={this.props.handleBarCodeRead}
          style={styles.barCodeScannerStyle} />
      );
    }
  }
};

const styles = StyleSheet.create({
  barCodeScannerStyle: {
    flex: 1
  }
});