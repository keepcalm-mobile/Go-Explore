import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';

const styles = StyleSheet.create({
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        width: '100%',
        marginVertical: -indent * 0.5,
    },
});
export default styles;
