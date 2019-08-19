import {StyleSheet} from 'react-native';
import {scale} from '../../utils/resize';
import {colors, doubleIndent, fontNames, fontSizes, indent, startY} from '../../styles';

export const iconSize = scale(22);
const searchHeight = scale(29);

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:colors.bgApp,
    },
    topArea: {
        elevation: 13,
        position:'absolute',
        width:'100%',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:startY,
        alignItems:'center',
    },
    touchArea: {
        width: iconSize + doubleIndent,
        height: iconSize + doubleIndent,
        alignItems:'center',
        justifyContent:'center',
    },
    shadow:{
        width:'100%',
        height:doubleIndent * 1.75 + startY,
        top:-startY,
        position: 'absolute',
    },
    searchArea:{
        width:'50%',
        height:searchHeight,
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'#66666680',
        borderRadius:searchHeight * 0.5,
        borderColor:colors.border,
        borderWidth:1,
        overflow:'hidden',
        flexDirection:'row',
        paddingHorizontal: indent * 0.25,
    },
    searchTitle:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.smallBtn,
        lineHeight: scale(16),
        color: colors.white,
        marginHorizontal: indent * 0.5,
        textAlign:'center',
        width:'100%',
        marginLeft:-iconSize,
    },
    searchBg:{
        width:'100%',
        height:searchHeight,
        position: 'absolute',
        opacity:0.65,
    },
});

export default styles;
