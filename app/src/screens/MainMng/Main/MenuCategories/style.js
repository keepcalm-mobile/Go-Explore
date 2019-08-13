import {StyleSheet} from 'react-native';
import s, {colors, fontNames, fontSizes, windowH} from '../../../../styles';
import {scale} from '../../../../utils/resize';

export const btnSize = scale(96);
export const iconSize = scale(44);
export const ellipseSize = scale(76);

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        flex:1,
        width:'100%',
        height:(windowH * 0.8),
        justifyContent:'flex-end',
        alignContent:'flex-end',
        flexDirection:'column',
    },
    containerBg:{
        position:'absolute',
        width:'100%',
        height:'100%',
    },
    bgGradient:{
        width:'100%',
        height:'30%',
    },
    bgBlack:{
        width:'100%',
        height:'72%',
        backgroundColor:'#000000',
    },
    btnsArea:{
        height:'80%',
    },
    btnsRow:{
        flex:1,
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
    },
    closeBtn:{
        width: '100%',
        height: scale(40),
        alignItems:'center',
        justifyContent:'center',
    },
    btn:{
        width: btnSize,
        height: btnSize,
        alignItems:'center',
        justifyContent:'center',
    },
    btnTitle:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'center',
        color: colors.white,
        marginTop: 5,
    },
    btnEllipse:{
        marginTop:-(iconSize + ellipseSize) * 0.5,
    },
});
export default styles;
