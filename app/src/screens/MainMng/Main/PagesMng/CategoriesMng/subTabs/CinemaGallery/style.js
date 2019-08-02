import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

export const cinemaItemW = scale(242);
export const cinemaItemH = scale(348);

const styles = StyleSheet.create({
    tabCnt: {
        paddingVertical: indent,
    },
    cinemaTitle:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        textAlign: 'left',
        lineHeight: scale(27),
        color: colors.white,
        marginLeft: indent,
        marginBottom: indent,
    },
    cinemaSlider:{

    },
    cinemaSlide:{
        marginHorizontal: indent,
    },
    cinemaItemImage:{
        width: cinemaItemW,
        height: cinemaItemH,
        borderRadius: 10,
        marginBottom: indent / 2,
    },
});
export default styles;
