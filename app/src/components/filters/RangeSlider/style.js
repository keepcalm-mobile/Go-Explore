import {StyleSheet} from 'react-native';
import {colors, doubleIndent, fontNames, fontSizes, indent, windowW} from '../../../styles';
import {scale} from '../../../utils/resize';

export const markerSize = scale(20);
const markerBorder = 2;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: scale(60),
    },

    markerBorder: {
        height: markerSize,
        width: markerSize,
        padding: markerBorder,
        borderRadius: markerSize * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker: {
        height: markerSize - markerBorder * 2,
        width: markerSize - markerBorder * 2,
        borderRadius: markerSize * 0.5,
    },
    trackStyle: {
        backgroundColor: colors.white,
        left: -(markerSize * 0.5 - 1),
    },
    selectedStyle: {
        backgroundColor: colors.border,
        marginHorizontal: markerSize * 0.5 - 1,
    },
    sliderCntStyle: {
        marginTop: -markerSize * 0.5,
        marginLeft: markerSize * 0.5,
    },
    labelCnt: {
        width: windowW - doubleIndent * 2 - markerSize,//'100%',
        flexDirection: 'row',
        marginTop: -(markerSize * 0.5),
        marginLeft: markerSize * 0.5,
    },
    labelTxt: {
        color: colors.white,
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        position: 'absolute',
        // textAlign: 'center',
    },
    labelTxtRight: {
        marginRight: -markerSize * 0.5,
        textAlign: 'right',
    },
    labelTxtLeft: {
        marginLeft: -markerSize * 0.5,
        textAlign: 'left',
    },
});
export default styles;
