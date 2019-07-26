import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontSizes, indent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.bgCategory,
        paddingBottom: doubleIndent,
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
        marginHorizontal: indent*.5,
        // position: 'absolute',
        // left: '5.6%',
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },
    separator: {
        marginBottom:indent,
    },
});
export default styles;
