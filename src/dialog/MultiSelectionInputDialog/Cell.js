import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, ViewPropTypes } from "react-native";

import styles from "./styles/CellStyles";

class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    const { data, index } = this.props;
    this.props.onPress(data, index);
  }

  render() {
    const {
      text,
      style,
      textStyle,
      selected,
      textSelectedStyle,
      selectedStyle
    } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          selected ? [styles.selected, selectedStyle] : {}
        ]}
        onPress={this._onPress}
      >
        <Text
          style={[
            textStyle,
            selected ? [styles.textSelected, textSelectedStyle] : {}
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

Cell.propTypes = {
  text: PropTypes.string,
  // textStyle: ViewPropTypes.style,
  // textSelectedStyle: ViewPropTypes.style,
  selectedStyle: ViewPropTypes.style,
  selected: PropTypes.bool,
  onPress: PropTypes.func
};

Cell.defaultProps = {
  onPress: () => {}
};

export default Cell;
