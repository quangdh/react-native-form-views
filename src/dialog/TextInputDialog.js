import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  TextInput,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { isEmpty } from "ramda";

import styles from "./styles/TextInputDialogStyles";
import KeyboardAvoidView from "../views/KeyboardAvoidView";
import IconClear from "../assets/images/btn_clear.png";

class TextInputDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: isEmpty(props.value) ? "" : props.value
    };
    this._onChangeText = this._onChangeText.bind(this);
    this._clear = this._clear.bind(this);
    this._onDone = this._onDone.bind(this);
  }

  componentDidUpdate(preProps) {
    if (
      !preProps.isVisible &&
      this.props.isVisible &&
      this.state.inputValue !== this.props.value
    ) {
      this.setState({
        inputValue: this.props.value
      });
    }
  }

  componentDidMount() {
    if (this.textInput) this.textInput.focus();
  }

  _renderHeader() {
    const { HeaderComponent } = this.props;
    if (!HeaderComponent) return;
    return <HeaderComponent />;
  }

  _renderFooter() {
    const { FooterComponent } = this.props;
    if (!FooterComponent) return;
    return <FooterComponent />;
  }

  _onChangeText(text) {
    this.setState({ inputValue: text });
  }

  _clear() {
    this.setState({
      inputValue: ""
    });
  }

  _onDone() {
    const { onDone, onBackdropPress } = this.props;
    const { inputValue } = this.state;
    if (onDone) onDone(inputValue);
    if (onBackdropPress) onBackdropPress();
  }

  render() {
    const {
      textBoxStyle,
      textStyle,
      buttonOKStyle,
      buttonOKTextStyle,
      buttonOKText
    } = this.props;

    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.container}
      >
        <View style={styles.content}>
          {this._renderHeader()}
          <KeyboardAvoidView style={styles.board}>
            <View style={[styles.textView, textBoxStyle]}>
              <TextInput
                {...this.props}
                ref={ref => {
                  this.textInput = ref;
                }}
                style={[styles.text, textStyle]}
                value={this.state.inputValue}
                onChangeText={this._onChangeText}
                maxLength={this.props.maxLength}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={this._clear}>
                <Image source={IconClear} style={styles.iconClear} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.buttonOK, buttonOKStyle]}
              activeOpacity={0.8}
              onPress={this._onDone}
            >
              <Text style={[styles.textButtonOK, buttonOKTextStyle]}>
                {buttonOKText ? buttonOKText : "OK"}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidView>
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}

TextInputDialog.propTypes = {
  ...TextInput.propTypes,
  textBoxStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  buttonOKStyle: ViewPropTypes.style,
  buttonOKTextStyle: ViewPropTypes.style,
  buttonOKText: PropTypes.string,
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

TextInputDialog.defaultProps = {
  maxLength: 200,
  numberOfLines: 1,
  multiline: false,
  autoCapitalize: "none",
  underlineColorAndroid: "transparent"
};

export default TextInputDialog;
