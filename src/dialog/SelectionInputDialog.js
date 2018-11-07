import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { length, find } from "ramda";

import { Wheel } from "../input";
import styles from "./styles/SelectionInputDialogStyles"

class SelectionInputDialog extends Component {
    constructor(props) {
        super(props);
        this._renderItem = this._renderItem.bind(this);
        this.state = {
            data: props.data ? props.data : []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(state.data) !== JSON.stringify(props.data)) {
            return { data: props.data ? props.data : [] };
        }
        return null;
    }

    _renderItem(value, i) {
        // let label = this._renderTitle(value);
        // let _value = this.dataType === "object" ? value[this.idKey] : value;
        return <Wheel.Item label={value} value={value} key={"money" + value} />;
    }

    render() {
        const { renderItem } = this.props;
        return (
            <Modal {...this.props} style={styles.container}>
                <Wheel
                    style={styles.wheel}>
                    {length(this.state.data) > 0 &&
                        this.state.data.map(renderItem ? renderItem : this._renderItem)}
                </Wheel>
            </Modal>
        );
    }
}

SelectionInputDialog.propTypes = {
    data: PropTypes.array,
    renderItem: PropTypes.func,
    keyExtractor: PropTypes.func,
    value: PropTypes.any,
    onChangeValue: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    onPressOK: PropTypes.func,
}

export default SelectionInputDialog;
