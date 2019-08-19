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


class Main extends React.Component {
    constructor(props) {
        super(props);

        console.log('>>>>>>> MAIN cur Props : ' + JSON.stringify(props.setCurCategory));
        // props.setCurCategory(screens.HotPicks);

        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
            pointerEvents: 'auto',
        };

        // this._panResponder = PanResponder.create({
        //     onMoveShouldSetPanResponderCapture: () => true,
        //
        //     onPanResponderGrant: (e, gestureState) => {
        //         this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        //         this.state.pan.setValue({x: 0, y: 0});
        //         Animated.spring(
        //             this.state.scale,
        //             { toValue: 1.1, friction: 3 }
        //         ).start();
        //     },
        //
        //     onPanResponderMove: Animated.event([
        //         null, {dx: this.state.pan.x, dy: this.state.pan.y},
        //     ]),
        //
        //     onPanResponderRelease: (e, {vx, vy}) => {
        //         this.state.pan.flattenOffset();
        //         Animated.spring(
        //             this.state.scale,
        //             { toValue: 1, friction: 3 }
        //         ).start();
        //     },
        // });
    }

    componentDidUpdate(prevProps, prevState) {
        const newRouteName = getCurrentRoute(this.props.navigation.state);
        console.log('________ NAVI MAIN NEW RO UTE : ' + newRouteName);
        this._bottom.changeIcon(newRouteName);
    }

    minimize = () => {
        Animated.parallel([
            Animated.spring(this.state.scale, {
                toValue: 0.8,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.spring(this.state.pan, {
                toValue: { x: windowW * 0.45, y: windowH * 0.01 },
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        this.setState({pointerEvents: 'none'});
    };

    maximize = () => {
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

        this.setState({pointerEvents: 'auto'});
    };

    _openPage = (iTabId, iJump = false) => {
        console.log('OPEN PAGE!! : ' + iTabId);
        if (iTabId === screens.DataPages && !iJump){
            this._panel.show();
        } else {
            this.props.navigation.navigate(iTabId);
            this._bottom.changeIcon(iTabId);
        }

        this._map.hide();
    };

    _openCategory = (iCategoryId) => {
        console.log('OPEN CATEGORY!! : ' + iCategoryId);
        this._panel.hide();
        // this.props.setCurCategory(iCategoryId);
        // this.props.navigation.navigate(screens.HotPicks);//iCategoryId);
        this.props.navigation.navigate({routeName:screens.HotPicks, key: screens.DataPages + iCategoryId + 'Key', params:{categoryId:iCategoryId}});
        this._bottom.changeIcon(screens.DataPages);
    };


    render() {
        const { navigation } = this.props;
        const { pan, scale } = this.state;
        const [translateX, translateY] = [pan.x, pan.y];
        const rotate = '0deg';
        const transformStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
        const animStyle = {borderRadius : scale.interpolate({ inputRange: [0.8, 1], outputRange: [20, 0] })};

        return (//{...this._panResponder.panHandlers}
            <Animated.View style={[s.container, transformStyle]} pointerEvents={this.state.pointerEvents} removeClippedSubviews={true} >
                <Animated.View style={[s.containerOverflow, animStyle]}>
                    <PagesMng ref={c => this._pagesMng = c} navigation={navigation}/>
                    <Map ref={c => this._map = c}/>
                    <MenuPages ref={c => this._bottom = c} onButtonPress={this._openPage}/>
                    <MenuCategories ref={c => this._panel = c} onButtonPress={this._openCategory}/>
                </Animated.View>
            </Animated.View>
        );
    }
}

export default Main;

