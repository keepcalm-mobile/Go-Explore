import React from 'react';
import ComingSoon from '../../../../../components/ComingSoon';
import ScrollablePage from '../ScrollablePage';
import s from "../../../../../components/ComingSoon/style";
import IconSoon from "../../../../../../assets/comingSoon.svg";
import {scale} from "../../../../../utils/resize";
import TextGradient from "../../../../../components/TextGradient";
import ButtonOrange from "../../../../../components/ButtonOrange";

import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ToastAndroid, PermissionsAndroid,
} from 'react-native';

import RNSimpleCompass from 'react-native-simple-compass';
import Geolocation from 'react-native-geolocation-service';

import ARComponent from '../../../../../../src/components/ARMap/ARComponent';
import MapComponent from '../../../../../../src/components/ARMap/MapComponent';

import EventsBridge from '../../../../../utils/EventsBridge';

const GPS_TIMEOUT = 30000;
const GPS_MAXIMUM_AGE = 60000;
const CURRENT_TEST_LOCATION = [46.95364, 31.99375];

class ArgReal extends ScrollablePage {
    constructor(props) {
        super(props);
        this.state = {
            readyForAR: false, //was false
            arRunning: true,
            heading: 0,
            gpsGranted: false,
            initialPosition: null,
            currentPosition: {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        EventsBridge.arComponent = this;
    }

    reset = () => {
      this.mapComponent.exitNavigation();
      this.setState({heading: 0, readyForAR: false, arRunning: true});
    };

    exitNavigation() {
        this.mapComponent.exitNavigation();
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        this.trackDeviceHeading();

        if (this.state.gpsGranted === false) {
            this.requestPermission();
        }
        else {
            this.getCurrentPosition();
        }

        // console.log('Map ref = ' + EventsBridge.mapRef);
        // EventsBridge.mapRef.showMap(false);

        //
        this.startAR();
    }

    trackDeviceHeading() {
        const degree_update_rate = 7; // Number of degrees changed before the callback is triggered
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            this.setState({heading: degree});
            this.mapComponent.setHeading(degree);

            if (EventsBridge.arScene !== null) {
                EventsBridge.arScene.setHeading(degree);
            }

            // if (this.state.readyForAR === false && this.state.heading >= 0 && this.state.heading <= 3) {
            //     this.setState({readyForAR: true});
            //     console.log('Loading AR scene...');
            // }
        });
    }

    setPosition(position) {

        if (!position) {
            console.log('invalid position = ' + position);
            return;
        }

        this.setState({
            currentPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude}
        });

        if (this.state.initialPosition === null) {
            this.setState({initialPosition: this.state.currentPosition});
            // this.setPointsOfInterest();
        }

        console.log('GPS updated: ' + JSON.stringify(position));
    }

    getCurrentPosition() {

        // if(this.state.gpsGranted === false)
        //   return;

        Geolocation.getCurrentPosition(
            position => {
                this.setPosition(position);
            },
            error => {
                this.getCurrentPosition();
            },
            {enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: GPS_MAXIMUM_AGE},
        );

        Geolocation.watchPosition(position => this.setPosition(position), error => {}, {enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: GPS_MAXIMUM_AGE});
    }

    getTutorial() {
        if (this.state.readyForAR === false) {
            let tutorialText = 'Place your phone vertically\nLook around until it\'s zero, meaning you\'re heading North\nHeading = ' + this.state.heading;

            tutorialText = 'Please keep your phone stable\nStarting AR...';

            if (this.state.arRunning === false) {
                tutorialText = 'Probably it was too dark or too bright, try pointing your camera to better lighting conditions and hit the button';
            }

            return (
                    <Text style={{fontSize: 22, color: '#dddddd', textAlign: 'center'}}>{tutorialText}</Text>
            );
        }
        else {
            return null;
        }
    }

    getARButton() {
        if (this.state.arRunning === true) {
            return null;
        }
        else {
            return (<ButtonOrange title={'Launch AR'} onPress={this.startAR.bind(this)} style={{marginTop: 15}} />);
        }
    }

    startAR() {
        this.setState({readyForAR: false, arRunning: true});

        setTimeout(() => {
            this.setState({readyForAR: true, arRunning: true});
        }, 1000);
    }

    getARComponent() {
        if (this.state.readyForAR === false){
            return null;
        }

        return (
            <ARComponent
                location={this.state.initialPosition}
                heading={this.state.heading}
                onClickHandler={this.onPOIClickHandler.bind(this)}
                onTrackingLost={this.onTrackingLostHandler.bind(this)}
                ref={ref => this.arComponent = ref}
            />
        );
    }

    onPOIClickHandler(poi) {
        console.log('App CLICKED: ' + poi.title + ' coords: ' + JSON.stringify(poi.coords));
        //console.log('app this.state = ' + this.state);

        this.mapComponent.navigateTo(poi.coords);
    }

    onTrackingLostHandler() {

        console.log('on tracking lost main script');
        this.setState({readyForAR: false, arRunning: false});


    }

    async requestPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Location Permission',
                    message:
                        'We need access to your geolocation, ' +
                        'so you find things nearby.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    gpsGranted: true
                });

                console.log('permission granted');

                this.getCurrentPosition();
            }

        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <View style={{width: '100%', height: '100%', position: 'absolute', top: 0, paddingTop: 150, paddingRight: 50, paddingLeft: 50}}>

                    {this.getTutorial()}
                    {this.getARButton()}

                </View>

                {this.getARComponent()}

                <MapComponent
                    heading={this.state.heading}
                    location={this.state.currentPosition}
                    ref={ref => this.mapComponent = ref}
                />
            </View>
        );
    }
}

export default ArgReal;
