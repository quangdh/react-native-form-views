import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

import { SelectionInputDialog } from "../dialog";

class WheelRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      value: null
    };
    this._onHideDialog = this._onHideDialog.bind(this);
    this._onPressOK = this._onPressOK.bind(this);
    this._onShowDialog = this._onShowDialog.bind(this);
  }

  _onHideDialog() {
    this.setState({
      isShow: false
    });
  }

  _onPressOK(item) {
    this.setState({
      value: item
    });
  }

  _onShowDialog() {
    this.setState({
      isShow: true
    });
  }

  render() {
    const { labelExtractor, style } = this.props;
    const { value } = this.state;
    let label = "";
    if (value) {
      label = labelExtractor
        ? labelExtractor(this.state.value, 0)
        : value["title"];
    }
    return (
      <TouchableOpacity style={style} onPress={this.onShowDialog}>
        <Text style={this.props.textStyle}>{label}</Text>
        <SelectionInputDialog
          {...this.props}
          value={value}
          isVisible={this.state.isShow}
          onBackdropPress={this._onHideDialog}
          onPressOK={this._onPressOK}
        />
      </TouchableOpacity>
    );
  }
}

export default WheelRow;
