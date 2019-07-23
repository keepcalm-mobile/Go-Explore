import {StyleSheet} from 'react-native';
import s, {colors, bottomIndent, fontNames, fontSizes, windowH, windowW, startY} from '../../../styles';

const styles = StyleSheet.create({
    container:{
        paddingTop: startY,
        position:'absolute',
        height:windowH,
        width:windowW * 0.4,
    },
    subMenu:{
        paddingTop: startY,
        height: windowH + bottomIndent,
        position:'absolute',
        // overflow: 'hidden',
        backgroundColor: colors.bgApp,
        borderColor: colors.shadowColor,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    closeBtn:{
        alignItems:'center',
        justifyContent:'center',
    },
    textBtn:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        textAlign: 'left',
        color: colors.white,
        marginTop: 5,
    },
});
export default styles;
