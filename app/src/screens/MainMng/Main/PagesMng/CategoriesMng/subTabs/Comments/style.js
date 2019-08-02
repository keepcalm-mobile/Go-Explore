import {StyleSheet} from 'react-native';
import {colors, fontNames, fontSizes, indent} from '../../../../../../../styles';
import {scale, verticalScale} from '../../../../../../../utils/resize';

export const avatarSize = scale(44);

const styles = StyleSheet.create({
    tabCnt: {
        paddingVertical: indent,
    },
    commentItem:{
        marginHorizontal: indent,
        marginBottom: indent * 1.3,
    },
    commentItemTop:{
        flexDirection:'row',
        marginBottom: indent,
    },
    commentImage:{
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize * 0.5,
    },
    commentName:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.small,
        textAlign: 'left',
        lineHeight: scale(18),
        color: colors.white,
        marginLeft: indent,
        marginBottom: indent * 0.5,
    },
    commentDate:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'right',
        lineHeight: scale(18),
        color: colors.secondaryText,
        flex:1,
    },
    commentText:{
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'left',
        lineHeight: scale(21),
        color: colors.white,
    },
    separator: {
        marginBottom:indent * 1.3,
    },
    blackButtonTitle:{
        fontSize: fontSizes.medium,
        marginTop: verticalScale(19),
        marginBottom: verticalScale(13),
        // lineHeight: scale(56),
        color: colors.white,
        backgroundColor: 'transparent',
        letterSpacing: 2,
    },
    inputArea:{
        margin: indent,
        marginTop: indent * 1.66,
    },
    inputTextCnt:{
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        borderColor: colors.darkMain,
        borderWidth: 1,
        paddingHorizontal: indent * 0.5,
        marginBottom: indent * 1.66,
    },
    inputText:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.small,
        textAlign: 'left',
        lineHeight: scale(18),
        color: colors.white,
        // backgroundColor: '#ffff00',
        flex:1,
        textAlignVertical: 'top',
    },
});
export default styles;
