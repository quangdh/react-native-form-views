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
  textView: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    alignItems: "center"
  },
  text: {
    flex: 1,
    lineHeight: 25,
    fontSize: 20,
    fontWeight: "400"
  },
  buttonOK: {
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    backgroundColor: "green",
    borderRadius: 3
  },
  textButtonOK: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  iconClear: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 5
  }
}));
