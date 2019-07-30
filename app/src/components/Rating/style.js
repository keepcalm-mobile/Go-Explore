import {StyleSheet} from 'react-native';
import s, { colors, fontNames, fontSizes, indent} from '../../styles';
import {scale} from '../../utils/resize';

export const headerH = scale(390);

const styles = StyleSheet.create({
    ratingValue:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.description,
        textAlign: 'left',
        marginLeft: indent,
        marginRight: indent * 0.5,
        color: colors.ratingStars,
        // marginTop: 6,
    },
    ratingCircle: {
        width: 44,
        height: 44,
        borderWidth: 1,
        borderColor: colors.ratingStars,
        borderRadius: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleRatingText: {
        fontSize: fontSizes.big,
        color: colors.white,
        //marginRight: 5
    },
});
export default styles;
