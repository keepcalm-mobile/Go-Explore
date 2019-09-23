import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/resize';
import {colors, doubleIndent, fontNames, fontSizes, indent} from '../../../styles';

export const size = scale(44);
export const minWidth = scale(90);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // height: itemH,
        // borderColor: colors.border,
        // borderRadius: itemH * 0.5,
        // borderWidth: 1,
        alignItems: 'center',
        // justifyContent:'space-evenly',
        // marginBottom: indent,
    },
    itemTitle: {
      marginBottom: indent,
    },
    itemText: {
        fontSize: fontSizes.description,
        fontFamily: fontNames.regular,
        lineHeight: scale(21),
        textAlign: 'center',
        color: colors.white,
    },
    itemBoldText: {
        fontFamily: fontNames.bold,
    },
    btnsCnt: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        // alignSelf: 'flex-start',
        justifyContent:'space-between',
        marginTop: indent * 0.33,
        marginBottom: indent * 0.66,
    },
    btnsIcon: {
        fontSize: fontSizes.heading,
        fontFamily: fontNames.regular,
        lineHeight: scale(36),
        textAlign: 'center',
        color: colors.border,
        marginTop: scale(2),
        // backgroundColor: '#ffffff80',
    },
    fixMinus: {
        marginLeft: scale(2),
    },
    circle: {
        width: size,
        height: size,
        borderColor: colors.border,
        borderRadius: size * 0.5,
        borderWidth: 1,
        // flexDirection: 'row',
    },
    amount:{
        width: null,
        minWidth: minWidth,
    },
    amountText:{
        marginHorizontal: indent,
    },
    circleBg: {
        width:'100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: size * 0.5,
    },
    line:{
        width: '100%',
        height: 1,
        marginHorizontal: indent,
        marginVertical: doubleIndent,
        flexDirection: 'row',
        backgroundColor: '#121212',
    },
});
export default styles;
