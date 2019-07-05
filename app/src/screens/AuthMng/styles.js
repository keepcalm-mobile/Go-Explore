import {StyleSheet} from "react-native";
import {scale, verticalScale} from "../../utils/resize";
import s, {colors, indent, fontNames, fontSizes} from "../../styles";

const styles = StyleSheet.create({
    // container://s.container,
    //     {
    //     flex: 1,
    //     marginLeft: indent,
    //     marginRight: indent,
    // },
    fillAll: s.fillAll,
    logo: {
        // position: 'absolute',
        left: indent,//'6.29%',
        // marginTop: verticalScale(55),
        marginBottom: verticalScale(15.5),
        // top: '6.77%',
    },

    welcome: {
        // position: 'absolute',
        left: indent,//'5.6%',
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        lineHeight: scale(36),
        color: colors.white,
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },

    signIn:{
        fontFamily: fontNames.regular,
        left: indent,//'5.6%',
        fontSize: fontSizes.small,
        color: colors.white,
    },

    input:{
        marginLeft:indent,
        marginRight:indent,
        marginBottom:indent,
        marginTop:(-scale(56)),

        paddingLeft:scale(15),
        paddingRight:scale(15),
        // paddingTop:scale(10),
        height:scale(56),
        fontSize: fontSizes.medium,

        // borderWidth:1,
        // borderColor: colors.border,
        // borderRadius: 10,
        // backgroundColor: '#F1F1F630',
        borderBottomWidth:1,
        borderBottomColor: colors.border,
        color: colors.white,
        fontFamily: fontNames.regular,
    },

    inputBg:{
        marginLeft:indent,
        marginRight:indent,
        height:scale(56),
        borderRadius: 10,
        backgroundColor: '#F1F1F6',
        opacity: 0,
    },

    forgot: {
        fontFamily: fontNames.regular,
        textAlign: 'right',
        color: colors.white,
        fontSize: fontSizes.medium,
        right: indent,//'5.6%',
        // paddingBottom: verticalScale(73),
        // marginBottom: verticalScale(73),
    },

    socialTitle: {
        fontFamily: fontNames.regular,
        textAlign: 'center',
        color: colors.white,
        fontSize: fontSizes.big,
        // paddingBottom: verticalScale(73),
    },

    socialArea: {
        // paddingLeft: '30%',
        // paddingRight: '30%',
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center',//'space-evenly',
    },

    socialBtn: {
        flexDirection:'column',
        margin: scale(12)
    },

    signUp: {
        fontFamily: fontNames.regular,
        textAlign: 'center',
        color: '#EEF6FF',
        fontSize: fontSizes.medium,
    },

    bottom: {
        // flex: 1,
        // justifyContent: 'flex-end',
        marginBottom: indent,
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