import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, indent, windowH, windowW} from '../../../../styles';
import {scale} from '../../../../utils/resize';

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        backgroundColor:colors.mapAreBg,
        width:windowW - doubleIndent,
        height:windowH,
        borderRadius:10,
        marginLeft:indent,
        marginTop:windowH - 75,
        overflow: 'hidden',
    },
    mapView:{
        flex:1,
    },
    dragArea:{
        zIndex:1,
        position:'absolute',
        width:'100%',
        height:scale(35),
    },
    dragIcon:{
        width:50,
        height:7,
        backgroundColor:colors.bgCategory,
        borderRadius:5,
        alignSelf:'center',
        marginTop:12,
    },
});
export default styles;
