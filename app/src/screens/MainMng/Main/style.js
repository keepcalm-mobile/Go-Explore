import {StyleSheet} from 'react-native';
import s, {colors} from '../../../styles';

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderRadius: 20,
        backgroundColor: colors.bgCategory,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    containerOverflow:{
        width:'100%',
        height:'100%',
        overflow: 'hidden',
    },
});
export default styles;
