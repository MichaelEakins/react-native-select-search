import * as React from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

import { styles as stylesWrapper } from "./styles";

interface ISelectItem {
  id: string | number;
  label: string;
  fontStyle?: TextStyle;
  containerStyle?: ViewStyle;
  containerBackgroundColor?: string;
  handlePress: (key: string | number) => void;
}

export const SelectItem: React.FC<ISelectItem> = ({
  id,
  label,
  fontStyle,
  containerStyle,
  containerBackgroundColor,
  handlePress,
}) => {
  const styles = stylesWrapper(containerBackgroundColor);
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      key={`${id}`}
      onPress={() => handlePress(id)}
    >
      <Text numberOfLines={1} style={[styles.text, fontStyle]}>
        {label}
      </Text>
    </Pressable>
  );
};
