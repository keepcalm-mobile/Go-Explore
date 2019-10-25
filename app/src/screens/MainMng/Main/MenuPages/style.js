import {StyleSheet} from 'react-native';
import s, {bottomIndent, colors, indent} from '../../../../styles';
import {scale} from '../../../../utils/resize';

const sizeBtn = scale(45);

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:sizeBtn + bottomIndent,
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
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:bottomIndent,
    },
});
export default styles;
