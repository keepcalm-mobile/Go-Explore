import {StyleSheet} from "react-native";
import {scale, verticalScale} from "../../utils/resize";
import s, {colors, doubleIndent, fontNames, fontSizes} from "../../styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingLeft: doubleIndent,
        // paddingRight: doubleIndent,
    },
    logo: {
        // position: 'absolute',
        left: '6.29%',
        marginTop: verticalScale(55),
        marginBottom: verticalScale(15.5),
        // top: '6.77%',
    },

    welcome: {
        // position: 'absolute',
        left: '5.6%',
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        lineHeight: 36,
        color: colors.white,
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },

    signIn:{
        fontFamily: 'Poppins-Regular',
        left: '5.6%',
        fontSize: fontSizes.small,
        color: colors.white,
    },

    input:{
        margin:15,
        height:40,
        padding:5,
        fontSize: fontSizes.medium,
        borderBottomWidth:1,
        borderBottomColor:'#ffa83b',
        color: colors.white,
        fontFamily: fontNames.regular,
    },

    forgot: {
        fontFamily: fontNames.regular,
        textAlign: 'right',
        color: colors.white,
        fontSize: fontSizes.medium,
        right: '5.6%',
        // paddingBottom: verticalScale(73),
        marginBottom: verticalScale(73),
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
        padding: scale(12)
    },

    signUp: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: '#EEF6FF',
        fontSize: fontSizes.medium,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: verticalScale(16),
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