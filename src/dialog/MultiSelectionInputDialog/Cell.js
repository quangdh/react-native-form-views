import React, { PureComponent } from "react";
import { View, Text } from "react-native";

import styles from "./styles/CellStyles";

class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  }
}

export default Cell;
