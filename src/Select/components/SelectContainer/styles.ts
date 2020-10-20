import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "../../../Utils/index";

interface IStyles {
  container: ViewStyle;
  iconContainer: ViewStyle;
  pressable: ViewStyle;
  text: TextStyle;
  textContainer: ViewStyle;
}

export const styles = StyleSheet.create<IStyles>({
  container: {
    backgroundColor: Colors.silver,
    height: 30,
    width: "100%",
  },
  iconContainer: {
    alignItems: "flex-end",
    width: 20,
    justifyContent: "center",
  },
  pressable: {
    backgroundColor: Colors.white,
    borderColor: Colors.porcelain,
    borderWidth: 1,
    flexDirection: "row",
    height: 30,
    width: "100%",
  },
  text: {
    fontSize: 17,
  },
  textContainer: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
  },
});
