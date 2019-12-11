import React from 'react';
import {View, Animated, PanResponder, Platform, ToastAndroid, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {scale} from '../../../../utils/resize';
import {doubleIndent, indent, windowH, windowW} from '../../../../styles';
import s from './style';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';

import mapStyles from './mapStyles.json';
import PropTypes from 'prop-types';

import EventsBridge from '../../../../utils/EventsBridge';

const mapTopY = -Math.round(windowH * 0.8);

const GOOGLE_MAPS_APIKEY = 'AIzaSyAfGgE2PLIlFX_TcMMnW0p75_q29o1U2hA'; // TODO: Change it to a proper key, currently it is only for testing (In AndroidManifest.xml too)

const LATITUDE = 25.2864106;
const LONGITUDE = 51.5271888;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class Map extends React.Component<Props> {
    // static propTypes = {
    //     onViewChanged: PropTypes.func,
    // };

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            initialPosition: 'unknown',
            gpsGranted: 'false',
            currentPosition: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            // targetPosition: {
            //     latitude: 25.2854,//37.78845,
            //     longitude: 51.5310,//-122.4364,
            // },
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            mapBg: false,
            showMap: true, // to render map or not
        };

        this._val = { x:0, y:0 };
        this.state.pan.addListener((value) => {
            this._val = value;
            if (this._val.y < -20 && !this.state.mapBg){
                this.setState({mapBg : true});
            } else if (this._val.y > -20 && this.state.mapBg){
                this.setState({mapBg : false});
            }
        });

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

                let toAction = this.isOpen;// ? mapTopY : 0;
                if ( Math.abs( gesture.dy) > 100 ){
                    toAction = gesture.dy < 0;
                }

                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: toAction ? mapTopY : 0 },
                    friction: 5,
                    useNativeDriver: true,
                }).start();

                this.isOpen = toAction;
            },
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.mapTarget.mapIsOpen && !this.isOpen){
            Animated.spring(this.state.pan, {
                toValue: { x: 0, y: mapTopY},
                friction: 5,
                useNativeDriver: true,
            }).start();

            this.isOpen = true;
        }

        // console.log('CUR LOCATION:');
        // console.log(JSON.stringify(EventsBridge.currentLocation));
    }

    get isOpen () : Boolean {
        return this._isOpen;
    }

    set isOpen (iValue : Boolean) {
        this._isOpen = iValue;
        if (this.props.mapTarget.mapIsOpen && !iValue){
            this.props.setMapTarget(0,0,false);
        }

        if (this.props.onViewChanged){
            this.props.onViewChanged(iValue);
        }
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

    showMap = (show) => {
      this.setState({showMap: show});
    };

    /****
     * NAVIGATION
    ****/
    async componentDidMount() {

        console.log('-- MAP mounted');

        this._lastGeolocation = await AsyncStorage.getItem('LastGPS');

        EventsBridge.mapRef = this;
        this.setLocation(EventsBridge.currentLocation);
    }

    setLocation(location) {

        this.setState({currentPosition: location});

        if (this._map && this._map !== null)
        {
            this._map.animateCamera({
                center: {latitude: location.latitude, longitude: location.longitude},
                //         pitch: 5,
                //         heading: 0,
                //         altitude: 30, // for ios only
                zoom: 16 // gmaps only
            }, 1000);
        }
    }

    /****
     * MAP
     ****/
    // onMapPress = (e) => {
    //     // this.state.targetPosition = e.nativeEvent.coordinate;
    //     let pos = e.nativeEvent.coordinate;
    //     this.setState({ targetPosition : pos} );
    //
    //     if (this._targetMarker)
    //     {this._targetMarker.animateMarkerToCoordinate(pos, 300);}
    //
    //     setTimeout(() => {
    //         if (this._route)
    //         {this._route.destination = pos;}
    //     }, 400);
    // };

    onMapReady = (result) => {
        if (this._lastGeolocation) {
            let position = JSON.parse(this._lastGeolocation);
            // this.setPosition(position);
        }

        // if (Platform.OS !== 'android' || PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
        //     this.getCurrentPosition();
        // }
    };

    onDirectionsError = (err) => {
        ToastAndroid.showWithGravity(
            'Error when making a route: ' + JSON.stringify(err),
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    };

    mapBg = () => {
        if (this.state.mapBg) {
            const opacity = {opacity: this.state.pan.y.interpolate({inputRange: [mapTopY, 0], outputRange: [0.5, 0]})};
            return <Animated.View style={[s.mapBg, opacity]}/>;
        } else {
            return null;
        }
    };

    render() {
        if (this.state.showMap === false) return null;

        const panStyle = { transform: this.state.pan.getTranslateTransform() };

        return (
            <>
            {this.mapBg()}

            <Animated.View style={[panStyle, s.container]}>
                <MapView
                    style={s.mapView}
                    initialRegion={this.state.region}
                    customMapStyle={mapStyles}
                    loadingEnabled={true}
                    ref={ref => this._map = ref}
                    // onPress={this.onMapPress}
                    onMapReady={this.onMapReady}
                >
                    <Marker
                        coordinate={this.state.currentPosition}
                        title={'Point A'}
                        description={'Imagine you are here'}
                    />
                    <Marker
                        coordinate={this.props.mapTarget}
                        title={'Point B'}
                        description={'This is where you want to get'}
                        ref={ref => this._targetMarker = ref}
                    />
                    <MapViewDirections
                        origin={this.state.currentPosition}
                        destination={this.props.mapTarget}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor={"#9c9c9c"}
                        optimizeWaypoints={false} // if true - more optimized route, but costs more (higher Google API tariff)
                        ref={ref => this._route = ref}
                        onStart={params => {}}
                        onReady={result => {}}
                        onError={this.onDirectionsError}
                    />
                </MapView>
                <View {...this.panResponder.panHandlers} style={s.dragArea}>
                    <View style={s.dragIcon}/>
                </View>
            </Animated.View>
            </>
        );
    }
}

export default Map;
