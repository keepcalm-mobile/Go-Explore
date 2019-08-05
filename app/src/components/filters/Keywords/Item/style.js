import {StyleSheet} from 'react-native';
import {scale} from '../../../../utils/resize';
import {colors, fontNames, fontSizes, indent} from '../../../../styles';

const size = scale(30);
const border = 1.5;//scale(2);

const styles = StyleSheet.create({
    cntBorder: {
        height: size,
        padding: border,
        borderRadius: 5,
        marginRight: indent,
        marginBottom: indent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex:1,
        flexDirection: 'row',
        borderRadius: 3.5,
        alignItems: 'center',
    },
    title: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.smallTitle,
        textAlign: 'left',
        lineHeight: scale(15),
        color: colors.white,
        marginLeft: scale(8),
    },
    touchableArea: {
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {

    },
});
export default styles;
