import {StyleSheet} from 'react-native';
import s, { colors, bottomIndent, fontNames, fontSizes, windowH, windowW, startY, indent, doubleIndent, headerH} from '../../styles';
import {scale, verticalScale} from '../../utils/resize';

const styles = StyleSheet.create({
    container: {
        height:headerH,
        width:'100%',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        // paddingTop: startY,
        // position:'absolute',
        // height:windowH,
        // width:windowW * 0.4,
    },
    slide: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    image:{
        width: windowW,
        height: scale(390),
        position: 'absolute',
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
        // marginTop: verticalScale(19),
        // marginBottom: verticalScale(13),
        // lineHeight: scale(56),
        // backgroundColor: 'transparent',
        // letterSpacing: 2,
    },
    subTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
    },
    linearGradient: {
        width:'100%',
        height:'50%',
        position:'absolute',
        marginTop: '50%',
        // marginLeft: indent,
        // marginRight: indent,
        // borderRadius: 8,
    },

    paginationContainer: {
        padding: 0,
        paddingBottom: scale(69),
        paddingHorizontal: indent,
        position:'absolute',
    },
    paginationDot: {
        width: scale(4),
        height: scale(4),
        borderRadius: scale(4),
    },
    paginationDotContainer:{
        marginHorizontal:2,
    },
});
export default styles;
