import {StyleSheet} from 'react-native';
import {scale} from '../../utils/resize';
import {doubleIndent, indent} from '../../styles';
const size = scale(44);

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        // width: '100%',
        // height: size,
        justifyContent: 'space-between',
        // paddingHorizontal: indent,
        marginHorizontal: doubleIndent,
        marginTop: doubleIndent,
        // marginBottom: indent * .5,
    },
});
export default styles;
