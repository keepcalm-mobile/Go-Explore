import React from 'react';
import {Dimensions, Platform, Text, View} from "react-native";
import {scale} from "../../../../utils/resize";
import {doubleIndent, indent} from "../../../../styles";
import {getStatusBarHeight} from "react-native-status-bar-height";
import SwipeUpDown from 'react-native-swipe-up-down-fix';

import {PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';
import {ToastAndroid} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';

import mapStyles from './mapStyles.json'

const startY = (Platform.OS === 'android') ? 0 : getStatusBarHeight();
const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;
const windowH = Dimensions.get('window').height - barH;
const windowW = Dimensions.get('window').width - doubleIndent;

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
    state = {
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

    constructor(props) {
        super(props);
    }

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
        return (
            <SwipeUpDown
                style={{flex: 1, marginLeft:indent, width:windowW}}
                animation="easeInEaseOut"
                swipeHeight={75}
                itemMini={<View style={{width:50, height:7, backgroundColor:'#000000', borderRadius:5, alignSelf:'center' , marginTop:-12}}/>}
                itemFull={ <View style={{backgroundColor:'#D0D0D0', flex: 1 }}>
                    <MapView
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
                </View>}
            />
        );
    }
}
//marginTop:windowH - 70, paddingBottom:10, height:'70%',
export default Map;
