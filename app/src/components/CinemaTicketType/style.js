import {StyleSheet} from 'react-native';
import {scale} from '../../utils/resize';
import {colors, doubleIndent, fontNames, fontSizes, indent, windowW} from '../../styles';
import {itemW} from './Item/style';

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignSelf: 'flex-start',
        marginHorizontal: indent,
        alignItems: 'center',
        // justifyContent:'space-evenly',
        // justifyContent:'space-between',
    },
    footerText: {
        fontSize: fontSizes.big,
        fontFamily: fontNames.bold,
        lineHeight: scale(27),
        textAlign: 'center',
        color: colors.white,
    },
    footerMargin: {
        marginBottom: indent,
    },
    confirmBtn: {
        width: '100%',
    },
    warningText: {
        fontSize: fontSizes.smallTitle,
        fontFamily: fontNames.regular,
        lineHeight: scale(15),
        textAlign: 'center',
        color: colors.white,
    },
});
export default styles;
