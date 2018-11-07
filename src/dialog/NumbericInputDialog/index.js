import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import Modal from "react-native-modal";
import numeral from "numeral";
import { isEmpty } from "ramda";

import styles from "./styles/NumbericInputDialogStyles";
import Numpad from "./Numpad";

class NumbericInputDialog extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
      amount: 0,
      decimal: ""
    }
    this._renderHeader = this._renderHeader.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
  }

  _onPress(tag) {
    switch (tag) {
      case "back": this._onPressBack(); break;
      case "dot": this._onPressDot(); break;
      default: this._onPressNum(tag); break;
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
      })
    }
  }

  _onPressDot() {
    const { decimal } = this.state;
    if (isEmpty(decimal)) {
      this.setState({
        decimal: "."
      })
    }
  }

  _onPressNum(tag) {
    const { amount, decimal } = this.state;
    if (isEmpty(decimal)) {
      let number = numeral(tag).add(amount * 10).value();
      this.setState({
        amount: number
      });
    } else {
      this.setState({
        decimal: decimal + tag
      })
    }
  }

  _renderHeader() {
    const { HeaderComponent } = this.props;
    if (!HeaderComponent) return;
    // if (typeof HeaderComponent === "function") return HeaderComponent();
    return <HeaderComponent />
  }

  _renderFooter() {
    const { FooterComponent } = this.props;
    if (!FooterComponent) return;
    // if (typeof HeaderComponent === "function") return HeaderComponent();
    return <FooterComponent />
  }

  render() {
    const { amountBoxStyle, amountStyle, buttonDoneStyle, buttonDoneTextStyle, buttonDoneText } = this.props;
    const { decimal } = this.state;
    let amount = numeral(this.state.amount).format("0,0");
    return (
      <Modal {...this.props} style={styles.container}>
        <View style={styles.content}>
          {this._renderHeader()}
          <View style={styles.board}>
            <View style={[styles.amountView, amountBoxStyle]}>
              <Text style={[styles.amount, amountStyle]}>{amount}{decimal}</Text>
            </View>
            <TouchableOpacity style={[styles.buttonOK, buttonDoneStyle]} activeOpacity={0.8}>
              <Text style={[styles.textButtonOK, buttonDoneTextStyle]}>{buttonDoneText ? buttonDoneText : "OK"}</Text>
            </TouchableOpacity>
          </View>
          <Numpad onPress={this._onPress} />
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}

NumbericInputDialog.propTypes = {
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
  ])
}

export default NumbericInputDialog;
