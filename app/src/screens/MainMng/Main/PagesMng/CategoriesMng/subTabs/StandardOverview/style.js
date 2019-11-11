import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

const styles = StyleSheet.create({
    tabCnt: {
        paddingVertical: indent,
    },
    overviewDesc: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        textAlign: 'left',
        lineHeight: scale(21),
        color: colors.white,
        marginBottom:indent,
        marginHorizontal:indent,
    },
    overviewInfoCnt:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:indent,
        marginHorizontal:indent,
    },
    overviewInfoItem:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginRight: indent,
    },
    overviewInfoTitle:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.small,
        textAlign: 'left',
        lineHeight: scale(18),
        color: colors.white,
    },
    overviewInfoSubtitle:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'left',
        lineHeight: scale(18),
        color: colors.secondaryText,
    },
    directionBtnText: {
        fontSize: fontSizes.medium,
        paddingVertical: indent * 0.5,
        top: scale(2),
    },
});
export default styles;
