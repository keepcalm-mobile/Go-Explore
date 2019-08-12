import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../styles';
export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    bgArea:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor: 'transparent',
    },

    container : {
        width,
        bottom: -height,
        zIndex: 999,
    },
    containerVisible : {
        height: height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        bottom: 0,
    },
    picker: {
        width,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingHorizontal: (width * 1.2077) / 100,
        paddingBottom: (height * 0.6793) / 100,
        position: 'absolute',
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
    // boxItem : {
        // width: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginVertical: (height * 2.038) / 100,
    // },
    textItem : {
        fontSize: fontSizes.description,
        fontFamily: fontNames.regular,
        marginLeft: indent,
    },
    separator : {
        height: 1,
        marginHorizontal: indent * 0.5,
    },
});
export default styles;
