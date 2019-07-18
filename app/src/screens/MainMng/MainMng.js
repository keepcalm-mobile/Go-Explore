import React from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import {colors, indent, windowW, startY, doubleIndent} from '../../styles';
import Drawer from './Drawer';
import Main from './Main';
import Search from './Search';
import PagesMng from './Main/PagesMng';
import {scale} from '../../utils/resize';
import IconMenu from '../../../assets/topIcons/menuIcon.svg';
import IconSearch from '../../../assets/topIcons/searchIcon.svg';

const iconSize = scale(22);

class MainMng extends React.Component{
    static router = PagesMng.router;

    constructor(props) {
        super(props);

        this.state = {
            animVal: new Animated.Value(1),
        };
    }

    openDrawer = () => {
        this._main.minimize();
        this._drawer.show();
        Animated.spring(this.state.animVal, { toValue: 0, useNativeDriver: true }).start();
    };

    closeDrawer = () => {
        this._main.maximize();
        this._drawer.hide();
        Animated.spring(this.state.animVal, { toValue: 1, useNativeDriver: true }).start();
    };

    choiceCategory = () => {

    };

    render() {
        const { navigation } = this.props;
        const { animVal } = this.state;
        const animStyle = {opacity: animVal,
            translateY : animVal.interpolate({ inputRange: [0, 1], outputRange: [-(iconSize + doubleIndent), 0] }),
        };

        return (
            <View style={{flex:1, backgroundColor:colors.background}}>
                <Drawer ref={c => this._drawer = c} close={this.closeDrawer} onButtonPress={this.choiceCategory}/>
                <Main navigation={navigation} ref={c => this._main = c}/>
                <Search/>

                <Animated.View style={[animStyle, { elevation: 13, position:'absolute', width:'100%', justifyContent:'space-between', flexDirection:'row', marginTop:startY }]}>
                    <TouchableOpacity onPress = {this.openDrawer} activeOpacity={0.5} style={{width: iconSize + doubleIndent, height: iconSize + doubleIndent, alignItems:'center', justifyContent:'center'}}>
                        <IconMenu width={iconSize}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {this.hide} activeOpacity={0.5} style={{ width: iconSize + doubleIndent, height: iconSize + doubleIndent, alignItems:'center', justifyContent:'center' }}>
                        <IconSearch width={iconSize}/>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

export default MainMng;
