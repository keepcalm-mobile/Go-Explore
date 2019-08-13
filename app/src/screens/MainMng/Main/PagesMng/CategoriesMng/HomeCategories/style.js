import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontSizes, indent} from '../../../../../../styles';
import {scale} from '../../../../../../utils/resize';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgCategory,
        paddingBottom: doubleIndent,
    },
    containerEmpty:{
        flex:1,
        backgroundColor: colors.bgCategory,
    },
    titleCnt:{
        margin: indent,
        marginTop: doubleIndent,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    welcome: {
        fontFamily: 'Poppins-Bold',
        fontSize: fontSizes.heading,
        lineHeight: scale(33),
        color: colors.white,
        marginHorizontal: indent * 0.5,
    },
    separator: {
        marginBottom:indent,
    },
});
export default styles;
