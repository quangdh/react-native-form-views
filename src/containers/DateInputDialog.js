import React, { Component } from "react";
import { View, Text, TouchableOpacity, ViewPropTypes } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";

import { DatePicker } from "../views";
import styles from "./styles/DateInputDialogStyles";

class DateInputDialog extends Component {
  constructor(props) {
    super(props);
    this._onValueChange = this._onValueChange.bind(this);
    this._onPressOK = this._onPressOK.bind(this);

    this.state = {
      value: props.value ? props.value : new Date()
    };
  }

  componentDidUpdate(preProps) {
    if (
      !preProps.isVisible &&
      this.props.isVisible &&
      this.state.value !== this.props.value
    ) {
      this.setState({
        value: this.props.value
      });
    }
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

  _onValueChange(newValue) {
    this.setState({
      value: newValue
    });
  }

  _onPressOK() {
    const { onPressOK, onBackdropPress } = this.props;
    const { value } = this.state;
    if (onPressOK) {
      onPressOK(value);
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
          <DatePicker
            style={styles.wheel}
            date={this.state.value}
            onDateChange={this._onValueChange}
          />
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}

DateInputDialog.propTypes = {
  value: PropTypes.objectOf(Date),
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

DateInputDialog.defaultProps = {
  value: new Date(),
  onChangeValue: () => {},
  onPressOK: () => {}
};

export default DateInputDialog;
