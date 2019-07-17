import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {colors, indent, windowW, startY} from '../../styles';
import Drawer from './Drawer';
import Main from './Main';
import Search from './Search';
import PagesMng from './Main/PagesMng';
import {scale} from '../../utils/resize';
import IconMenu from '../../../assets/topIcons/menuIcon.svg';
import IconSearch from '../../../assets/topIcons/searchIcon.svg';



class MainMng extends React.Component{
    static router = PagesMng.router;

    constructor(props) {
        super(props);
        console.log('________ NAVI MAIN MNG : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex:1, backgroundColor:colors.background}}>
                <Drawer/>
                <Main navigation={navigation}/>
                <Search/>

                <View style={{position:'absolute', width:windowW, justifyContent:'space-between', flexDirection:'row', marginTop:startY+indent * 0.75, marginLeft:indent * 0.75}}>
                    <TouchableOpacity onPress = {this.hide} activeOpacity={0.5} style={{width: scale(30), height: scale(30), alignItems:'center', justifyContent:'center'}}>
                        <IconMenu width={scale(22)}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {this.hide} activeOpacity={0.5} style={{width: scale(30), height: scale(30), alignItems:'center', justifyContent:'center'}}>
                        <IconSearch width={scale(22)}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default MainMng;
