import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';
import {scale} from "../../../utils/resize";
export const {width, height} = Dimensions.get('window');
const size = scale(44);

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: size,
        justifyContent: 'space-between',
    },
    circle: {
        width: size,
        height: size,
        borderColor: colors.border,
        borderRadius: size * 0.5,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleActive: {
        borderWidth: 0,
    },
    itemText: {
        fontSize: fontSizes.big,
        fontFamily: fontNames.regular,
        lineHeight: scale(26),
        textAlign: 'center',
        color: colors.white,
    },
    itemTextActive: {
        color: colors.blackText,
    },
    starIcon: {
        marginLeft: indent * 0.2,
        marginTop: -2,
    },
    activeBg:{
        position: 'absolute',
        // left: -11,
        // top: -12,
    },
});
export default styles;
