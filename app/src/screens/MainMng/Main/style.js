import {StyleSheet} from 'react-native';
import s, {colors} from '../../../styles';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background,
        overflow: 'hidden',
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
});
export default styles;
