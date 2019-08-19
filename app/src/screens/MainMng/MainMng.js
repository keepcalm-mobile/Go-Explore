import React from 'react';
import {TouchableOpacity, View, Animated, findNodeHandle, Text} from 'react-native';
import {doubleIndent} from '../../styles';
import s, {iconSize} from './style';
import Drawer from './Drawer';
import Main from './Main';
import Search from './Search';
import PagesMng from './Main/PagesMng';
import IconMenu from '../../../assets/serviceIcons/menuIcon.svg';
import IconSearch from '../../../assets/serviceIcons/searchIcon.svg';
import IconBack from '../../../assets/serviceIcons/backIconMain.svg';
import {getCurrentRoute, getCurrentRouteParams, getCurrentRouteKey} from '../../utils/navHelper';
import {screens} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
// import { BlurView, VibrancyView } from "@react-native-community/blur";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

class MainMng extends React.Component{
    static router = PagesMng.router;

    constructor(props) {
        super(props);

        this.state = {
            animVal: new Animated.Value(1),
            opacity : new Animated.Value(0),
            scrollOffset: props.scrollOffset,
            toHide: false,
            shadowIsHidden: true,
            // main:0,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const curPage = getCurrentRoute(this.props.navigation.state);
        this._drawer.setCurPage(curPage === screens.HotPicks ? getCurrentRoute(this.props.navigation.state, 'params').categoryId : curPage);
    }

    static getDerivedStateFromProps(props, state) {
        let _state = null;
        if (state.scrollOffset !==  props.scrollOffset){
            _state = {...state, scrollOffset:props.scrollOffset};

            let toHide = props.scrollOffset <= state.scrollOffset || props.scrollOffset < 20 ? false : true;
            if (toHide != state.toHide) {
                Animated.spring(state.animVal, { toValue: toHide ? 0 : 1, useNativeDriver: true, friction: 10 }).start();
                _state.toHide = toHide;
            }

            let op = props.scrollOffset >= 100 ? 1 : props.scrollOffset / 100;
            Animated.spring(state.opacity, { toValue: op, useNativeDriver: true, friction: 10 }).start();
        }
        return _state;
    }

    openDrawer = () => {
        this._main.minimize();
        this._drawer.show();
        Animated.spring(this.state.animVal, { toValue: 0, useNativeDriver: true, friction: 10 }).start();
    };

    closeDrawer = () => {
        this._main.maximize();
        this._drawer.hide();
        Animated.spring(this.state.animVal, { toValue: 1, useNativeDriver: true, friction: 10 }).start();
    };

    choicePage = (iId) => {
        this.closeDrawer();
        this._main._openPage(iId, true);
    };

    choiceCategory = (iId) => {
        this.closeDrawer();
        this._main._openCategory(iId);
    };

    onBackPress = () => {
        this.props.navigation.goBack(getCurrentRoute(this.props.navigation.state, 'key'));
    };

    onMainRef = iMain => {
        this._main = iMain;
        // if (!this.state.main){
        //     this.setState({main:findNodeHandle(this._main)});
        // }
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
                <Main navigation={navigation} ref={this.onMainRef}/>
                <Search/>
                <Animated.View style={[animStyle, s.topArea]}>
                    <AnimatedGradient colors={['#000000FF', '#00000000']} start={{ x: 0, y: 0.25 }} end={{ x: 0, y: 1 }} pointerEvents="none" style={[s.shadow, {opacity: this.state.opacity}]} />


                    <TouchableOpacity onPress = {this.onBackPress} activeOpacity={0.5} style={s.touchArea}>
                        <IconBack width={iconSize} height={iconSize}/>
                    </TouchableOpacity>

                    <View style={s.searchArea}>
                        <IconSearch width={iconSize} height={iconSize}/>
                        <Text style={s.searchTitle}>Search</Text>
                    </View>

                    <TouchableOpacity onPress = {this.openDrawer} activeOpacity={0.5} style={s.touchArea}>
                        <IconMenu width={iconSize} height={iconSize}/>
                    </TouchableOpacity>

                </Animated.View>
            </View>
        );
    }
}

export default MainMng;
//{/*<BlurView style={s.searchBg} viewRef={this.state.main} blurType="light" blurAmount={10} />*/}