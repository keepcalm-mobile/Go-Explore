import {StyleSheet} from 'react-native';
import s, {colors, fontNames, fontSizes} from '../../../../styles';
import {scale} from '../../../../utils/resize';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgApp,
    },
    welcome: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
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
});
export default styles;
