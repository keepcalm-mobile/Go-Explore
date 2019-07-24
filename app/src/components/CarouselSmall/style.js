import {StyleSheet} from 'react-native';
import s, { colors, bottomIndent, fontNames, fontSizes, windowH, windowW, startY, indent, doubleIndent, } from '../../styles';
import {scale, verticalScale} from '../../utils/resize';

export const itemW = scale(126);
export const itemH = scale(180);

const styles = StyleSheet.create({
    container: {
        marginBottom: indent,
        // width:windowW,
        // marginTop: indent,
        // justifyContent: 'flex-end',
        // alignItems:'flex-end',
        // position:'absolute',
        // height:windowH,
        // width:windowW * 0.4,
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        textAlign: 'left',
        color: colors.darkMain,
        marginLeft: indent,
        marginBottom: indent,
    },
    separator: {
        marginBottom:indent,
    },
    slider: {
        paddingHorizontal: indent*.5,
    },
    slide: {
        marginHorizontal: indent*.5,
        // height:itemH,
        // width:itemW+doubleIndent,
        // paddingHorizontal:indent,
        // paddingLeft:indent,
        // justifyContent: 'flex-end',
        // backgroundColor: 'transparent',
    },
    image:{
        width: itemW,
        height: itemH,
        borderRadius: 10,
        marginBottom: indent/2,
    },
    itemTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        lineHeight: scale(18),
        textAlign: 'center',
        // margin: indent,
        color: colors.white,
        // marginTop: verticalScale(19),
        // marginBottom: verticalScale(13),
        // lineHeight: scale(56),
        // backgroundColor: 'transparent',
        // letterSpacing: 2,
    },
});
export default styles;
