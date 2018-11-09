import React, { Component } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";

class TextInputDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Modal {...this.props} style={styles.container} />;
  }
}

export default TextInputDialog;
