import React, {forwardRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import MenuPages from './MenuPages';
import Map from './Map';
import PagesMng from './PagesMng';
import {getCurrentRoute} from '../../../utils/navHelper';
import {screens} from '../../../constants';
import MenuCategories from './MenuCategories';
import s from './style';
import {windowH, windowW} from '../../../styles';

import EventsBridge from '../../../utils/EventsBridge';

const mainX = Math.round(windowW * 0.45);
const mainY = Math.round(windowH * 0.01);

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
            cntEnable: 'auto',
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const prevRouteName = getCurrentRoute(prevProps.navigation.state);
        const newRouteName = getCurrentRoute(this.props.navigation.state);

        this._bottom.changeIcon(newRouteName);

        if (newRouteName === screens.VirtualReality) {
            this._map.showMap(false);

            if (EventsBridge.arComponent != null) {
                // EventsBridge.arComponent.exitNavigation();
                EventsBridge.arComponent.startAR();
            }
        } else if (prevRouteName === screens.VirtualReality) {
            this._map.showMap(true);
            if (EventsBridge.arComponent != null)
                EventsBridge.arComponent.reset();

            if (EventsBridge.arScene != null)
                EventsBridge.arScene.reset();
        }
    }

    minimize = () => {
        this.state.scale.flattenOffset();
        this.state.pan.flattenOffset();
        Animated.parallel([
            Animated.spring(this.state.scale, {
                toValue: 0.8,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.spring(this.state.pan, {
                toValue: { x: mainX, y: mainY },
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        this.setState({cntEnable: 'none'});
    };

    maximize = () => {
        this.state.scale.flattenOffset();
        this.state.pan.flattenOffset();
        Animated.parallel([
            Animated.spring(this.state.scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.spring(this.state.pan, {
                toValue: { x: 0, y: 0 },
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        this.setState({cntEnable: 'auto'});
    };

    setTransformOffset = (iValue) => {
        if (iValue > 0){
            iValue = 0;
        } else if (iValue < -mainX){
            iValue = -mainX;
        }
        let offset = (Math.abs(mainX + iValue) / mainX) - 1;

        this.state.scale.setOffset(-0.2 * offset);
        this.state.pan.setOffset({x: iValue, y: mainY * offset});

        return offset;
    };

    openPage = (iTabId, iJump = false) => {
        console.log('OPEN PAGE!! : ' + iTabId);
        if (iTabId === screens.DataPages && !iJump){
            this._panel.show();
        } else {
            this.props.navigation.navigate(iTabId);
            this._bottom.changeIcon(iTabId);
        }

        this._map.hide();
    };

    openCategory = (iCategoryId) => {
        console.log('MAIN - OPEN CATEGORY!! : ' + iCategoryId);
        this.hideAllPanels();
        this.props.navigation.navigate({routeName:screens.HotPicks, key: screens.DataPages + iCategoryId + 'Key', params:{categoryId:iCategoryId}});
        this._bottom.changeIcon(screens.DataPages);
    };

    hideAllPanels = () => {
        this._map.hide();
        this._panel.hide();
    };

    render() {
        const panHandlers = this.state.cntEnable === 'auto' ? null : this.props.panHandlers;
        const navigation = this.props.navigation;
        const { pan, scale } = this.state;
        const [translateX, translateY] = [pan.x, pan.y];
        const rotate = '0deg';
        const transformStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
        const animStyle = {borderRadius : scale.interpolate({ inputRange: [0.8, 1], outputRange: [20, 0] })};

        return (
            <Animated.View {...panHandlers} style={[s.container, transformStyle]} removeClippedSubviews={true} >
                <Animated.View style={[s.containerOverflow, animStyle]} pointerEvents={this.state.cntEnable} >
                    <PagesMng ref={c => this._pagesMng = c} navigation={navigation}/>
                    <Map ref={c => this._map = c}/>
                    <MenuPages ref={c => this._bottom = c} onButtonPress={this.openPage}/>
                    <MenuCategories ref={c => this._panel = c} onButtonPress={this.openCategory}/>
                </Animated.View>
            </Animated.View>
        );
    }
}

export default Main;

