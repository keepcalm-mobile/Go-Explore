import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {Props} from 'react-native/Libraries/Components/View/View';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {colors, doubleIndent, indent, bottomIndent} from '../../../../styles';
import {scale} from '../../../../utils/resize';
import s from './style';
import {screens} from '../../../../constants';


const button = (Icon, onPress, iId) => {
    return (
        <TouchableOpacity onPress = {() => onPress(iId)} activeOpacity={0.5} style={{width: scale(35), height: scale(35), alignItems:'center', justifyContent:'center'}}>
            <Icon height={scale(26)}/>
        </TouchableOpacity>
    );
};


class MenuBottom extends React.Component<Props> {
    static propTypes = {
        onButtonPress: PropTypes.func.isRequired,
        // onPress: PropTypes.func.isRequired,
        // onLayout: PropTypes.func,
        // icon: PropTypes.object,
    };

    state = {
        [screens.Notifications]:screens.AppPages[screens.Notifications].iconG,
        [screens.Calendar]:screens.AppPages[screens.Calendar].iconG,
        [screens.DataPages]:screens.AppPages[screens.DataPages].iconC,
        [screens.Bookmarks]:screens.AppPages[screens.Bookmarks].iconG,
        [screens.VirtualReality]:screens.AppPages[screens.VirtualReality].iconG,
        prevPage:screens.DataPages,
    };


    constructor(props) {
        super(props);
        console.log('>>>>>>>BUTTON ' + JSON.stringify(props));
    }


    changeIcon = (iId) => {
        console.log('>>>>>>>CHANGE ICON');
        if (this.state.prevPage !== iId){
            this.setState({[this.state.prevPage]:screens.AppPages[this.state.prevPage].iconG, [iId]:screens.AppPages[iId].iconC, prevPage:iId});
        }
    };

    render = () => {
        const { onButtonPress } = this.props;
        return (
            <View style={{width:'100%', height:scale(45)+bottomIndent, backgroundColor:'#1D1D1D'}}>
                <LinearGradient colors={['#00000000', '#00000050']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} pointerEvents="none" style={{width:'100%', height:indent*.5, marginTop: -indent*.5}} />
                <View  style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
                    {button(this.state[screens.Notifications], onButtonPress, screens.Notifications)}
                    {button(this.state[screens.Calendar], onButtonPress, screens.Calendar)}
                    {button(this.state[screens.DataPages], onButtonPress, screens.DataPages)}
                    {button(this.state[screens.Bookmarks], onButtonPress, screens.Bookmarks)}
                    {button(this.state[screens.VirtualReality], onButtonPress, screens.VirtualReality)}
                </View>
            </View>
        );
    }
}

export default MenuBottom;
