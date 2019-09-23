import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontNames, fontSizes, indent, windowW, headerH} from '../../../../../../../../styles';
import {scale, verticalScale} from '../../../../../../../../utils/resize';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.bgCategory,
        paddingBottom: doubleIndent * 2,
    },
    header: {
        height:headerH,
        width:'100%',
        justifyContent: 'flex-end',
        // alignItems:'flex-end',
        backgroundColor: 'transparent',
        marginBottom:indent,
    },
    image:{
        width: windowW,
        height: headerH,
        position: 'absolute',
    },
    linearGradient: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        marginTop: '50%',
    },

    titleCnt: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:indent,
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
    },
    rightBtn: {
        width: scale(40),
        height: scale(40),
        alignItems:'center',
        justifyContent:'center',
        marginRight:indent,
    },

    ratingCnt:{
        flexDirection:'row',
        marginBottom:indent,
    },
    ratingInfo: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
    },

    tagsCnt: {
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:indent,
        marginHorizontal: indent,
    },
    tagCnt: {
        justifyContent:'center',
        borderWidth:1,
        borderRadius:20,
        borderColor:colors.darkMain,
        marginRight: indent * 0.67,
        marginBottom: indent * 0.5,
    },
    tagTxt: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'center',
        lineHeight: scale(18),
        color: colors.white,
        marginHorizontal: indent * 0.5,
        marginVertical: indent * 0.25,
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



    locationCnt: {
        marginHorizontal: indent,
        width: null,
    },
    dataCnt: {
        marginHorizontal: indent,
        marginBottom:doubleIndent,
    },
});
export default styles;
