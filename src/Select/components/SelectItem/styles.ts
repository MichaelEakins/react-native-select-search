import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '../../../Utils';

interface IStyles {
  container: ViewStyle;
  text: TextStyle;
}

export const styles = (containerBackgroundColor?: string) =>
  StyleSheet.create<IStyles>({
    container: {
      backgroundColor: containerBackgroundColor
        ? containerBackgroundColor
        : Colors.alabaster,
      flex: 1,
      flexDirection: 'row',
      width: '100%',
    },
    text: {
      fontSize: 17,
    },
  });
