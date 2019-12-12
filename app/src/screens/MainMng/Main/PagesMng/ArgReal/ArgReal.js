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
    Platform,
    Dimensions,
    ToastAndroid, PermissionsAndroid,
} from 'react-native';

import RNSimpleCompass from 'react-native-simple-compass';
import MapViewNavigation, { NavigationModes, TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';

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
const CURRENT_TEST_LOCATION = [25.2864106,51.5271888];

var POIs = [];
var OFFERS = [];
var launchAR = false;

class ArgReal extends ScrollablePage {
    constructor(props) {
        super(props);
        this.state = {
            readyForAR: false,
            arRunning: false, //was false
            heading: 0,
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

        this.reset = this.reset.bind(this);
        this.initAR = this.initAR.bind(this);
        // this.getExitNavigation = this.getExitNavigation.bind(this);
        // this.exitNavigation = this.exitNavigation.bind(this);
    }

    reset = () => {
        // if (this._interval)
        //     clearInterval(this._interval);
        // this._interval = null;
        RNSimpleCompass.stop();
        this.exitNavigation();
        launchAR = false;
        EventsBridge.groupingARIteration = 0;
        this.setState({heading: 0, readyForAR: false, arRunning: false}); // causes a crash

        POIs = [];
        OFFERS = [];

        console.log('AR reset');

    };

    // called from Main
    initAR = () => {
        console.log('AR init...');

        EventsBridge.arScreenRef = this;
        this.setPosition(EventsBridge.currentLocation);

        this.trackDeviceHeading();
    }

    exitNavigation() {
        if (this.mapComponent && EventsBridge.startedNavigation) {
            this.mapComponent.exitNavigation();
        }

        EventsBridge.startedNavigation = false;
    }

    onBackPress = () => {
        // this.reset();
        // this.props.navigation.goBack();
    };

    componentDidMount() {
        super.componentDidMount();

        console.log('AR mounted');

        this.initAR(); // called once here, cuz component mounts only once
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.reset();

        console.log('AR - componentWillUnmount');
    }

    trackDeviceHeading() {
        const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
        RNSimpleCompass.start(degree_update_rate, (degree) => {
            this.setState({heading: degree});

            if (this.mapComponent && this.mapComponent !== null) {
                this.mapComponent.setHeading(this.state.heading);
            }

            if (EventsBridge.arScene !== null) {
                EventsBridge.arScene.setHeading(this.state.heading);
            }

            // this.mapComponent.setHeading(degree);

            // if (EventsBridge.arScene !== null) {
            //     EventsBridge.arScene.setHeading(degree);
            // }

            // if (this.state.readyForAR === false && this.state.heading >= 0 && this.state.heading <= 3) {
            //     this.setState({readyForAR: true});
            //     console.log('Loading AR scene...');
            // }
        });

        // this._interval = setInterval(() => {
        //     if (this.mapComponent && this.mapComponent !== null) {
        //         this.mapComponent.setHeading(this.state.heading);
        //     }

        //     if (EventsBridge.arScene !== null) {
        //         EventsBridge.arScene.setHeading(this.state.heading);
        //     }
        //     // console.log('updating heading to ' + this.state.heading);
        // }, 1000);
    }

    setPosition(position) {

        if (!position) {
            console.log('invalid position = ' + position);
            return;
        }

        let curPos = {...this.state.currentPosition};

        this.setState({
            currentPosition: {latitude: position.latitude, longitude: position.longitude},
            prevPosition: this.state.prevPosition !== false ? curPos : {latitude: position.latitude, longitude: position.longitude}
        });

        let dif = Utils.getDistanceBetweenCoordinates(this.state.currentPosition.latitude, this.state.currentPosition.longitude, this.state.prevPosition.latitude, this.state.prevPosition.longitude);

        console.log("GPS difference = " + dif);

        if (dif >= this.state.poisUpdateDifference || (!this.fetchedPOIs)) {

            this.fetchData();

        }

        if (this.mapComponent)
            this.mapComponent.setLocation(this.state.currentPosition);

        if (this.state.initialPosition === null) {
            this.setState({initialPosition: this.state.currentPosition});
            // this.setPointsOfInterest();
        }

        console.log('GPS updated: ' + JSON.stringify(position));
    }

    fetchData() {

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
                  launchAR = true;
                  this.startAR();

                  console.log("Loaded places, arScene = " + EventsBridge.arScene);

                  // setTimeout(() => {
                  //     if (EventsBridge.arScene !== null) {
                  //         console.log("arScene not null, setting data ");
                  //         EventsBridge.arScene.setData(POIs, OFFERS);
                  //     }
                  //     //else {
                  //     //     this.startAR();
                  //     // }
                  // }, 2000);

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
            }).catch(err => {console.log('Failed to load places'); this.startAR(); });
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

    getWaitingOverlay() {
        if (/*EventsBridge.groupingARIteration < 2 && */launchAR === false) {
            let tutorialText = 'Please, slowly move your phone around\nStarting AR...';

            if (launchAR === false) {
                tutorialText = 'Loading places data...';
            }

            if (EventsBridge.isARPaused) {
                tutorialText = 'AR is paused';
            }

            return (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000000',
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize: 21, color: '#dddddd', textAlign: 'center'}}>{tutorialText}</Text>
                </View>
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

    getExitNavigation() {
        if (EventsBridge.startedNavigation === false) {
          return null;
        }
    
        return (
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 50, width: '100%', height: 70, backgroundColor: '#6b67ff', justifyContent: 'center'}}
                              onPress={this.exitNavigation.bind(this)}>
              <Text style={{fontSize: 16, color: '#ffffff', textAlign: 'center'}}>Exit navigation</Text>
            </TouchableOpacity>
        );
    }

    getManeuverView() {
        // return null;
    
        if (EventsBridge.currentRoute === false) {
          return null;
        }
    
        return (
            <View style={{
              position: 'absolute',
              width: '100%',
              top: 120,
              //left: 0,
              //backgroundColor: '#aa66dd'
            }}>
              <ManeuverView
                  step={EventsBridge.currentRouteStep}
                  //fontFamily={AppFonts.light}
                  //fontFamilyBold={AppFonts.bold}
                  arrowColor={'#cccccc'}
              />
            </View>
        );
      }

    getARComponent() {
        if (launchAR === false){
            return null;
        }

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
        console.log('App CLICKED: ' + poi.title + ' coords: ' + JSON.stringify(poi.coords));
        //console.log('app this.state = ' + this.state);

        this.mapComponent.navigateTo(poi.coords);
    }

    onTrackingLostHandler() {

        console.log('on tracking lost main script');
        // this.setState({readyForAR: false, arRunning: false});

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
                            <View style={styles.poster}>
                                <Image placeholderSource={offerImage} source={{uri:this.state.specialOfferData.image}} style={{width: '100%', height: '100%'}} />
                            </View>
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
                {this.getWaitingOverlay()}

                <MapComponent
                    heading={this.state.heading}
                    location={this.state.currentPosition}
                    ref={ref => this.mapComponent = ref}
                />

                {this.getManeuverView()}
                {this.getExitNavigation()}

                {/* <View style={{width: '100%', position: 'absolute', top: 0, paddingTop: 100, paddingRight: 50, paddingLeft: 50}}>

                    {this.getTutorial()}
                    {this.getARButton()}

                </View> */}

                
                {this.getSpecialOfferPopup()}

            </View>
        );
    }
}


var styles = StyleSheet.create({
    popupText: {
        //fontFamily: 'Poppins, sans-serif',
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
        //fontFamily: 'Poppins, sans-serif',
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
        //fontFamily: 'Poppins, sans-serif',
    },

    subtext : {
        fontSize: 10,
        color: '#939393',
        //fontFamily: 'Poppins, sans-serif',
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
        //fontFamily: 'Poppins, sans-serif',
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
