import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => Math.round(width / guidelineBaseWidth * size );
const verticalScale = size => Math.round(height / guidelineBaseHeight * size );
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};