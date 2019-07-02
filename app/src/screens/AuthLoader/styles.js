import { StyleSheet } from 'react-native';
import s, { fontSizes, fontNames, colors } from '../../styles';
import {scale} from "../../utils/resize";

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center'
    },
    welcome: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        lineHeight: scale(36),
        color: colors.white
    },
});

export default styles;
