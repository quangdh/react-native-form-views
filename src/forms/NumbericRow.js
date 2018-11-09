import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { NumbericInputDialog } from "../dialog";

class NumbericRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      number: 0
    };
    this.onHideDialog = this.onHideDialog.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onShowDialog = this.onShowDialog.bind(this);
  }

  onHideDialog() {
    this.setState({
      isShow: false
    });
  }

  onDone(number) {
    this.setState({
      number
    });
  }

  onShowDialog() {
    this.setState({
      isShow: true
    });
  }

  render() {
    const { style, textStyle } = this.props;
    const { isShow, number } = this.state;
    const amount = numeral(number).format("0,0.[00000000]");

    return (
      <TouchableOpacity style={style} onPress={this.onShowDialog}>
        <Text style={textStyle}>{amount}</Text>
        <NumbericInputDialog
          {...this.props}
          isVisible={isShow}
          onBackdropPress={this.onHideDialog}
          onDone={this.onDone}
        />
      </TouchableOpacity>
    );
  }
}

export default NumbericRow;
