import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { map, toString } from "ramda";
import styles from "./styles/NumpadStyles";

const NUM_PAD = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["dot", "0", "back"]
];

const NUM_PAD_REVERSE = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["dot", "0", "back"]
];

class Numpad extends PureComponent {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.NUM_PAD = props.reverse ? NUM_PAD_REVERSE : NUM_PAD;
  }

  _renderItem(item) {
    const { renderButtonBack, renderButtonDot, buttonStyle } = this.props;
    if (item === "dot") {
      return renderButtonDot ? (
        renderButtonDot(item)
      ) : (
        <Text style={[styles.button, buttonStyle]}>.</Text>
      );
    } else if (item === "back") {
      return renderButtonBack ? (
        renderButtonBack(item)
      ) : (
        <Text style={[styles.button, buttonStyle]}>Back</Text>
      );
    } else {
      return <Text style={[styles.button, buttonStyle]}>{item}</Text>;
    }
  }

  _renderItems(items) {
    const { renderItem } = this.props;
    let _renderItem = renderItem ? renderItem : this._renderItem;
    return map(
      item => (
        <TouchableOpacity
          key={item}
          style={styles.col}
          activeOpacity={0.8}
          onPress={() => this.props.onPress(item)}
        >
          {_renderItem(item)}
        </TouchableOpacity>
      ),
      items
    );
  }

  _renderRow() {
    let rows = [];
    this.NUM_PAD.forEach((item, index) => {
      rows.push(
        <View key={toString(index)} style={styles.row}>
          {this._renderItems(item)}
        </View>
      );
    });
    return rows;
  }

  render() {
    return <View style={styles.container}>{this._renderRow()}</View>;
  }
}

Numpad.propTypes = {
  reverse: PropTypes.bool,
  renderItem: PropTypes.func,
  renderButtonBack: PropTypes.func,
  renderButtonDot: PropTypes.func,
  buttonStyle: PropTypes.any
};

Numpad.defaultProps = {
  reverse: false,
  onPress: () => {}
};

export default Numpad;
