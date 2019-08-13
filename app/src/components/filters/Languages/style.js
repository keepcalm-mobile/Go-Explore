import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';
import {scale} from '../../../utils/resize';

const height = scale(44);

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: 'transparent',
        borderColor: '#ff9e18',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        minHeight: height,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems:'center',
        paddingHorizontal: indent,
        // paddingVertical: indent * 0.70,
    },
    pickerTitle: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        lineHeight: height,
        color: colors.white,
        textAlign: 'left',
        // marginLeft: indent,
    },
    pickerArrow: {
        // marginRight: indent,
    },
    itemsContainer: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginRight: -indent,
        // paddingRight: -indent,
    },
});
export default styles;
