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
            readyForAR: false,
            arRunning: false, //was false
            heading: 0,
            gpsGranted: false,
            initialPosition: null,
            currentPosition: {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        this.specialOfferData = 'someData';

        EventsBridge.arComponent = this;
    }

    reset = () => {
        clearInterval(this._interval);
        this._interval = null;
        RNSimpleCompass.stop();
      this.exitNavigation();
      this.setState({heading: 0, readyForAR: false, arRunning: true});
    };

    exitNavigation() {
        if (this.mapComponent) {
            this.mapComponent.exitNavigation();
        }
    }

    onBackPress = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        super.componentDidMount();
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
        //this.startAR();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.reset();
    }

    trackDeviceHeading() {
        const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            this.setState({heading: degree});
            // this.mapComponent.setHeading(degree);

            // if (EventsBridge.arScene !== null) {
            //     EventsBridge.arScene.setHeading(degree);
            // }

            // if (this.state.readyForAR === false && this.state.heading >= 0 && this.state.heading <= 3) {
            //     this.setState({readyForAR: true});
            //     console.log('Loading AR scene...');
            // }
        });

        this._interval = setInterval(() => {
            this.mapComponent.setHeading(this.state.heading);
            if (EventsBridge.arScene !== null) {
                EventsBridge.arScene.setHeading(this.state.heading);
            }
            console.log('updating heading to ' + this.state.heading);
        }, 1000);
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

            tutorialText = 'Please keep your phone stable\nStarting AR...\nHeading =' + this.state.heading;

            if (this.state.arRunning === false) {
                tutorialText = 'Probably it was too dark or too bright, try pointing your camera to better lighting conditions and hit the button\nHeading =' + this.state.heading;
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
        if (!this._interval) this.trackDeviceHeading();
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

    getSpecialOfferPopup() {
        if (this.specialOfferData == null) {
            return null;
        }
        else {
            return (
                <View style={styles.popupBackground}>
                    <View style={styles.popup}>
                        <View style={styles.popupHeader}>
                            <View style={styles.popupHeaderIcon}></View>
                            <View style={styles.headerText}>
                                <Text text={'Sale -70%'} style={styles.text} />
                            </View>
                            <View style={styles.headerCloseBtn}></View>
                        </View>
                        <View style={styles.popupBody}>
                            <View style={styles.poster}></View>
                            <View style={styles.mainText}>
                                <Text text={'On all items, including instore purchases, Valid till September 21, 2019'} style={styles.text} />
                            </View>
                            <View style={styles.subtext}>
                                <Text text={'1.1km from Fatread Beach'} style={styles.text} />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.footerInfo}>
                                <View style={styles.footerInfoRow}>
                                    <View style={styles.footerInfoRowIcon}></View>
                                    <View style={styles.footerText}><Text text={'Mar 20 - Mar 28'} style={styles.text} /></View>
                                </View>
                                <View style={styles.footerInfoRow}>
                                    <View style={styles.footerInfoRowIcon}></View>
                                    <View style={styles.footerText}><Text text={'Level 7, Conference Center'} style={styles.text} /></View>
                                </View>
                            </View>
                            <View style={styles.navigateBtn}></View>
                        </View>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>

                {this.getARComponent()}

                <MapComponent
                    heading={this.state.heading}
                    location={this.state.currentPosition}
                    ref={ref => this.mapComponent = ref}
                />

                <View style={{width: '100%', position: 'absolute', top: 0, paddingTop: 100, paddingRight: 50, paddingLeft: 50}}>

                    {this.getTutorial()}
                    {this.getARButton()}

                </View>

                {this.getSpecialOfferPopup()}

            </View>
        );
    }
}


var styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff'
    },
    //popup
    popupBackground: {
        backgroundColor: '#00000066',
        paddingLeft: 25,
        paddingRight: 25,
        //flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 90
    },
    popup: {
        backgroundColor: '#222',
        //margin: 0 auto;
        //width: 290px;
        //display: flex;
        width: '100%',
        flexDirection: 'column',
        padding: 15,
        borderRadius: 10,
        color: '#fff'
    },
    popupHeader: {
        flexDirection: 'row'
    },
    popupHeaderIcon: {
        backgroundColor: '#ffff44',
        flexBasis: 26
    },

    headerCloseBtn: {
        backgroundColor: '#ffff44',
        flexBasis: 26
    },

    headerText: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Poppins, sans-serif'
    },

    popupBody: {
        paddingTop: 10,
        paddingBottom: 17,
        //display: flex,
        flexDirection: 'column'
    },

    poster: {
        flexBasis: 223,
        backgroundColor: '#ffee77'
    },

    mainText: {
        fontSize: 14,
        color: '#f2c94c',
        paddingTop: 10,
        paddingBottom: 7,
        fontWeight: 'bold',
        fontFamily: 'Poppins, sans-serif',
    },

    subtext : {
        fontSize: 10,
        color: '#939393',
        fontFamily: 'Poppins, sans-serif',
    },

    footer: {
        flexDirection: 'row',
        paddingTop: 17,
    },

    footerInfo : {
        flex: 1,
    },

    footerInfoRow: {
        flexDirection: 'row',
        paddingRight: 17,
    },

    footerPb: {
        paddingBottom: 12,
    },

    footerInfoRowIcon : {
        backgroundColor: '#ffdd44',
        flexBasis: 16,
    },

    footerText : {
        flex: 1,
        paddingLeft: 18,
        fontSize: 14,
        fontFamily: 'Poppins, sans-serif',
    },

    navigateBtn : {
        flexBasis: 65,
        backgroundColor: '#ffdd44',
    },
});

export default ArgReal;
