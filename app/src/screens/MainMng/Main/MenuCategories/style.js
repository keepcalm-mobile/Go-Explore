import {StyleSheet} from 'react-native';
import s, {bottomIndent, colors, doubleIndent, fontNames, fontSizes, indent, windowH} from '../../../../styles';
import {scale} from '../../../../utils/resize';

export const btnSize = scale(96);
export const iconSize = scale(44);
export const ellipseSize = scale(76);

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        flex:1,
        width:'100%',
        height:'100%',//(windowH * 0.8),
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
        flex:1,
        // width:'100%',
        // height:'30%',
    },
    bgBlack:{
        width:'100%',
        height: btnSize * 3,//'55%',
        backgroundColor:'#000000',
    },
    btnsArea:{
        // height:'60%',
        justifyContent:'flex-end',
    },
    btnsRow:{
        flex:1,
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
        marginTop: btnSize + indent * 1.5,
    },
    closeBtn:{
        width: '100%',
        height: scale(40),
        alignItems:'center',
        justifyContent:'center',
        marginTop: doubleIndent * 2,
        marginBottom: bottomIndent,
    },
    btn:{
        width: btnSize,
        height: btnSize,
        alignItems:'center',
        justifyContent:'space-between',
    },
    btnTitle:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'center',
        color: colors.white,
        top: 5,
    },
    iconsCnt:{
        marginTop: ellipseSize/2,
        alignItems:'center',
        justifyContent:'center',
    },
    btnIcon:{
        position: 'absolute',
    },
    btnEllipse:{
        position: 'absolute',
        // top:0,//-(iconSize + ellipseSize) * 0.5,
    },
});
export default styles;
