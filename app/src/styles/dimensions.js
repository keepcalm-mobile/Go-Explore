import {scale} from '../utils/resize';
import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const indent = scale(15);//'5.6%';//
export const doubleIndent = indent * 2;//'11.2%';//

export const bottomIndent = (!isIphoneX()) ? 0 : scale(11);//Platform.OS === 'android'
export const startY = (!isIphoneX()) ? 0 : getStatusBarHeight() - indent;
export const barH = (!isIphoneX()) ? getStatusBarHeight() : 0;
export const windowH = Dimensions.get('window').height - barH - bottomIndent;
export const windowW = Dimensions.get('window').width;// - doubleIndent;
