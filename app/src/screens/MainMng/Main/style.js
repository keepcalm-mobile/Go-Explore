import {StyleSheet} from 'react-native';
import s, {colors} from '../../../styles';

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderRadius: 20,
        backgroundColor: colors.bgApp,
        // overflow: 'hidden',
        // borderColor: colors.shadowColor,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
});
export default styles;
