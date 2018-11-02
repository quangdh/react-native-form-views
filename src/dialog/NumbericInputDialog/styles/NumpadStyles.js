import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: "row"
    },
    col: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: "white"
    },
    button: {
        // flex: 1,
        width: "100%",
        lineHeight: 55,
        fontSize: 20,
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        fontWeight: "600"
    }
}));
