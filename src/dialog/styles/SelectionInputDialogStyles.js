import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0
  },
  content: {
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    margin: 0,
  },
  wheel: {
    width: "100%", 
    height: 180 ,
    backgroundColor: "white"
  }
}));
