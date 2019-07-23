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
    },
});
export default styles;
