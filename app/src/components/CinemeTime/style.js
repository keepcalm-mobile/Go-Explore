import {StyleSheet} from 'react-native';
import {scale} from '../../utils/resize';
import {doubleIndent, indent, windowW} from '../../styles';
import {itemW} from './Item/style';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        marginHorizontal: indent,
        marginBottom: doubleIndent,
        // justifyContent:'space-between',
    },
    separator: {
        marginRight: ((windowW - doubleIndent) - itemW * 3) / 2,
    },
});
export default styles;
