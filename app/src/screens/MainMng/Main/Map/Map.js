import React from 'react';
import {View, Animated, PanResponder} from 'react-native';
import {scale} from '../../../../utils/resize';
import {indent, windowH, windowW} from '../../../../styles';
import SwipeUpDown from 'react-native-swipe-up-down-fix';
import MapView from 'react-native-maps';


class Map extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
        };

    // }
    //
    // componentWillMount() {

        this._val = { x:0, y:0 };
        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.flattenOffset();
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },
            onPanResponderMove: Animated.event([ null, { dy: this.state.pan.y } ]),
            onPanResponderRelease: (e, gesture) => {

                let toY = 0;
                if (Math.abs(gesture.dy) > 100){
                    if (gesture.dy < 0){
                        toY = -windowH * 0.8;
                        this.isOpen = true;
                    } else {
                        toY = windowH * 0.8;
                        this.isOpen = false;
                    }
                }

                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: toY },
                    friction: 5,
                }).start();
            },
        });

    }

    hide = () => {
        if (!this.isOpen) {return;}
        this.isOpen = false;

        this.state.pan.flattenOffset();
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});

        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: windowH * 0.8 },
            friction: 8,
        }).start();
    };

    render() {
        const panStyle = { transform: this.state.pan.getTranslateTransform() };
        return (
            <Animated.View style={[panStyle, {position:'absolute', backgroundColor:'#D0D0D0', width:windowW, height:windowH, borderRadius:10, marginLeft:indent, marginTop:windowH - 75, overflow: 'hidden'}]}>

                <MapView
                    style={{width:'100%', height:'100%', borderRadius:25}}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <View {...this.panResponder.panHandlers} style={{zIndex:1, position:'absolute', width:'100%', height:scale(35)}}>
                    <View style={{width:50, height:7, backgroundColor:'#000000', borderRadius:5, alignSelf:'center', marginTop:12}}/>
                </View>
            </Animated.View>
            // <SwipeUpDown
            //     itemMini={<View style={{width:50, height:7, backgroundColor:'#000000', borderRadius:5, alignSelf:'center' , marginTop:-12}}/>}
            //     itemFull={ <View style={{backgroundColor:'#D0D0D0' }}>
            //         <MapView
            //             style={{width:'100%', height:'100%'}}
            //             initialRegion={{
            //                 latitude: 37.78825,
            //                 longitude: -122.4324,
            //                 latitudeDelta: 0.0922,
            //                 longitudeDelta: 0.0421,
            //             }}
            //         />
            //     </View>}
            //     style={{marginLeft:indent, width:windowW}}
            //     animation="easeInEaseOut"
            //     swipeHeight={75}
            // />
        );
    }
}

export default Map;
