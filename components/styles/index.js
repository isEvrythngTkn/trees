import { StyleSheet } from 'react-native';

const commonContainerStyles = {
  padding: 10,
  paddingTop: 20,
  //backgroundColor: '#fff',
};

export const ContainerStyle = StyleSheet.create({
  styles: {
    ...commonContainerStyles,
    flex: 1
  }
});

export const FlatListStyle = StyleSheet.create({
  styles: {
    ...commonContainerStyles,
  }
});

