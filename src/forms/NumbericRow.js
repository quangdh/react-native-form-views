import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import numeral from "numeral";
import { NumbericInputDialog } from "../dialog";

class NumbericRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      number: props.amount
    };
    this.onHideDialog = this.onHideDialog.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onShowDialog = this.onShowDialog.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.amount !== prevState.number) {
      return {
        number: nextProps.amount
      };
    }
    return null;
  }

  onHideDialog() {
    this.setState({
      isShow: false
    });
  }

  onDone(number) {
    this.setState(
      {
        number
      },
      () => {
        this.props.onValueChange(number);
      }
    );
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
          amount={this.state.number}
          isVisible={isShow}
          onBackdropPress={this.onHideDialog}
          onDone={this.onDone}
          maxLength={this.props.maxLength}
        />
      </TouchableOpacity>
    );
  }
}

NumbericRow.propTypes = {
  amount: PropTypes.number,
  onValueChange: PropTypes.func,
  maxLength: PropTypes.number
};

NumbericRow.defaultProps = {
  amount: 0,
  onValueChange: () => {},
  maxLength: 0
};

export default NumbericRow;
