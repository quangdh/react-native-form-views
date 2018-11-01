'use strict';
import {
	PickerIOS,
	Platform,
} from 'react-native';

import WheelCurvedPicker from './WheelCurvedPicker'

export default (Platform.OS === 'ios' ? PickerIOS : WheelCurvedPicker)
