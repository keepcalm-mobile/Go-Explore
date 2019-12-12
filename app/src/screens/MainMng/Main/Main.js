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

        console.log('--componentDidUpdate');

        const prevRouteName = getCurrentRoute(prevProps.navigation.state);
        const newRouteName = getCurrentRoute(this.props.navigation.state);

        this._bottom.changeIcon(newRouteName);

        if (newRouteName === screens.VirtualReality) {
            this._map.showMap(false);

            if (EventsBridge.arComponent != null) {
                // EventsBridge.arComponent.exitNavigation();

                if (EventsBridge.isARPaused === false) {
                    EventsBridge.arComponent.initAR();
                } else {
                    EventsBridge.arComponent.reset();
                }
            }
        } else if (prevRouteName === screens.VirtualReality) {
            this._map.showMap(true);
            // EventsBridge.updateLocation(EventsBridge.currentLocation);

            // setTimeout(() => {
                // console.log('UPDATING GPS-----> ' + JSON.stringify(EventsBridge.currentLocation));
                // EventsBridge.getCurrentPosition();

                // if (EventsBridge.mapRef) {
                //     EventsBridge.mapRef.setLocation(EventsBridge.currentLocation);
                // }

            // }, 2000);
        }
    }

    minimize = () => {

        console.log('--MINIMIZE');

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

        EventsBridge.isARPaused = true;
    };

    maximize = () => {

        console.log('--MINIMIZE');

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

        EventsBridge.isARPaused = false;
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

        if (iTabId !== screens.VirtualReality) {
            if (EventsBridge.arScreenRef) {
                EventsBridge.arScreenRef.reset();
            }
        }

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

        const routeName = getCurrentRoute(this.props.navigation.state);
        let backFromAR = (routeName === screens.VirtualReality);
        console.log('Hide all panels, route = ' + routeName);

        if (backFromAR) {
            if (EventsBridge.arScreenRef) {
                EventsBridge.arScreenRef.reset();
            }
        }
        else {
            this._map.hide();
            this._panel.hide();
        }

        return backFromAR;
    };

    render() {
        const panHandlers = this.state.cntEnable === 'auto' ? null : this.props.panHandlers;
        const navigation = this.props.navigation;
        const { pan, scale } = this.state;
        const [translateX, translateY] = [pan.x, pan.y];
        const rotate = '0deg';
        const transformStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
        const animStyle = {borderRadius : scale.interpolate({ inputRange: [0.8, 1], outputRange: [20, 0] })}; // removed it from styles due to AR objects clicking bug

        return (
            <Animated.View {...panHandlers} style={[s.container, transformStyle]} removeClippedSubviews={true} >
                <Animated.View style={[s.containerOverflow/*, animStyle*/]} pointerEvents={this.state.cntEnable} >
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

