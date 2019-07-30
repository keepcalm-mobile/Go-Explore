import {StyleSheet} from 'react-native';
import s, { colors, bottomIndent, fontNames, fontSizes, windowH, windowW, startY, indent, doubleIndent, } from '../../styles';
import {scale, verticalScale} from '../../utils/resize';

export const itemW = scale(72);
export const itemH = scale(72);

const styles = StyleSheet.create({
    container: {
        marginBottom: indent,
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.small,
        textAlign: 'left',
        lineHeight: scale(18),
        color: colors.white,
        marginBottom:indent,
        marginHorizontal:indent,
    },
    slider: {
        // paddingHorizontal: indent*.5,
    },
    slide: {
        marginHorizontal: indent,
    },
    image:{
        width: itemW,
        height: itemH,
        borderRadius: 10,
        marginBottom: indent/2,
    },
    itemTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.personName,
        lineHeight: scale(18),
        textAlign: 'left',
        color: colors.white,
    },
    itemSubtitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.personName,
        lineHeight: scale(13),
        textAlign: 'left',
        color: colors.secondaryText,
    },
});
export default styles;
