import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ViewPropTypes
} from "react-native";
import { findIndex } from "ramda";

import styles from "./styles/MultiSelectionInputDialog";
import Cell from "./Cell";

class MultiSelectionInputContainer extends Component {
  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._onItemPress = this._onItemPress.bind(this);
    this._onPressOK = this._onPressOK.bind(this);
    this.state = {
      values: props.values ? props.values : []
    };
  }

  _onItemPress(item) {
    const { keyExtractor } = this.props;
    let values = [...this.state.values];

    let key = keyExtractor ? keyExtractor(item) : item["id"] + "";
    let itemIndex = findIndex(_item => {
      let key1 = keyExtractor ? keyExtractor(_item) : item["id"] + "";
      return key1 === key;
    }, values);

    if (itemIndex >= 0) {
      values.splice(itemIndex, 1);
    } else {
      values.push(item);
    }

    this.setState({
      values
    });
  }

  _renderItem({ item, index }) {
    const { keyExtractor, labelExtractor } = this.props;
    const { values } = this.state;
    let key = keyExtractor ? keyExtractor(item, index) : item["id"] + "";
    let label = labelExtractor ? labelExtractor(item, index) : item["title"];
    let selected =
      findIndex(_item => {
        let key1 = keyExtractor ? keyExtractor(_item) : item["id"] + "";
        return key1 === key;
      }, values) >= 0;
    return (
      <Cell
        index={index}
        selected={selected}
        data={item}
        onPress={this._onItemPress}
        key={key}
        text={label}
        style={this.props.cellStyle}
        textStyle={this.props.textCellStyle}
        selectedStyle={this.props.cellSelectedStyle}
        textSelectedStyle={this.props.textCellSelectedStyle}
      />
    );
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

  _onPressOK() {
    const { onBackdropPress, onPressOK } = this.props;
    if (onPressOK) onPressOK(this.state.values);
    if (onBackdropPress) onBackdropPress();
  }

  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}

MultiSelectionInputContainer.defaultProps = {
  data: [],
  numColumns: 3,
  values: [],
  onBackdropPress: () => {},
  onPressOK: () => {}
};

MultiSelectionInputContainer.propTypes = {
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
  cellStyle: ViewPropTypes.style,
  // cellSelectedStyle: ViewPropTypes.style,
  textCellStyle: ViewPropTypes.style,
  // textCellSelectedStyle: ViewPropTypes.style,
  buttonCloseText: PropTypes.string
};

export default MultiSelectionInputContainer;
