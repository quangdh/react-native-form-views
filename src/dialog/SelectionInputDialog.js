import React, { Component } from "react";
import { View, Text, TouchableOpacity, ViewPropTypes } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { length, findIndex } from "ramda";

import { Wheel } from "../views";
import styles from "./styles/SelectionInputDialogStyles";

class SelectionInputDialog extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._onValueChange = this._onValueChange.bind(this);
    this._onPressOK = this._onPressOK.bind(this);

    let _value = null;
    if (props.value && props.data && length(props.data) > 0) {
      if (props.keyExtractor) {
        let index = findIndex(
          item =>
            JSON.stringify({ value: item }) ===
            JSON.stringify({ value: props.value }),
          props.data
        );
        _value = props.keyExtractor(props.value, index);
      } else _value = props.value["id"];
    }
    this.state = {
      data: props.data ? props.data : [],
      value: _value
    };
  }

  componentDidUpdate(preProps) {
    if (
      !preProps.isVisible &&
      this.props.isVisible &&
      JSON.stringify(
        { value: preProps.value } !==
          JSON.stringify({ value: this.props.value })
      )
    ) {
      this.setState({
        value: this.props.value
      });
    }
  }

  _renderItem(value, i) {
    const { keyExtractor, labelExtractor } = this.props;
    let key = keyExtractor ? keyExtractor(value, i) : value["id"] + "";
    let label = labelExtractor ? labelExtractor(value, i) : value["title"];
    return <Wheel.Item label={label} value={key} key={key} />;
  }

  _renderHeader() {
    const {
      HeaderComponent,
      onBackdropPress,
      headerStyle,
      buttonCloseStyle,
      buttonCloseTextStyle,
      buttonCloseText
    } = this.props;
    if (HeaderComponent) return <HeaderComponent />;
    else {
      return (
        <View style={[styles.header, headerStyle]}>
          <TouchableOpacity onPress={onBackdropPress} style={buttonCloseStyle}>
            <Text style={[styles.buttonClose, buttonCloseTextStyle]}>
              {buttonCloseText ? buttonCloseText : "X"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _renderFooter() {
    const {
      FooterComponent,
      buttonOKStyle,
      textButtonOK,
      buttonOKTextStyle
    } = this.props;
    if (FooterComponent) return <FooterComponent />;
    else {
      return (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.buttonOK, buttonOKStyle]}
            onPress={this._onPressOK}
          >
            <Text style={[styles.textButtonOK, buttonOKTextStyle]}>
              {textButtonOK ? textButtonOK : "OK"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  _onValueChange(value) {
    this.setState({
      value
    });
  }

  _onPressOK() {
    const { keyExtractor, onPressOK, onBackdropPress } = this.props;
    const { value, data } = this.state;
    if (onPressOK) {
      let result = null;
      if (length(data) > 0) {
        result = data[0];
        let index = findIndex((item, index) => {
          let key = keyExtractor ? keyExtractor(item, index) : item["id"];
          return value === key;
        }, data);
        result = index >= 0 ? data[index] : null;
      }
      onPressOK(result);
    }
    if (onBackdropPress) onBackdropPress();
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.container}
      >
        <View>
          {this._renderHeader()}
          <Wheel
            style={styles.wheel}
            selectedValue={this.state.value}
            onValueChange={this._onValueChange}
          >
            {length(this.state.data) > 0 &&
              this.state.data.map(this._renderItem)}
          </Wheel>
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}

SelectionInputDialog.propTypes = {
  data: PropTypes.array,
  keyExtractor: PropTypes.func,
  labelExtractor: PropTypes.func,
  value: PropTypes.any,
  HeaderComponent: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func
  ]),
  FooterComponent: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func
  ]),
  onChangeValue: PropTypes.func,
  onPressOK: PropTypes.func,
  buttonOKStyle: ViewPropTypes.style,
  buttonOKTextStyle: ViewPropTypes.style,
  buttonOKText: PropTypes.string,
  headerStyle: ViewPropTypes.style,
  buttonCloseStyle: ViewPropTypes.style,
  buttonCloseTextStyle: ViewPropTypes.style,
  buttonCloseText: PropTypes.string
};

export default SelectionInputDialog;
