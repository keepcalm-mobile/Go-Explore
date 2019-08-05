import {StyleSheet} from 'react-native';
import s, {colors, indent, fontNames, fontSizes, windowW, doubleIndent} from '../../../../../../../../styles';
import {scale} from '../../../../../../../../utils/resize';

const styles = StyleSheet.create({
    filtersContainer: {
        width: windowW - doubleIndent,
        position: 'absolute',
        backgroundColor: colors.lightSecondary,
        borderRadius: 10,
        flexDirection: 'column',
        marginHorizontal: indent,
        marginVertical: scale(178),
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingBottom: 100,
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
    },
    baseKeywordsView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    // locationPicker: {
    //     alignSelf: 'center',
    //     width: '100%',
    //     height: '100%',
    //     color: '#ffffff',
    //     fontSize: 14,
    // },
    // locationPickerContainer: {
    //     backgroundColor: '#000000',
    //     borderColor: '#ff9e18',
    //     borderWidth: 1,
    //     borderRadius: 10,
    //     width: '100%',
    //     height: 58,
    //     justifyContent: 'center',
    //     marginTop: 10,
    // },
    languagesContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        paddingLeft: 6,
        paddingRight: 6,
        flexWrap: 'wrap',
        borderRadius: 10,
        borderColor: colors.border,
        borderWidth: 1,
        alignItems: 'center',
    },
    dropdownTouchArea: {
        position: 'absolute',
        width: 50,
        height: '100%',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default styles;
