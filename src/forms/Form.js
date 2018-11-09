import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles/FormStyles";

class Form extends PureComponent {
  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

export default Form;
