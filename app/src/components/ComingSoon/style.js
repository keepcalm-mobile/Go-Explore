import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontNames, fontSizes, indent} from '../../styles';
import {scale} from '../../utils/resize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: indent,
        alignItems: 'center',
        backgroundColor: colors.bgSoonPage,
    },
    topCnt: {
        flex: 1,
        marginTop: doubleIndent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: indent,
        marginBottom: indent * 0.5,
    },
    subTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.big,
        lineHeight: scale(30),
        color: colors.white,
        textAlign: 'center',
    },
    button: {
        width:'80%',
        marginBottom: doubleIndent * 1.5,
    },
});
export default styles;
