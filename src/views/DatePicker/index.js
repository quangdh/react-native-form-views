"use strict";
import { DatePickerIOS, DatePickerAndroid, Platform } from "react-native";

export default (Platform.OS === "ios" ? DatePickerIOS : DatePickerAndroid);
