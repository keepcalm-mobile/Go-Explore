import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontNames, fontSizes, indent, windowW} from '../../styles';
import {scale} from '../../utils/resize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgCategory,
        // paddingBottom: doubleIndent,
    },
    slide: {
        // flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    image: {
        width: windowW,
        height: '100%',
        position: 'absolute',
        backgroundColor: colors.bgApp,
    },
    linearGradient:{
        width:'100%',
        height:'60%',
        position:'absolute',
        top: '40%',
    },
    infoCnt: {
        marginTop: 400,
    },
    titleCnt: {
        flexDirection:'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: doubleIndent,
        marginRight: indent,
        marginBottom: indent,
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
        width: '80%',
    },
    subTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        textAlign: 'left',
        marginLeft: doubleIndent,
        marginRight: indent,
        color: colors.white,
        // width: '100%',
    },
    footer: {
        marginHorizontal: indent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagItemsCnt: {
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: indent,
    },
    pagItem: {
        height: scale(3),
        borderRadius: scale(3),
    },
    button: {
        width: '50%',
        alignItems: 'center',
    },
    buttonTitle: {
        margin: indent,
        marginBottom: indent * 1.5,
    },
});
export default styles;
