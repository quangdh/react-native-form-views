import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  label: {
    fontSize: 16
  },
  labelBox: {
    width: 100,
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  }
});

export default styles;
