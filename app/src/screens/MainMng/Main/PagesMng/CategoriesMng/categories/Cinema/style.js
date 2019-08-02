import {StyleSheet} from 'react-native';
import s, {colors, doubleIndent, fontNames, fontSizes, indent, windowW, headerH} from '../../../../../../../styles';
import {scale, verticalScale} from '../../../../../../../utils/resize';

export const cinemaItemW = scale(242);
export const cinemaItemH = scale(348);
export const avatarSize = scale(44);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.bgCategory,
        paddingBottom: doubleIndent,
    },
    header: {
        height:headerH,
        width:'100%',
        justifyContent: 'flex-end',
        // alignItems:'flex-end',
        backgroundColor: 'transparent',
        marginBottom:indent,
    },
    image:{
        width: windowW,
        height: headerH,
        position: 'absolute',
    },
    linearGradient: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        marginTop: '50%',
    },

    titleCnt: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:indent,
    },
    title: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
    },
    rightBtn: {
        width: scale(40),
        height: scale(40),
        alignItems:'center',
        justifyContent:'center',
        marginRight:indent,
    },

    ratingCnt:{
        flexDirection:'row',
        marginBottom:indent,
    },
    ratingInfo: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'left',
        marginLeft: indent,
        color: colors.white,
    },

    tagsCnt: {
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:indent,
        marginHorizontal: indent,
    },
    tagCnt: {
        justifyContent:'center',
        borderWidth:1,
        borderRadius:20,
        borderColor:colors.darkMain,
        marginRight: indent * 0.67,
        marginBottom: indent * 0.5,
    },
    tagTxt: {
        fontFamily: fontNames.regular,
        fontSize: fontSizes.small,
        textAlign: 'center',
        lineHeight: scale(18),
        color: colors.white,
        marginHorizontal: indent * 0.5,
        marginVertical: indent * 0.25,
    },

    tabLabel: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.small,
        textAlign: 'center',
        lineHeight: scale(18),
        color: colors.white,
        margin:0,
        // marginHorizontal: indent * 0.5,
        // marginVertical: indent * 0.25,
    },
    tabCnt: {
        // flex:1,
        backgroundColor: 'transparent',
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

    cinemaTitle:{
        fontFamily: fontNames.bold,
        fontSize: fontSizes.big,
        textAlign: 'left',
        lineHeight: scale(27),
        color: colors.white,
        marginLeft: indent,
        marginBottom: indent,
    },
    cinemaSlider:{

    },
    cinemaSlide:{
        marginHorizontal: indent,
    },
    cinemaItemImage:{
        width: cinemaItemW,
        height: cinemaItemH,
        borderRadius: 10,
        marginBottom: indent/2,
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




    welcome: {
        fontFamily: 'Poppins-Bold',
        fontSize: scale(24),
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
    poster: {
        width: '100%',
        top: 0,
        left: 0,
    },
    mainScroll: {
        width: '100%',
        height: '100%',
    },
    mainScrollContainer: {

    },
    filtersContainer: {
        backgroundColor: '#3A3A3A',
        borderRadius: 10,
        flexDirection: 'column',
        marginLeft: indent,
        marginRight: indent,
        marginTop: -250,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 100,
        paddingLeft: indent,
        paddingRight: indent,
    },
    filtersHeader: {
        color: '#ff9e18',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 10,
    },
    filtersCategoryHeader: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignSelf: 'flex-start',
    },
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        alignSelf: 'flex-start',
        width: '100%',
        marginLeft: -9,
        marginRight: -9,
    },
    keywordsInput: {
        color: '#ffffff',
        fontSize: 12,
        padding: 0,
        margin: 0,
        marginBottom: 15,
        marginLeft: indent - 5,
    },
    baseKeywordsView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    locationPicker: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        color: '#ffffff',
        fontSize: 14,
    },
    locationPickerContainer: {
        backgroundColor: '#000000',
        borderColor: '#ff9e18',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 58,
        justifyContent: 'center',
        marginTop: 10,
    },
    languagesContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        paddingLeft: 6,
        paddingRight: 6,
        flexWrap: 'wrap',
        borderRadius: 10,
        borderColor: colors.border,
        borderWidth: 1,
        alignItems: 'center',
    },
    dropdownTouchArea: {
        position: 'absolute',
        width: 50,
        height: '100%',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default styles;
