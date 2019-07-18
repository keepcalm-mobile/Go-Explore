import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontNames, fontSizes, windowH, windowW} from '../../../styles';

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height:windowH,
        width:windowW * 0.4,
    },
    subMenu:{
        // flex:1,
        height: '100%',
        position:'absolute',
        overflow: 'hidden',
        backgroundColor: colors.background,
        borderColor: colors.shadowColor,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 6,
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
