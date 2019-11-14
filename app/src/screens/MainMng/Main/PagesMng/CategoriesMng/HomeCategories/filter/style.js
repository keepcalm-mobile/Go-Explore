import {StyleSheet} from 'react-native';
import s, {colors, indent, fontNames, fontSizes, windowW, doubleIndent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

export const closeIconSize = scale(22);

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
    filtersHeaderCnt: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(10),
        width: '100%',
    },
    emptyHeader: {
        width: closeIconSize + doubleIndent,
        height: closeIconSize + doubleIndent,
    },
    filtersHeader: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        color: colors.darkMain,
        // marginLeft: closeIconSize + doubleIndent,
    },
    closeBtn:{
        alignItems:'center',
        justifyContent:'center',
        width: closeIconSize + doubleIndent,
        height: closeIconSize + doubleIndent,
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
