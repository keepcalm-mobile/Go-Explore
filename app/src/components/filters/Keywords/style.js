import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../styles';
import {scale} from '../../../utils/resize';

const styles = StyleSheet.create({
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: indent,
        alignSelf: 'flex-start',
        width: '100%',
        // marginLeft: -9,
        // marginRight: -9,
    },
    keywordsInput: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        color: colors.white,
        textAlign: 'left',
        width: '100%',
        marginVertical: -indent * 0.5,
        // padding: 0,
        // margin: 0,
        // marginBottom: indent,
        // marginLeft: indent - 5,
    },
});
export default styles;
