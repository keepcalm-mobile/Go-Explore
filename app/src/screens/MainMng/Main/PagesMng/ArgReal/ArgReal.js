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
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ToastAndroid, PermissionsAndroid,
} from 'react-native';

import RNSimpleCompass from 'react-native-simple-compass';
import Geolocation from 'react-native-geolocation-service';

import ARComponent from '../../../../../../src/components/ARMap/ARComponent';
import MapComponent from '../../../../../../src/components/ARMap/MapComponent';
import Utils from '../../../../../../src/components/ARMap/Utils';
import EventsBridge from '../../../../../utils/EventsBridge';

//icons
import iconDiscount from '../../../../../components/ARMap/res/iconDiscount.png';
import iconClock from '../../../../../components/ARMap/res/iconClock.png';
import iconMarker from '../../../../../components/ARMap/res/iconMarker.png';
import iconNavigate from '../../../../../components/ARMap/res/iconNavigate.png';
import iconClose from '../../../../../components/ARMap/res/iconClose.png';
import offerImage from '../../../../../components/ARMap/res/offerImage.png';

const GPS_TIMEOUT = 30000;
const GPS_MAXIMUM_AGE = 60000;
const CURRENT_TEST_LOCATION = [40.6976637,-74.1197639];

var POIs = [];
var OFFERS = [];

class ArgReal extends ScrollablePage {
    constructor(props) {
        super(props);
        this.state = {
            readyForAR: false,
            arRunning: false, //was false
            heading: 0,
            gpsGranted: false,
            initialPosition: null,
            specialOfferData: null,
            currentPosition: {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
            prevPosition: false,
            poisUpdateDifference: 200, // distance in meters
            poisData: [],
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        this.fetchedPOIs = false;
        EventsBridge.arComponent = this;
    }

    reset = () => {
        clearInterval(this._interval);
        this._interval = null;
        RNSimpleCompass.stop();
        this.exitNavigation();
        this.setState({heading: 0, readyForAR: false, arRunning: false});
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
            // console.log('updating heading to ' + this.state.heading);
        }, 1000);
    }

    setPosition(position) {

        if (!position) {
            console.log('invalid position = ' + position);
            return;
        }

        let curPos = {...this.state.currentPosition};

        this.setState({
            currentPosition: {latitude: position.coords.latitude, longitude: position.coords.longitude},
            prevPosition: this.state.prevPosition !== false ? curPos : {latitude: position.coords.latitude, longitude: position.coords.longitude}
        });

        let dif = Utils.getDistanceBetweenCoordinates(this.state.currentPosition.latitude, this.state.currentPosition.longitude, this.state.prevPosition.latitude, this.state.prevPosition.longitude);

        console.log("GPS difference = " + dif);

        if (dif >= this.state.poisUpdateDifference || (!this.fetchedPOIs)) {
            //TODO: send a request to receive the list of new POIs, save current poi active in navigation and add it to the received list
            console.log("Sending a request to receive new POIs...");

            let GMAPS_KEY = "AIzaSyAfGgE2PLIlFX_TcMMnW0p75_q29o1U2hA";

            let requestQuery = "https://goexploreapi.azure-api.net/testmobile/getnearme?cat=attractions&latitude=25.3846118&longitude=51.5228745&subscription-key=bbc34cdbc2df4e09b177542c6da3fb35";
            let geocodingQuery = "https://maps.googleapis.com/maps/api/geocode/json?key="+GMAPS_KEY+"&address=";

            fetch(requestQuery)
              .then((response) => response.json())
              .then((responseJson) => {
                    // return responseJson.movies;
                  console.log(responseJson);

                  POIs = responseJson.places;
                  OFFERS = responseJson.offers;

                  this.startAR();

                  // if (EventsBridge.arScene !== null) {
                  //     EventsBridge.arScene.setData(POIs, OFFERS);
                  // } else {
                  //     this.startAR();
                  // }

                  // this.startAR();
                  //this.setState({poisData: responseJson});

                  // for (let i=0; i<POIs.length && i<10; i++) {
                  //   // geocoding
                  //     let formattedLocation = POIs[i].location.replace(/ /g, "+");
                  //     console.log(formattedLocation);
                  //
                  //     fetch(geocodingQuery+formattedLocation).then((resp) => resp.json()).then((respJson) => {
                  //         console.log(respJson);
                  //     });
                  // }
            });
        }

        this.mapComponent.setLocation(this.state.currentPosition);

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
                poisData={POIs}
                offersData={OFFERS}
                onClickHandler={this.onPOIClickHandler.bind(this)}
                onTrackingLost={this.onTrackingLostHandler.bind(this)}
                ref={ref => this.arComponent = ref}
            />
        );
    }

    onPOIClickHandler(poi) {
        // console.log('App CLICKED: ' + poi.title + ' coords: ' + JSON.stringify(poi.coords));
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

    setPopupData(data) {
        this.setState({specialOfferData: data});
    }

    onPopupCloseHandler() {
        console.log('closing popup');
        this.setPopupData(null);
    }

    onPopupNavigateHandler() {
        console.log('clicked navigate button');
        this.mapComponent.navigateTo(this.state.specialOfferData.coords);
        this.setPopupData(null);
    }

    getSpecialOfferPopup() {
        if (this.state.specialOfferData == null) {
            return null;
        }
        else {
            return (
                <View style={styles.popupBackground}>
                    <View style={styles.popup}>
                        <View style={styles.popupHeader}>
                            <View style={styles.popupHeaderIcon}><Image source={iconDiscount} style={{width: 26, height: 26}} /></View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerText}>{this.state.specialOfferData.offer.titleExpanded}</Text>
                            </View>
                            <View style={styles.headerCloseBtn}>
                                <TouchableOpacity onPress={this.onPopupCloseHandler.bind(this)}><Image source={iconClose} style={{width: 26, height: 26}} /></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.popupBody}>
                            <View style={styles.poster}><Image source={offerImage} style={{width: '100%', height: '100%'}} /></View>
                            <View style={styles.mainTextContainer}>
                                <Text style={styles.mainText}>{this.state.specialOfferData.offer.textPopup}</Text>
                            </View>
                            <View>
                                <Text style={styles.subtext}>1.1km from Fatread Beach</Text>
                            </View>
                        </View>
                        <View style={styles.borderContainer}>
                            <View style={styles.borderLineBlack}/>
                            <View style={styles.borderLineGray}/>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.footerInfo}>
                                <View style={[styles.footerInfoRow, styles.footerPb]}>
                                    <View style={styles.footerInfoRowIcon}><Image source={iconClock} style={{width: 16, height: 16}} /></View>
                                    <View style={styles.footerTextContainer}><Text style={styles.footerText}>{this.state.specialOfferData.offer.fromTo}</Text></View>
                                </View>
                                <View style={styles.footerInfoRow}>
                                    <View style={styles.footerInfoRowIcon}><Image source={iconMarker} style={{width: 12, height: 16}} /></View>
                                    <View style={styles.footerTextContainer}><Text style={styles.footerText}>{this.state.specialOfferData.offer.location}</Text></View>
                                </View>
                            </View>
                            <View style={styles.borderContainerVertical}>
                                <View style={styles.borderLineBlack}/>
                                <View style={styles.borderLineGray}/>
                            </View>
                            <View style={styles.navigateBtn}><TouchableOpacity onPress={this.onPopupNavigateHandler.bind(this)}><Image source={iconNavigate} style={{width: 30, height: 30}} /></TouchableOpacity></View>
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
    popupText: {
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff',
        fontSize: 14
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
        //backgroundColor: '#ffff44',
        flexBasis: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerCloseBtn: {
        // backgroundColor: '#ffff44',
        flexBasis: 26,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerTextContainer: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff'
    },

    popupBody: {
        paddingTop: 10,
        paddingBottom: 17,
        flexDirection: 'column'
    },

    poster: {
        height: 223,
        backgroundColor: '#ffee77'
    },

    mainTextContainer: {
        paddingTop: 10,
        paddingBottom: 7
    },

    mainText: {
        fontSize: 14,
        color: '#f2c94c',
        fontWeight: 'bold',
        fontFamily: 'Poppins, sans-serif',
    },

    subtext : {
        fontSize: 10,
        color: '#939393',
        fontFamily: 'Poppins, sans-serif',
    },

    borderContainer: {
        // flexDirection: 'row',
        marginLeft: -15,
        marginRight: -15,
        height: 2
    },

    borderContainerVertical: {
        flexDirection: 'row',
        width: 2,
        marginTop: -17,
        marginBottom: -15
    },

    borderLineGray: {
        // width: '100%',
        // height: 1,
        flex: 1,
        backgroundColor: '#434343'
    },

    borderLineBlack: {
        // width: '100%',
        // height: 1,
        flex: 1,
        backgroundColor: '#0f0f0f'
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
        // backgroundColor: '#ffdd44',
        flexBasis: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

    footerTextContainer: {
        paddingLeft: 18,
        flex: 1
    },

    footerText : {
        fontSize: 14,
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff'
    },

    navigateBtn : {
        flexBasis: 67,
        // backgroundColor: '#ffdd44',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8
    },
});

export default ArgReal;
