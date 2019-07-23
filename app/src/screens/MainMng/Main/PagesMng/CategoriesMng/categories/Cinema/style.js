import {StyleSheet} from 'react-native';
import s, {colors} from '../../../../../../../styles';
import {scale} from '../../../../../../../utils/resize';

const styles = StyleSheet.create({
    line: {
      height: 1,
        width: '100%',
      backgroundColor: '#000000',
        marginTop: 15,
        marginBottom: 15,
        //margin: 15,
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bgApp,
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
        left: 0
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
        marginLeft: 15,
        marginRight: 15,
        marginTop: -250,
        height: 400,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    filtersHeader: {
        color: '#ff9e18',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12
    },
    filtersCategoryHeader: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 16
    },
    keywordsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginLeft: 15,
        alignSelf: 'flex-start'
    },
    keywordsInput: {
        color: '#ffffff',
        fontSize: 12,
        padding: 0,
        margin: 0
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
        width: '90%',
        height: 58,
        justifyContent: 'center',
        marginTop: 10
    }
});
export default styles;
