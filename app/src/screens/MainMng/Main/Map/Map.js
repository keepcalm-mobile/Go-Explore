import React from 'react';
import {View, Animated, PanResponder, Platform, ToastAndroid, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {scale} from '../../../../utils/resize';
import {doubleIndent, indent, windowH, windowW} from '../../../../styles';
import s from './style';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

import mapStyles from './mapStyles.json';


const GOOGLE_MAPS_APIKEY = 'AIzaSyAfGgE2PLIlFX_TcMMnW0p75_q29o1U2hA'; // TODO: Change it to a proper key, currently it is only for testing (In AndroidManifest.xml too)

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const GPS_TIMEOUT = 60000;
const GPS_MAXIMUM_AGE = 60000; // current location caching duration in milliseconds

async function requestPermission() {
    if(Platform.OS === 'android') {
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
                    gpsGranted: 'true',
                });
            }
        } catch (ex) {
            //console.log(ex);
        }
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
            route: null,
            lastGeolocation: null
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
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },
            onPanResponderMove: Animated.event([ null, { dy: this.state.pan.y } ]),
            onPanResponderRelease: (e, gesture) => {
                this.state.pan.flattenOffset();

                let toY = this.isOpen ? -windowH * 0.8 : 0;
                if ( Math.abs( gesture.dy) > 100 ){
                    if (gesture.dy < 0){
                        toY = -windowH * 0.8;
                        this.isOpen = true;
                    } else {
                        toY = 0;
                        this.isOpen = false;
                    }
                }

                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: toY },
                    friction: 5,
                    useNativeDriver: true,
                }).start();
            },
        });

    }

    hide = () => {
        if (!this.isOpen) {return;}
        this.isOpen = false;

        this.state.pan.flattenOffset();

        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 8,
            useNativeDriver: true,
        }).start();
    };
    setPosition(position) {
        this.setState({
            initialPosition: ('\nlongitude = ' + position.coords.longitude + '\nlatitude = ' + position.coords.latitude),
            currentPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude},
        });
    }

    setTargetPosition(position) {
        this.setState({
            targetPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude},
        });
    }

    getCurrentPosition() {

        if (Platform.OS === 'android' && PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {

            this.setState({
                gpsGranted: 'true',
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

                AsyncStorage.setItem('LastGPS', JSON.stringify(position));

                setTimeout(() => {

                    if (this.state.map != null)
                        {this.state.map.animateToCoordinate(position.coords, 0);} // deprecated, but works

                }, 300);

                Geolocation.watchPosition(position => this.setPosition(position), error => {
                        ToastAndroid.showWithGravity(
                            'Watch position error: ' + JSON.stringify(error),
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER,
                        );
                    },
                    {enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: GPS_MAXIMUM_AGE});

            },
            error => {
                // ToastAndroid.showWithGravity(
                //     'Get current location error: ' + JSON.stringify(error),
                //     ToastAndroid.LONG,
                //     ToastAndroid.CENTER,
                // );

                this.getCurrentPosition();
            },
            {enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: GPS_TIMEOUT},
        );
    }

    async componentDidMount() {
        this.state.lastGeolocation = await AsyncStorage.getItem('LastGPS');
    }

    render() {
        const panStyle = { transform: this.state.pan.getTranslateTransform() };
        return (
            <Animated.View style={[panStyle, s.container]}>

                <MapView
                    style={s.mapView}
                    initialRegion={this.state.region}
                    customMapStyle={mapStyles}
                    loadingEnabled={true}
                    ref={ref => {
                        this.state.map = ref;
                    }}
                    onPress={(e) => {

                        this.state.targetPosition = e.nativeEvent.coordinate;

                        if (this.state.targetMarker != null)
                            {this.state.targetMarker.animateMarkerToCoordinate(this.state.targetPosition, 300);}

                        setTimeout(() => {
                            if (this.state.route != null)
                                {this.state.route.destination = this.state.targetPosition;}
                        }, 400);

                    }}
                    onMapReady={result => {
                        if (this.state.lastGeolocation != null)
                        {
                            let position = JSON.parse(this.state.lastGeolocation);

                            this.setPosition(position);
                            if (this.state.map != null)
                                this.state.map.animateToCoordinate(position.coords, 300); // deprecated, but works
                        }

                        if (Platform.OS !== 'android' || PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))
                        {
                            this.getCurrentPosition();
                        }
                    }}
                >
                    <Marker
                        coordinate={this.state.currentPosition}
                        title={'Point A'}
                        description={'Imagine you are here'}
                    />
                    <Marker
                        coordinate={this.state.targetPosition}
                        title={'Point B'}
                        description={'This is where you want to get'}
                        ref={ref => {
                            this.state.targetMarker = ref;
                        }}
                    />
                    <MapViewDirections
                        origin={this.state.currentPosition}
                        destination={this.state.targetPosition}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="#eaeaea"
                        optimizeWaypoints={false} // if true - more optimized route, but costs more (higher Google API tariff)
                        ref={ref => {
                            this.state.route = ref;
                        }}
                        onStart={(params) => {

                        }}
                        onReady={result => {

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
                <View {...this.panResponder.panHandlers} style={s.dragArea}>
                    <View style={s.dragIcon}/>
                </View>
            </Animated.View>
        );
    }
}

export default Map;
