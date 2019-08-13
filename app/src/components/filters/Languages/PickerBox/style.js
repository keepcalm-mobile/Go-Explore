import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../../styles';
import {scale} from "../../../../utils/resize";

const height = scale(44);

const styles = StyleSheet.create({
    bgArea:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor: 'transparent',
    },
    flat : {
        position: 'absolute',
        backgroundColor: '#000000',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderColor: colors.darkMain,
        borderWidth:1,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    contentFlat : {
        overflow: 'hidden',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
    },
    textItem : {
        fontSize: fontSizes.description,
        fontFamily: fontNames.regular,
        lineHeight: height,
        marginLeft: indent,
    },
    separator : {
        height: 1,
        marginHorizontal: indent * 0.5,
    },
});
export default styles;
