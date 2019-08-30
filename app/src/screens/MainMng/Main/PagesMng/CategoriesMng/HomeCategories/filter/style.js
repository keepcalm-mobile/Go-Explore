import {StyleSheet} from 'react-native';
import s, {colors, indent, fontNames, fontSizes, windowW, doubleIndent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

const styles = StyleSheet.create({
    filtersContainer: {
        width: windowW - doubleIndent,
        // position: 'absolute',
        backgroundColor: colors.lightSecondary,
        borderRadius: 10,
        flexDirection: 'column',
        marginHorizontal: indent,
        // marginVertical: scale(178),
        marginTop: -180,
        marginBottom: doubleIndent,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: indent,
    },
    filtersHeader: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        color: colors.darkMain,
        marginBottom: scale(10),
    },
    filtersCategoryHeader: {
        color: '#ffffff',
        fontSize: fontSizes.small,
        fontFamily: fontNames.bold,
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
        marginBottom: indent,
    },
    applyBtn: {
        width:'100%',
        marginTop: doubleIndent,
    },
});
export default styles;
