import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    alignItems: "center"
  },
  selected: {
    backgroundColor: "green"
  },
  textSelected: {
    color: "white"
  }
}));
