import {StyleSheet} from 'react-native';
import s, { colors, bottomIndent, fontNames, fontSizes, windowH, windowW, startY, indent, doubleIndent, } from '../../styles';
import {scale, verticalScale} from '../../utils/resize';

export const itemW = scale(280);
export const itemH = scale(395);

const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginTop: indent,
        marginBottom: doubleIndent,
        // justifyContent: 'flex-end',
        // alignItems:'flex-end',
        // paddingTop: startY,
        // position:'absolute',
        // height:windowH,
        // width:windowW * 0.4,
    },
    slider: {
        // paddingHorizontal: indent*.5,
    },
    slide: {
        height:itemH,
        width:itemW+doubleIndent,
        paddingHorizontal:indent,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    image:{
        width: itemW,
        height: itemH,
        position: 'absolute',
        marginLeft: indent,
        borderRadius: 10,
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        textAlign: 'left',
        color: colors.darkMain,
        marginLeft: indent,
        marginBottom: indent,
    },
    itemTitle: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        lineHeight: scale(36),
        textAlign: 'left',
        margin: indent,
        color: colors.white,
        // marginTop: verticalScale(19),
        // marginBottom: verticalScale(13),
        // lineHeight: scale(56),
        // backgroundColor: 'transparent',
        // letterSpacing: 2,
    },
});
export default styles;
