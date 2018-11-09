import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ViewPropTypes
} from "react-native";
import Modal from "react-native-modal";

import styles from "./styles/MultiSelectionInputDialog";
import Cell from "./Cell";

class MultiSelectionInputDialog extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);

    this.state = {
      values: []
    };
  }

  _renderItem({ item, index }) {
    const { keyExtractor, labelExtractor } = this.props;
    let key = keyExtractor ? keyExtractor(item, index) : item["id"] + "";
    let label = labelExtractor ? labelExtractor(item, index) : item["title"];
    return <Cell key={key} text={label} />;
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

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.container}
      >
        <View>
          {this._renderHeader()}
          <FlatList
            data={this.props.data}
            style={styles.flatlist}
            extraData={this.state.values}
            numColumns={this.props.numColumns}
            keyExtractor={this.props.keyExtractor}
            renderItem={this._renderItem}
          />
          {this._renderFooter()}
        </View>
      </Modal>
    );
  }
}

MultiSelectionInputDialog.defaultProps = {
  data: [],
  numColumns: 3,
  values: []
};

MultiSelectionInputDialog.propTypes = {
  data: PropTypes.array,
  keyExtractor: PropTypes.func,
  labelExtractor: PropTypes.func,
  numColumns: PropTypes.number,
  values: PropTypes.array,
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

export default MultiSelectionInputDialog;
