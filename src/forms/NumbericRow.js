import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { NumbericInputDialog } from "../dialog";
import numeral from "numeral";

class NumbericRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      number: 0
    };
    this._onHideDialog = this._onHideDialog.bind(this);
    this._onDone = this._onDone.bind(this);
    this._onShowDialog = this._onShowDialog.bind(this);
  }

  _onHideDialog() {
    this.setState({
      isShow: false
    });
  }

  _onDone(number) {
    this.setState({
      number
    });
  }

  _onShowDialog() {
    this.setState({
      isShow: true
    });
  }

  render() {
    let number = numeral(this.state.number).format("0,0.[00000000]");
    return (
      <TouchableOpacity style={this.props.style} onPress={this._onShowDialog}>
        <Text style={this.props.textStyle}>{number}</Text>
        <NumbericInputDialog
          {...this.props}
          isVisible={this.state.isShow}
          onBackdropPress={this._onHideDialog}
          onDone={this._onDone}
        />
      </TouchableOpacity>
    );
  }
}

export default NumbericRow;
