import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';
import {scale} from '../../../utils/resize';

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: 'transparent',
        borderColor: '#ff9e18',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: scale(44),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems:'center',
    },
    pickerTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        color: colors.white,
        textAlign: 'left',
        marginLeft: indent,
    },
    pickerArrow: {
        marginRight: indent,
    },
});
export default styles;
