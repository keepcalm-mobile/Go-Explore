import {Dimensions, StyleSheet} from 'react-native';
import {scale} from '../../../utils/resize';
export const {width, height} = Dimensions.get('window');
const size = scale(44);

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: size,
        justifyContent: 'space-between',
    },
});
export default styles;
