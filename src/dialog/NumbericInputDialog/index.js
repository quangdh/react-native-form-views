import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";

import styles from "./styles/NumbericInputDialogStyles";
import Numpad from "./Numpad";

class NumbericInputDialog extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = {
        amount: 0
    }
  }

  _onPress(tag) {

  }

  render() {
    return (
      <Modal {...this.props} style={styles.container}>
        <View style={styles.content}>
            <View style={styles.board}>
                <Text style={styles.amountView}>0</Text>
                <TouchableOpacity style={styles.buttonOK}>
                    <Text>OK</Text>
                </TouchableOpacity>
            </View>
            <Numpad 
                onPress={this._onPress}/>
        </View>
      </Modal>
    );
  }
}

NumbericInputDialog.propTypes = {
    ...Numpad.propTypes
}

export default NumbericInputDialog;
