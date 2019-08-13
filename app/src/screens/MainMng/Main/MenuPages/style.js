import {StyleSheet} from 'react-native';
import s, {bottomIndent, colors, indent} from '../../../../styles';
import {scale} from '../../../../utils/resize';

const sizeBtn = scale(35);

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:scale(45) + bottomIndent,
        backgroundColor:colors.menuBg,
    },
    shadow:{
        width:'100%',
        height:indent * 0.5,
        marginTop: -indent * 0.5,
    },
    btnsArea:{
        flex:1,
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
    },
    btn:{
        width: sizeBtn,
        height: sizeBtn,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:bottomIndent,
    },
});
export default styles;
