import React from 'react';
import {View, Animated, PanResponder} from 'react-native';
import {scale} from '../../../../utils/resize';
import {indent, windowH, windowW} from '../../../../styles';
import SwipeUpDown from 'react-native-swipe-up-down-fix';

import {PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';
import {ToastAndroid} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

import mapStyles from './mapStyles.json'


const GOOGLE_MAPS_APIKEY = "AIzaSyBY5YtcHzrgq0ypfGbej6H8lJE9mJQN8aw"; // TODO: Change it to a proper key, currently it is only for testing (In AndroidManifest.xml too)

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

async function requestPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message:
                    'We need access to your geolocation, ' +
                    'so you can find things nearby.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {

            ToastAndroid.showWithGravity(
                'GPS granted After request',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );

            this.getCurrentPosition();

            this.setState({
                gpsGranted: 'true'
            });
        }


        //Alert.alert("", "Requesting ok");

    } catch (err) {
        console.warn(err);

        //Alert.alert("", "Requesting NOT ok");
    }
}

class Map extends React.Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            initialPosition: 'unknown',
            gpsGranted: 'false',
            currentPosition: {
                latitude: 37.78825,
                longitude: -122.4324,
            },
            targetPosition: {
                latitude: 37.78845,
                longitude: -122.4364,
            },
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            map: null,
            targetMarker: null,
            route: null
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
    setPosition(position) {
        this.setState({
            initialPosition: ('\nlongitude = ' + position.coords.longitude + '\nlatitude = ' + position.coords.latitude),
            currentPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude}
        });
    }

    setTargetPosition(position) {
        this.setState({
            targetPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude}
        });
    }

    getCurrentPosition() {

        if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {

            this.setState({
                gpsGranted: 'true'
            });
        }
        else {
            return;
        }

        Geolocation.getCurrentPosition(
            position => {
                this.setPosition(position);
                const target = position;
                target.coords.latitude += 0.0020;
                target.coords.longitude += 0.0020;
                this.setTargetPosition(target);

                setTimeout(() => {

                    if (this.state.map != null)
                        this.state.map.animateToCoordinate(position.coords, 0); // deprecated, but works

                }, 300);

            },
            error => {
                ToastAndroid.showWithGravity(
                    'Get current location error: ' + JSON.stringify(error),
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );

                this.getCurrentPosition();
            },
            {enableHighAccuracy: true, timeout: 50000, maximumAge: 8000},
        );

        Geolocation.watchPosition(position => this.setPosition(position), error => {
            ToastAndroid.showWithGravity(
                'Watch position error: ' + JSON.stringify(error),
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        },
            {enableHighAccuracy: true, timeout: 50000, maximumAge: 8000});
    }

    componentDidMount() {

        if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))
        {
            ToastAndroid.showWithGravity(
                'GPS granted',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );

            this.getCurrentPosition();
        }
        else
            requestPermission();

    }

    render() {
        const panStyle = { transform: this.state.pan.getTranslateTransform() };
        return (
            <Animated.View style={[panStyle, {position:'absolute', backgroundColor:'#D0D0D0', width:windowW, height:windowH, borderRadius:10, marginLeft:indent, marginTop:windowH - 75, overflow: 'hidden'}]}>

                <MapView
                    // style={{width:'100%', height:'100%', borderRadius:25}}
                    style={{flex: 1}}
                    initialRegion={this.state.region}
                    customMapStyle={mapStyles}
                    ref={ref => {
                        this.state.map = ref;
                    }}
                    onPress={(e) => {

                        let str = '(' + e.nativeEvent.coordinate.latitude + ';' + e.nativeEvent.coordinate.longitude + ')';

                        ToastAndroid.showWithGravity(
                            'Clicked on ' + str,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );

                        this.state.targetPosition = e.nativeEvent.coordinate;

                        if (this.state.targetMarker != null)
                            this.state.targetMarker.animateMarkerToCoordinate(this.state.targetPosition, 300);

                        setTimeout(() => {
                            if (this.state.route != null)
                                this.state.route.destination = this.state.targetPosition;
                        }, 400);

                    }}
                >
                    <Marker
                        coordinate={this.state.currentPosition}
                        title={"Point A"}
                        description={"Imagine you are here"}
                    />
                    <Marker
                        coordinate={this.state.targetPosition}
                        title={"Point B"}
                        description={"This is where you want to get"}
                        ref={ref => {
                            this.state.targetMarker = ref;
                        }}
                    />
                    <MapViewDirections
                        origin={this.state.currentPosition}
                        destination={this.state.targetPosition}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={false}
                        ref={ref => {
                            this.state.route = ref;
                        }}
                        onStart={(params) => {
                            ToastAndroid.showWithGravity(
                                'Started making your route',
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER,
                            );
                        }}
                        onReady={result => {
                            ToastAndroid.showWithGravity(
                                'Your route is ready',
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER,
                            );
                        }}
                        onError={err => {
                            ToastAndroid.showWithGravity(
                                'Error when making a route: ' + JSON.stringify(err),
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER,
                            );
                        }}
                    />
                </MapView>
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
