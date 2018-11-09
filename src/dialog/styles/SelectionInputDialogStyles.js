import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0
  },
  content: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    margin: 0
  },
  wheel: {
    width: "100%",
    height: 180,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "green",
    padding: 10
  },
  buttonClose: {
    alignSelf: "flex-end",
    color: "white",
    fontSize: 18
  },
  footer: {
    backgroundColor: "#fafafa",
    alignItems: "center",
    padding: 10
  },
  buttonOK: {
    maxWidth: 300,
    width: "80%",
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center"
  },
  textButtonOK: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  }
});
