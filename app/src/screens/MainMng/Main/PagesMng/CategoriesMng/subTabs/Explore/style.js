import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

export const exploreImgW = scale(361);
export const exploreImgH = scale(203);

const styles = StyleSheet.create({
    tabCnt: {
        padding: indent,
    },
    exploreImage:{
        width: '100%',
        height: exploreImgH,
        borderRadius: 10,
        marginBottom: indent,
    },
    exploreText:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        textAlign: 'left',
        lineHeight: scale(23),
        color: colors.white,
    },
});
export default styles;
