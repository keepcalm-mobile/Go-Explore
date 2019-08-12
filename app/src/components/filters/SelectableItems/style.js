import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';
import {scale} from '../../../utils/resize';

const styles = StyleSheet.create({
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        width: '100%',
    },
    keywordsInput: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        color: colors.white,
        textAlign: 'left',
        width: '100%',
        // marginVertical: -indent * 0.5,
    },
});
export default styles;
