import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/resize';
import {colors, fontNames, fontSizes, indent} from '../../../styles';

const size = scale(33);

const styles = StyleSheet.create({
    circle: {
        width: size,
        height: size,
        borderColor: colors.border,
        borderRadius: size * 0.5,
        borderWidth: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleActive: {
        borderWidth: 0,
    },
    itemDayText:{
        fontSize: fontSizes.small,
        fontFamily: fontNames.regular,
        lineHeight: scale(18),
        textAlign: 'center',
        color: colors.white,
        marginBottom: scale(10),
    },
    itemText: {
        fontSize: fontSizes.description,
        fontFamily: fontNames.regular,
        lineHeight: scale(21),
        textAlign: 'center',
        color: colors.white,
    },
    itemTextActive: {
        color: colors.blackText,
    },
    itemTextDisabled: {
        color: colors.secondaryText,
    },
    activeBg:{
        position: 'absolute',
        height: size,
        width: size,
        borderRadius: size * 0.5,
    },
});
export default styles;
