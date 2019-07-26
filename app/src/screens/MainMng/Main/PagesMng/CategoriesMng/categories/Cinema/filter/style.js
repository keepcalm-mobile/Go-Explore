import {StyleSheet} from 'react-native';
import s, {colors, indent, fontNames, fontSizes, windowW, doubleIndent} from '../../../../../../../../styles';
import {scale} from '../../../../../../../../utils/resize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgApp,
    },
    welcome: {
        fontFamily: fontNames.bold,
        fontSize: scale(24),
        lineHeight: 36,
        color: colors.white,
        // position: 'absolute',
        // left: '5.6%',
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },
    poster: {
        width: '100%',
        top: 0,
        left: 0
    },
    mainScroll: {
        width: '100%',
        height: '100%',
    },
    mainScrollContainer: {

    },
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
        marginBottom: 10,
    },
    filtersCategoryHeader: {
        color: '#ffffff',
        fontSize: fontSizes.small,
        fontFamily: fontNames.bold,
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
    },
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        alignSelf: 'flex-start',
        width: '100%',
        marginLeft: -9,
        marginRight: -9
    },
    keywordsInput: {
        color: '#ffffff',
        fontSize: fontSizes.small,
        padding: 0,
        margin: 0,
        marginBottom: 15,
        marginLeft: indent - 5
    },
    baseKeywordsView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    locationPicker: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        color: '#ffffff',
        fontSize: 14,
    },
    locationPickerContainer: {
        backgroundColor: '#000000',
        borderColor: '#ff9e18',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 58,
        justifyContent: 'center',
        marginTop: 10
    },
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
        alignItems: 'center'
    },
    dropdownTouchArea: {
        position: 'absolute',
        width: 50,
        height: '100%',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default styles;
