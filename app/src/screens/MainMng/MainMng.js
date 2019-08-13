import React from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import {colors, indent, windowW, startY, doubleIndent} from '../../styles';
import s, {iconSize} from './style';
import Drawer from './Drawer';
import Main from './Main';
import Search from './Search';
import PagesMng from './Main/PagesMng';
import IconMenu from '../../../assets/serviceIcons/menuIcon.svg';
import IconSearch from '../../../assets/serviceIcons/searchIcon.svg';
import {getCurrentRoute, getCurrentRouteParams} from '../../utils/navHelper';
import {screens} from '../../constants';



class MainMng extends React.Component{
    static router = PagesMng.router;

    constructor(props) {
        super(props);

        this.state = {
            animVal: new Animated.Value(1),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const curPage = getCurrentRoute(this.props.navigation.state);
        this._drawer.setCurPage(curPage === screens.HotPicks ? getCurrentRouteParams(this.props.navigation.state).categoryId : curPage);
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

    choicePage = (iId) => {
        this.closeDrawer();
        this._main._openPage(iId, true);
    };

    choiceCategory = (iId) => {
        this.closeDrawer();
        this._main._openCategory(iId);
    };


    render() {
        const { navigation } = this.props;
        const { animVal } = this.state;
        const rotate = '0deg';
        const scale = 1;
        const translateX = 0;
        const translateY = animVal.interpolate({ inputRange: [0, 1], outputRange: [-(iconSize + doubleIndent), 0] });

        const animStyle = {opacity: animVal,
            transform: [{translateX}, {translateY}, {rotate}, {scale}],
            // translateY : animVal.interpolate({ inputRange: [0, 1], outputRange: [-(iconSize + doubleIndent), 0] }),
        };

        return (
            <View style={s.container}>
                <Drawer ref={c => this._drawer = c} close={this.closeDrawer} onChoicePage={this.choicePage} onChoiceCategory={this.choiceCategory}/>
                <Main navigation={navigation} ref={c => this._main = c}/>
                <Search/>

                <Animated.View style={[animStyle, s.topArea]}>
                    <TouchableOpacity onPress = {this.openDrawer} activeOpacity={0.5} style={s.touchArea}>
                        <IconMenu width={iconSize}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {this.hide} activeOpacity={0.5} style={s.touchArea}>
                        <IconSearch width={iconSize}/>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

export default MainMng;
