import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/resize';
import {colors, fontNames, fontSizes, indent} from '../../../styles';

export const itemW = scale(90);
export const itemH = scale(44);

const styles = StyleSheet.create({
    item: {
        width: itemW,
        height: itemH,
        borderColor: colors.border,
        borderRadius: itemH * 0.5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent:'space-evenly',
        marginBottom: indent,
    },
    itemActive: {
        borderWidth: 0,
    },
    itemDisabled: {
        borderWidth: 1,
        borderColor: colors.secondaryText,
    },
    itemText: {
        fontSize: fontSizes.small,
        fontFamily: fontNames.regular,
        lineHeight: scale(18),
        textAlign: 'center',
        color: colors.white,
    },
    itemTextActive: {
        color: colors.blackText,
    },
    itemTextDisabled: {
        color: colors.secondaryText,
    },
    line: {
        height: 1,
        width: itemW * 0.7,
        backgroundColor: colors.border,
    },
    itemLineActive: {
        backgroundColor: colors.blackText,
    },
    itemLineDisabled: {
        backgroundColor: colors.secondaryText,
    },
    activeBg:{
        position: 'absolute',
        height: itemH,
        width: itemW,
        borderRadius: itemH * 0.5,
        top: 0,
        left: 0,
    },
});
export default styles;
