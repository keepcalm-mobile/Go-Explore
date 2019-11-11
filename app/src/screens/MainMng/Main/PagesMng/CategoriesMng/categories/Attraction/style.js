import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontNames, fontSizes, indent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

const styles = StyleSheet.create({
    containerEmpty:{
        flex:1,
        backgroundColor: colors.bgCategory,
    },
    container: {
        // flex: 1,
        backgroundColor: colors.bgCategory,
        paddingBottom: doubleIndent,
    },
    separator: {
        marginBottom:indent,
    },
    tabLabel: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.small,
        textAlign: 'center',
        lineHeight: scale(18),
        color: colors.white,
        margin:0,
        // marginHorizontal: indent * 0.5,
        // marginVertical: indent * 0.25,
    },
    tabCnt: {
        // flex:1,
        backgroundColor: 'transparent',
        paddingVertical: indent,
    },
});
export default styles;
