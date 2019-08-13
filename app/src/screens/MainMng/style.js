import {StyleSheet} from 'react-native';
import {scale} from '../../utils/resize';
import {colors, doubleIndent, startY} from '../../styles';

export const iconSize = scale(22);

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
    },
    touchArea: {
        width: iconSize + doubleIndent,
        height: iconSize + doubleIndent,
        alignItems:'center',
        justifyContent:'center',
    },
});

export default styles;
