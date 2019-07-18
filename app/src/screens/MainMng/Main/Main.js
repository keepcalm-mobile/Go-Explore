import React, {forwardRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import MenuBottom from './Menu';
import Map from './Map';
import PagesMng from './PagesMng';
import {getCurrentRoute} from '../../../utils/navHelper';
import {screens} from '../../../constants';
import SectionsMenu from './SectionsMenu';
import s from './style';
import {windowH, windowW} from '../../../styles';

// const ThisWillWork = forwardRef((props, ref) => {
//     return <button ref={ref}>Text</button>
// });

class Main extends React.Component {
    constructor(props) {
        super(props);

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
        console.log('________ NAVI MAIN NEW ROUTE : ' + newRouteName);
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
                toValue: { x: windowW*.45, y: windowH*.01 },
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

    _openTab = (iTabId) => {
        console.log('OPEN TAB!! : ' + iTabId);
        if (iTabId === screens.DataPages){
            this._panel.show();
        } else {
            this.props.navigation.navigate(iTabId);
            this._bottom.changeIcon(iTabId);
        }

        this._map.hide();
    };

    _openSection = (iSectionId) => {
        console.log('OPEN SECTION!! : ' + iSectionId);
        this._panel.hide();
        this.props.navigation.navigate(screens.DataPages);
        this._bottom.changeIcon(screens.DataPages);
    };


    render() {
        const { navigation } = this.props;
        const { pan, scale } = this.state;
        const [translateX, translateY] = [pan.x, pan.y];
        const rotate = '0deg';
        const animStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}],
            borderRadius : scale.interpolate({ inputRange: [0.8, 1], outputRange: [10, 0] }),
        };

        return (//{...this._panResponder.panHandlers}
            <Animated.View style={[s.container, animStyle]} pointerEvents={this.state.pointerEvents} removeClippedSubviews={true} >
                <PagesMng navigation={navigation}/>
                <Map ref={c => this._map = c}/>
                <MenuBottom ref={c => this._bottom = c} onButtonPress={this._openTab}/>
                <SectionsMenu ref={c => this._panel = c} onButtonPress={this._openSection}/>
            </Animated.View>
        );
    }
}

export default Main;

