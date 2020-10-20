import * as React from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../Utils/index";
import { styles } from "./styles";

Icon.loadFont();

interface ISelectContainer {
  arrowColor?: string;
  arrowSize?: number;
  handleDropDownPress: (event: GestureResponderEvent) => void;
  selectedItem?: any;
  itemLabel: string;
}
export const SelectContainer: React.FC<ISelectContainer> = ({
  arrowColor = Colors.black,
  arrowSize = 30,
  handleDropDownPress,
  selectedItem,
  itemLabel,
}) => {
  return (
    <Pressable style={styles.pressable} onPress={handleDropDownPress}>
      {selectedItem && (
        <View style={styles.textContainer}>
          <Text numberOfLines={1}>{selectedItem[itemLabel]}</Text>
        </View>
      )}
      <View style={[styles.iconContainer, !selectedItem && { flex: 1 }]}>
        <Icon name="caret-down" size={arrowSize} color={arrowColor} />
      </View>
    </Pressable>
  );
};
