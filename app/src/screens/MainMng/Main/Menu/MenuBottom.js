import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../styles';
import {scale} from '../../../../utils/resize';
import s from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';
import PropTypes from 'prop-types';

import IconNotifGray from '../../../../../assets/bottomIcons/iconNotifGray.svg';
import IconCalendarGray from '../../../../../assets/bottomIcons/iconCalendarGray.svg';
import IconMainGray from '../../../../../assets/bottomIcons/iconMainGray.svg';
import IconMainColor from '../../../../../assets/bottomIcons/iconMainColor.svg';
import IconBookmarkGray from '../../../../../assets/bottomIcons/iconBookmarkGray.svg';
import IconArGray from '../../../../../assets/bottomIcons/iconArGray.svg';



// const MenuBottom = () => (
//     <View style={{width:'100%', height:scale(45), backgroundColor:'#FFFF00'}}>
//         {/*<Text style={[s.welcome, {color:'#000000'}]}>CategoriesMng coming soon</Text>*/}
//         {button(IconMainColor)}
//         {/*<TouchableOpacity activeOpacity={0.5}>*/}
//         {/*    <IconMainColor/>*/}
//         {/*</TouchableOpacity>*/}
//     </View>
// );
const button = (IconG, onPress = null) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{width: scale(28), height: scale(24), alignItems:'center'}}>
            <IconG/>
        </TouchableOpacity>
    );
};


class MenuBottom extends React.Component<Props> {
    static propTypes = {
        openPanel: PropTypes.func.isRequired,
        // onPress: PropTypes.func.isRequired,
        // onLayout: PropTypes.func,
        // icon: PropTypes.object,
    };

    constructor(props) {
        super(props);
        console.log('>>>>>>>BUTTON ' + JSON.stringify(props));
    }


    render = () => {
        const { openPanel } = this.props;
        return (
            <View style={{width:'100%', height:scale(45), backgroundColor:'#1D1D1D', justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
                {button(IconNotifGray)}
                {button(IconCalendarGray)}
                {button(IconMainColor, openPanel)}
                {button(IconBookmarkGray)}
                {button(IconArGray)}
            </View>
        );
    }
}

export default MenuBottom;

// class MenuBottom extends React.Component<Props> {
//     state = {
//
//     };
//
//     constructor(props) {
//         super(props);
//     }
// //
//     render() {
//         return (
//             <View style={[{width:'100%', height:scale(45), backgroundColor:'#FFFFFF'}]}>
//                 <Text style={[s.welcome, {color:'#000000'}]}>CategoriesMng coming soon</Text>
//             </View>
//         );
//     }
// }
//
// export default MenuBottom;
