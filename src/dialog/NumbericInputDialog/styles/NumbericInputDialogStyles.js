import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0
  },
  content: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    margin: 0
  },
  board: {
    width: "100%",
    flexDirection: "row",
    padding: 10
  },
  amountView: {
    flex: 1,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 5
  },
  buttonOK: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5
  }
}));
