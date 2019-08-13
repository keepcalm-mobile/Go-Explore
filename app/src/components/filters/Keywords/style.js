import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';
import {scale} from '../../../utils/resize';

const styles = StyleSheet.create({
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        width: '100%',
        marginVertical: -indent * 0.5,
    },
    keywordsInput: {
        // backgroundColor: '#ff0000',
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        lineHeight: scale(27),
        color: colors.white,
        textAlign: 'left',
        width: '100%',
        // marginBottom: -indent,
    },
});
export default styles;
