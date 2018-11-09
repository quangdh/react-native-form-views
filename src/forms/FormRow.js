import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { toUpper } from "ramda";

import styles from "./styles/FormRowStyles";

class FormRow extends PureComponent {
  render() {
    const {
      style,
      labelStyle,
      label,
      labelBox,
      isLaberUpper,
      children
    } = this.props;
    return (
      <View style={style ? [styles.container, style] : styles.container}>
        <View style={labelBox ? [styles.labelBox, labelBox] : styles.labelBox}>
          <Text style={labelStyle ? [styles.label, labelStyle] : styles.label}>
            {isLaberUpper ? toUpper(label) : label}
          </Text>
        </View>
        <View style={styles.content}>{children}</View>
      </View>
    );
  }
}

FormRow.propTypes = {
  isLaberUpper: PropTypes.bool,
  label: PropTypes.string,
  labelStyle: PropTypes.any,
  rightIcon: PropTypes.any,
  labelBox: PropTypes.any,
  onRightIconPress: PropTypes.func,
  rightIconStyle: PropTypes.any,
  rightIconBoxStyle: PropTypes.any
};

FormRow.defaultProps = {
  isLaberUpper: true,
  label: ""
};

export default FormRow;
