import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import styles from "./styles/TextInputDialogStyles";

class TextInputDialog extends Component {
  constructor(props) {
    super(props);
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
          <View style={styles.board}>
            <View style={[styles.textView, textBoxStyle]}>
              <Text style={[styles.text, textStyle]} />
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
          </View>
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}

TextInputDialog.propTypes = {
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
  maxLength: 200
};

export default TextInputDialog;
