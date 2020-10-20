import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Colors} from '../Utils';

interface IStyles {
  container: ViewStyle;
  dropDownContainer: ViewStyle;
  noResultsText: TextStyle;
}

export const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
  },
  dropDownContainer: {
    height: 100,
    width: '100%',
  },
  noResultsText: {
    color: Colors.torchRed,
    fontSize: 15,
  },
});
