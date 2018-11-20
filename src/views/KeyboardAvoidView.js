import React, { PureComponent } from "react";
import { Animated, Keyboard } from "react-native";
import PropTypes from "prop-types";

class KeyboardAvoidView extends PureComponent {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(props.paddingBottom);

    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height + this.props.paddingBottom
      })
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: this.props.paddingBottom
      })
    ]).start();
  };

  render() {
    const { style } = this.props;
    return (
      <Animated.View
        {...this.props}
        style={[style, { paddingBottom: this.keyboardHeight }]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

KeyboardAvoidView.propTypes = {
  paddingBottom: PropTypes.number,
  onShowedKeyboard: PropTypes.func,
  onHidedKeyboard: PropTypes.func
};

KeyboardAvoidView.defaultProps = {
  paddingBottom: 10,
  onShowedKeyboard: () => {},
  onHidedKeyboard: () => {}
};

export default KeyboardAvoidView;
