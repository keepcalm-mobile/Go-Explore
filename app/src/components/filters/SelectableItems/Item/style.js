import {StyleSheet} from 'react-native';
import {scale} from '../../../../utils/resize';
import {colors, fontNames, fontSizes, indent} from '../../../../styles';

const size = scale(34);
const border = 1.5;//scale(2);

const styles = StyleSheet.create({
    touchableArea: {
        // width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: indent,
        marginBottom: indent,
    },
    cntBorder: {
        flex:1,
        padding: border,
        borderRadius: 5,
    },
    container: {
        flex:1,
        // flexDirection: 'row',
        borderRadius: 3.5,
        justifyContent: 'center',
        alignItems: 'center',
        // alignItems: 'center',
    },
    containerActive: {
        flex:1,
        borderRadius: 5,
        padding: border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.description,
        textAlign: 'left',
        lineHeight: scale(21),
        color: colors.white,
        marginHorizontal: scale(8),
    },
    titleActive: {
        // fontFamily: fontNames.bold,
        color: colors.blackText,
    },
});
export default styles;
