import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
    NumbericInputDialog
} from "../dialog";

class NumbericRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            number: 0
        };
        this._onHideDialog = this._onHideDialog.bind(this);
        this._onDone = this._onDone.bind(this);
        this._onShowDialog = this._onShowDialog.bind(this);
    }

    _onHideDialog() {
        this.setState({
            isShow: false
        });
    }

    _onDone(number) {
        this.setState({
            number
        })
    }

    _onShowDialog() {
        this.setState({
            isShow: true
        })
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onShowDialog}>
                <Text>{this.state.number}</Text>
                <NumbericInputDialog
                    {...this.props}
                    isVisible={this.state.isShow}
                    onBackdropPress={this._onHideDialog}
                    onDone={this._onDone}
                />
            </TouchableOpacity>

        );
    }
}

export default NumbericRow;
