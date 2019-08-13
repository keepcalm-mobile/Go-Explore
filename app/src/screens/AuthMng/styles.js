import {StyleSheet} from "react-native";
import {scale, verticalScale} from "../../utils/resize";
import s, {colors, indent, fontNames, fontSizes} from "../../styles";

const inputHeight = scale(56);

const styles = StyleSheet.create({
    container: {
        ...s.fillAll,
        backgroundColor: colors.bgCategory,
    },
    scrollCnt:{
        justifyContent:'space-between',
        flexDirection:'column',
    },
    logo: {
        left: indent,
        marginBottom: verticalScale(15.5),
    },

    welcome: {
        left: indent,//'5.6%',
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        lineHeight: scale(36),
        color: colors.white,
    },

    subTitle:{
        fontFamily: fontNames.regular,
        left: indent,//'5.6%',
        fontSize: fontSizes.small,
        color: colors.white,
    },

    input:{
        marginHorizontal:indent,
        marginBottom:indent,
        marginTop:(-scale(54)),
        paddingHorizontal:indent,
        height:inputHeight,
        fontSize: fontSizes.medium,
        borderBottomWidth:1,
        borderBottomColor: colors.border,
        color: colors.white,
        fontFamily: fontNames.regular,
    },

    inputBg:{
        marginLeft:indent,
        marginRight:indent,
        height:inputHeight,
        borderRadius: 10,
        backgroundColor: colors.inputBg,
        opacity: 0,
    },

    forgot: {
        fontFamily: fontNames.regular,
        textAlign: 'right',
        color: colors.white,
        fontSize: fontSizes.medium,
        right: indent,
    },

    socialTitle: {
        fontFamily: fontNames.regular,
        textAlign: 'center',
        color: colors.white,
        fontSize: fontSizes.big,
    },

    socialArea: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center',
    },

    socialBtn: {
        flexDirection:'column',
        margin: scale(12),
    },

    signUp: {
        fontFamily: fontNames.regular,
        textAlign: 'center',
        color: '#EEF6FF',
        fontSize: fontSizes.medium,
    },

    bottom: {
        marginBottom: indent,
    },

    terms: {
        marginLeft:indent,
        marginRight:indent,
        fontFamily: fontNames.regular,
        color: colors.secondaryText,
        fontSize: fontSizes.medium,
    },


    // container2: {
    //     backgroundColor:'green',
    //     flex: 1,
    // },
    // child: {
    //     flex: 1,
    //     backgroundColor: 'blue',
    //     transform: [
    //         { perspective: 850 },
    //         { translateX: - Dimensions.get('window').width * 0.24 },
    //         { rotateY: '60deg'},
    //
    //     ],
    // }
});

export default styles;