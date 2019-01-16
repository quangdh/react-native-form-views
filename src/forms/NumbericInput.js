import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, ViewPropTypes } from "react-native";
import numeral from "numeral";
import { isEmpty, split, toString, length } from "ramda";

import styles from "./styles/NumbericInputStyles";
import Numpad from "./NumpadInput";

class NumbericInput extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._onDone = this._onDone.bind(this);

    let number = numeral(props.amount).format("0.[00000000]");
    let parts = split(".", number);
    this.state = {
      amount: parts ? numeral(parts[0]).value() : props.amount,
      decimal: parts && parts[1] ? "." + parts[1] : ""
    };
  }

  _onPress(tag) {
    switch (tag) {
      case "back":
        this._onPressBack();
        break;
      case "dot":
        this._onPressDot();
        break;
      default:
        this._onPressNum(tag);
        break;
    }
  }

  _onPressBack() {
    const { amount, decimal } = this.state;
    if (isEmpty(decimal)) {
      let number = parseInt(amount / 10);
      this.setState({
        amount: number
      });
    } else {
      let newDecimal = decimal.substring(0, decimal.length - 1);
      this.setState({
        decimal: newDecimal
      });
    }
  }

  _onPressDot() {
    let length = this._getLength();
    if (this.props.maxLength > 0 && length >= this.props.maxLength) return;

    const { decimal } = this.state;
    if (isEmpty(decimal)) {
      this.setState({
        decimal: "."
      });
    }
  }

  _onPressNum(tag) {
    let length = this._getLength();
    if (this.props.maxLength > 0 && length >= this.props.maxLength) return;

    const { amount, decimal } = this.state;
    if (isEmpty(decimal)) {
      let number = numeral(tag)
        .add(amount * 10)
        .value();
      this.setState({
        amount: number
      });
    } else {
      this.setState({
        decimal: decimal + tag
      });
    }
  }

  _getLength() {
    const { amount, decimal } = this.state;
    let _length = length(toString(amount));
    if (!isEmpty(decimal)) _length += length(decimal) - 1;
    return _length;
  }

  _onDone() {
    const { onDone } = this.props;
    const { amount, decimal } = this.state;
    let number = numeral(amount);
    if (!isEmpty(decimal) && decimal.length > 1) {
      number = number.add("0" + decimal);
    }
    if (onDone) onDone(number.value());
  }

  _renderHeader() {
    const { HeaderComponent } = this.props;
    if (!HeaderComponent) return;
    // if (typeof HeaderComponent === "function") return HeaderComponent();
    return <HeaderComponent />;
  }

  _renderFooter() {
    const { FooterComponent } = this.props;
    if (!FooterComponent) return;
    // if (typeof HeaderComponent === "function") return HeaderComponent();
    return <FooterComponent />;
  }

  render() {
    const {
      amountBoxStyle,
      amountStyle,
      buttonDoneStyle,
      buttonDoneTextStyle,
      buttonDoneText
    } = this.props;
    const { decimal } = this.state;
    let amount = numeral(this.state.amount).format("0,0");
    return (
      <View style={styles.content}>
        {this._renderHeader()}
        <View style={styles.board}>
          <View style={[styles.amountView, amountBoxStyle]}>
            <Text style={[styles.amount, amountStyle]}>
              {amount}
              {decimal}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonOK, buttonDoneStyle]}
            activeOpacity={0.8}
            onPress={this._onDone}
          >
            <Text style={[styles.textButtonOK, buttonDoneTextStyle]}>
              {buttonDoneText ? buttonDoneText : "OK"}
            </Text>
          </TouchableOpacity>
        </View>
        <Numpad onPress={this._onPress} />
        {this._renderFooter()}
      </View>
    );
  }
}

NumbericInput.propTypes = {
  ...Numpad.propTypes,
  amountBoxStyle: ViewPropTypes.style,
  amountStyle: ViewPropTypes.style,
  buttonDoneStyle: ViewPropTypes.style,
  buttonDoneTextStyle: ViewPropTypes.style,
  buttonDoneText: PropTypes.string,
  HeaderComponent: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func
  ]),
  FooterComponent: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func
  ]),
  maxLength: PropTypes.number
};

NumbericInput.defaultProps = {
  maxLength: 0
};

export default NumbericInput;
