import { StyleSheet } from 'react-native';

const containerPadding = {
  padding: 10,
  paddingTop: 20,
};

export const ContainerStyle = StyleSheet.create({
  styles: {
    ...containerPadding,
    flex: 1
  }
});

export const FlatListStyle = StyleSheet.create({
  styles: {
    ...containerPadding
  }
});

