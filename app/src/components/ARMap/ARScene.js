'use strict';

import React, { Component } from 'react';

import {View, StyleSheet, PermissionsAndroid, ToastAndroid} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroFlexView,
    ViroImage,
    ViroNode,
    ViroARSceneNavigator
} from 'react-viro';

import PointOfInterest from './PointOfInterest';
import EventsBridge from '../../utils/EventsBridge';
// import PoisData from './pois.json';
// import OffersData from './offers.json';

const NORMALIZATION_MAXIMUM = 10;
const NORMALIZATION_MINIMUM = 7;

const CURRENT_TEST_LOCATION = [40.6976637,-74.1197639];
const CORRECTION_ANGLE = 0; // poi image starts drawing from the left, so it compensates it

var canUpdateCamera = true;

//46.9537502
//31.9936326

//current location:
//lat: 46.95364
//lon: 31.99375

//near north
//46.9591975,31.9945625

const MAX_AR_OBJECTS = 6; // Limit for places and offers, so the phone will not be running out of memory and stop the app

var updateCounter = 0;

var POIs = [

    // {latitude: 85, longitude: -135.0005567, distance: 0, position: [0,10,0], title: 'NORTH poi', rating: 0, votes: '0', type: 'custom'},
    // {latitude: 46.9591975, longitude: 31.9945625, distance: 0, position: [0,10,0], title: 'Loading pois from json', rating: 0, votes: '0', icon: 'custom'},

    // {latitude: 46.9664069, longitude: 32.001888, distance: 0, position: [0,10,0], title: 'City Center', rating: 5, votes: '900', type: 'shop'},
    // {latitude: 46.9541553, longitude: 31.9935474, distance: 0, position: [0,10,0], title: 'ATM', rating: 3, votes: '817', type: 'atm'},
    // {latitude: 46.9678573, longitude: 31.9906763, distance: 0, position: [0,10,0], title: 'McDonalds', rating: 3, votes: '1.1k', type: 'coffee'},
    // {latitude: 46.8512408, longitude: 32.012833, distance: 0, position: [0,10,0], title: 'Skate Park', rating: 3, votes: '276', type: 'coffee'},
];

var OFFERS = [];

// [
//     {"latitude": 46.9591975, "longitude": 31.9945625, "distance": 0, "position": [0,10,0], "title": "Near north poi", "rating": 0, "votes": "0", "type": "custom"},
//     {"latitude": 46.9664069, "longitude": 32.001888, "distance": 0, "position": [0,10,0], "title": "City Center", "rating": 5, "votes": "900", "type": "shop"},
//     {"latitude": 46.9541553, "longitude": 31.9935474, "distance": 0, "position": [0,10,0], "title": "ATM", "rating": 3, "votes": "817", "type": "atm"},
//     {"latitude": 46.9678573, "longitude": 31.9906763, "distance": 0, "position": [0,10,0], "title": "McDonalds", "rating": 3, "votes": "1.1k", "type": "coffee"},
//     {"latitude": 46.8512408, "longitude": 32.012833, "distance": 0, "position": [0,10,0], "title": "Skate Park", "rating": 3, "votes": "276", "type": "coffee"}
// ]

var TRUE_NORTH = {latitude: 85, longitude: -135.0005567};

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
    return radians * (180/Math.PI);
}

function polarToCartesian(angle, radius) {
    let x,y;

    x = radius * Math.cos(degreesToRadians(angle));
    y = radius * Math.sin(degreesToRadians(angle));

    //console.log('polarToCartesian: angle = ' + angle + '  radius =  ' + radius + '   x = ' + x);

    return [x,y];
}

function cartesianToPolar(x, y){
    let distance = Math.sqrt(x*x + y*y);
    let radians = Math.atan2(y,x); //This takes y first
    let degrees = radiansToDegrees(radians);
    let polarCoor = { distance:distance, degrees:degrees };
    return polarCoor;
}

function getDistanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2-lat1);
    const dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return (earthRadiusKm * c * 1000).toFixed(2); // meters, ex.: 102.04
}

class ARScene extends React.Component {

    constructor(props) {
        super(props);

        // Set initial state here
        this.state = {
            text : "Initializing AR...",
            text2: "Getting device heading...",
            currentPosition: props.location ? props.location : {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
            initialPosition: {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
            normalizationMaximumPoint: null,
            initialHeading: this.props.heading,
            //heading: this.props.heading,
            pois: this.props.poisData,
            offers: this.props.offersData,
            poisReady: false,
            northPosition: [0,0, -7],
            calibrationOffset: false,
            trackingLostCount: 0,
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {},
            onTrackingLost: props.onTrackingLost ? this.props.onTrackingLost : () => {}
        };

        // bind 'this' to functions
        this._groupPOIs = this._groupPOIs.bind(this);
        this._onInitialized = this._onInitialized.bind(this);
        this._latLongToMerc = this._latLongToMerc.bind(this);
        this._transformPointToAR = this._transformPointToAR.bind(this);
        this.trackDeviceHeading = this.trackDeviceHeading.bind(this);
        this.onPOIClickedHandler = this.onPOIClickedHandler.bind(this);

        //this.heading = 0;
        //this.initialHeading = this.props.heading;
        this.cameraPosition = [0,0,0];
        this.PoiRefs = [];
        this.updateTimer = null;

        this.testPois = true;

        // temp value here
        for(let i=0;i<this.state.pois.length;i++) {
            this.PoiRefs.push(React.createRef());
        }

        // POIs = {...this.state.pois};
        // OFFERS = {...this.state.offers};

        let allPois = [...this.state.pois];
        POIs = [];
        for (let m = 0; m < allPois.length && m < MAX_AR_OBJECTS; m++) {
            POIs.push(allPois[m]);
            POIs[m].kind = 'poi';
        }

        let allOffers = [...this.state.offers];
        OFFERS = [];
        for (let m = 0; m < allOffers.length && m < MAX_AR_OBJECTS; m++) {
            OFFERS.push(allOffers[m]);
            OFFERS[m].kind = 'offer';
        }

        EventsBridge.arScene = this;

        // console.log("GOT POIS:");
        // console.log(this.state.pois);
        // console.log('ar scene props heading = ' + this.props.heading);
        // console.log('initial heading = ' + this.state.initialHeading);
        // console.log('trackingLostCount = ' + this.state.trackingLostCount);

        this._formARObjectsCollection();
    }

    componentDidMount() {

        // console.log(PoisData);
        // console.log(JSON.stringify(PoisData));

        // console.log('Before json: pois length = ' + POIs.length);
        // POIs  = PoisData;

        // console.log('After json: pois length = ' + POIs.length);

        this.trackDeviceHeading(); // UNCOMMENT AFTER TEST

        // if (this.testPois === true) {
        //     console.log("GOT POIS:");
        //     console.log(this.state.pois);
        //     this.testPois = false;
        // }

        //TODO: do we need this?

        // setInterval(() => {
        //
        //     canUpdateCamera = true;
        //
        // }, 400);

        // this._formARObjectsCollection();

        // setInterval(() => {
        //
        //     this.scene.getCameraOrientationAsync().then(
        //         (orientation)=>{
        //             // var cameraPosition = orientation.position;
        //             // markerPosition = [markerPosition[0] + cameraPosition[0], 0, markerPosition[2] + cameraPosition[2]];
        //             // markerPosition is now offset by the camera's offset.
        //             console.log(orientation);
        //         }
        //     );
        //
        // }, 14000);
    }

    render() {

        //delete after test
        // return (
        //     <ViroARScene onTrackingUpdated={(state, reason) => {}}>
        //     </ViroARScene>
        // );

        return (
            this.getARScene()
        );
    }

    getARScene() {

        // console.log('AR scene render');

        // return null;

        if (!POIs || POIs.length < 1) {
            return null;
        }

        let pointsOfInterest = [];
        let currentPOIs = POIs;

        // console.log("type == "+typeof(currentPOIs));
        // console.log(currentPOIs);

        if (this.state.poisReady) {
            for (let i = 0; i < currentPOIs.length; i++) {
                pointsOfInterest.push(
                    <PointOfInterest
                        onClickHandler={this.onPOIClickedHandler}
                        key={i}
                        position={[currentPOIs[i].position.x, currentPOIs[i].position.y, -currentPOIs[i].position.z]}
                        coords={{latitude: currentPOIs[i].latitude, longitude: currentPOIs[i].longitude}}
                        title={currentPOIs[i].title}
                        subtitle={currentPOIs[i].subTitle}
                        distance={getDistanceBetweenCoordinates(currentPOIs[i].latitude, currentPOIs[i].longitude, this.state.currentPosition.latitude, this.state.currentPosition.longitude)}
                        rating={currentPOIs[i].rating}
                        // votes={currentPOIs[i].votes}
                        // icon={currentPOIs[i].icon}
                        offerEndDate={currentPOIs[i].offerEndDate}
                        offers={currentPOIs[i].offers}
                        kind={currentPOIs[i].kind}
                        ref={(ref) => {
                            this.PoiRefs[i] = ref;
                        }}
                    />
                );
            }
        }

        return (
            <ViroARScene ref={(scene)=>{this.scene = scene}} onTrackingUpdated={this._onInitialized} onCameraTransformUpdate={this.onCameraTransformUpdateHandler}>
                {/*<ViroText text={this.state.text2} scale={[.5, .5, .5]} position={[0, 0, -5]} style={styles.helloWorldTextStyle} ref={(ref) => { this.refText = ref }} />*/}

                {/*{this.getTestPOI()}*/}

                {pointsOfInterest}

            </ViroARScene>
        );
    }

    getTestPOI() {
        if (this.state.poisReady === true) {
            return (
                <ViroFlexView ref={(ref) => {
                    this.testRef = ref;
                }} position={this.state.northPosition} width={2} height={1} style={{backgroundColor: '#ffffff', justifyContent: 'center'}}>
                    <ViroText text={'NORTH???'} width={2} height={0.5} style={styles.helloWorldTextStyle} />
                </ViroFlexView>
            );
        }
        else {
            return null;
        }
    }

    setData(places, offers) {
        let allPois = places;
        POIs = [];
        for (let m = 0; m < allPois.length && m < MAX_AR_OBJECTS; m++) {
            POIs.push(allPois[m]);
            POIs[m].kind = 'poi';
        }

        let allOffers = offers;
        OFFERS = [];
        for (let m = 0; m < allOffers.length && m < MAX_AR_OBJECTS; m++) {
            OFFERS.push(allOffers[m]);
            OFFERS[m].kind = 'offer';
        }

        this._formARObjectsCollection();
    }

    setHeading(degree) {
        this.heading = degree;

        // if (this.initialHeading === -1) {
        //     this.initialHeading = degree;
        // }
    }

    reset() {
        if (EventsBridge.arComponent != null) {
            EventsBridge.arComponent.exitNavigation();
        }

        if (this.updateTimer !== null) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    setCalibrationOffset() {
        let polar = cartesianToPolar(this.state.northPosition[0], this.state.northPosition[2]);
        let poiPolar = cartesianToPolar(TRUE_NORTH.latitude, TRUE_NORTH.longitude);
        let difference = polar.degrees - poiPolar.degrees;

        this.setState({calibrationOffset: difference});

        // console.log('NORTH = ' + polar.degrees);
        // console.log('POI North = ' + poiPolar.degrees);
        // console.log('Difference = ' + difference);
    }

    onCameraTransformUpdateHandler(camera) {

        return;

        if (canUpdateCamera === true) {
            console.log('position: '+JSON.stringify(camera.position));
            console.log('rotation: '+JSON.stringify(camera.rotation));
            console.log('forward: '+JSON.stringify(camera.forward));
            console.log('up: '+JSON.stringify(camera.up));

            canUpdateCamera = false;
        }

    }

    // if there is no place with this placeId, the offer will remain independent
    setOfferForPlace(offer) {
        for (let i=0;i<POIs.length;i++) {
            if (POIs[i].id === offer.placeId) {
                POIs[i].offers.push(offer);
                return null;
                break;
            }
        }

        return offer;
    }

    onPOIClickedHandler(poi) {

        console.log('AR Scene CLICKED: ' + poi.title);
        console.log('AR Scene state = ' + this.state);

        this.state.onClickHandler(poi);
    }

    _onInitialized(state, reason) {

        //return;

        if (state == ViroConstants.TRACKING_NORMAL) {

            console.log('Tracking normal');

            this.scene.getCameraOrientationAsync().then(
                (orientation)=>{
                    console.log(orientation);

                    this.cameraPosition = orientation.position;
                    // this.setState({northPosition: [3,1, -8]});

                    this.initialHeading = this.heading;

                    this.setPointsOfInterest();
                    // setTimeout(() => {
                    //     this.setPointsOfInterest();
                    // }, 1000);

                    console.log('>>Initial heading = ' + this.initialHeading);
                }
            );

            //setTimeout(() => {
            //     this.setState({northPosition: [3,1, -8]});
            //     console.log('repositioned');
            //}, 200);

        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
            console.log('Tracking NONE!!!!');

            //this.state.onTrackingLost();
        }
        else {


            let trackingLostCount = this.state.trackingLostCount + 1;
            console.log('On Initialized else? Tracking lost count = ' + trackingLostCount);

            this.setState({poisReady: false, trackingLostCount: trackingLostCount});

            if (trackingLostCount >= 2) {
                this.reset();
                this.state.onTrackingLost();
            }
        }
    }

    trackDeviceHeading() {

        //console.log('this = ', this);

        // const degree_update_rate = 10; // Number of degrees changed before the callback is triggered
        // RNSimpleCompass.start(degree_update_rate, (degree) => {
        //this.setState({heading: degree});

        //HEADING = degree;

        let degree = this.heading;

        // if (this.initialHeading === -1) {
            //this.setState({initialHeading: degree});

            this.initialHeading = this.props.heading;
            // console.log('Setting points of interest... initial heading set to = ' +  degree);

            //this.setPointsOfInterest();

            // setTimeout(() => {
            //     this.setPointsOfInterest();
            // }, 1000);

            //setInterval
        this.updateTimer = setInterval(() => {
                this.setPointsOfInterest();
                // console.log('pois ready = ' + this.state.poisReady);
            }, 2000);
        // }

        // this.setState({text2: 'Initial: ' + this.state.initialHeading + '\n current: ' + this.state.heading});
        // });
    }

    setPointsOfInterest() {
        updateCounter++;

        if (!this.state.pois || this.state.pois.length < 1) {
            return null;
        }

        //// no more need in this
        // this._formARObjectsCollection(); // Merge Offers and POIs into a single array

        //POIs = [...this.state.pois];
        // let allPois = [...this.state.pois];
        // POIs = [];
        // for (let m = 0; m < allPois.length && m < 10; m++) {
        //     POIs.push(allPois[m]);
        // }

        // console.log("POIS = " + POIs);

        for (let i = 0; i<POIs.length; i++){
            POIs[i].distance = getDistanceBetweenCoordinates(this.state.initialPosition.latitude, this.state.initialPosition.longitude, POIs[i].latitude, POIs[i].longitude);
        }

        // console.log('initial heading = ' + this.state.initialHeading);

        for (let j = 0; j < POIs.length; j++) {
            POIs[j].position = this._normalize({latitude: POIs[j].latitude, longitude: POIs[j].longitude});

            // console.log("poi "+j+" angle: " + cartesianToPolar(POIs[j].position.x, POIs[j].position.z).degrees);
        }

        // console.log('before grouping');

        this._groupPOIs();

        // console.log('after grouping');

        // return;

        if (this.state.poisReady === true) {
            // problem with NaN persists
            for (let j=0;j<POIs.length;j++) {
                if (this.PoiRefs[j] && this.PoiRefs[j].setPosition && !isNaN(POIs[j].position.x) && !isNaN(POIs[j].position.y) && !isNaN(POIs[j].position.z)) {

                    let finalX = POIs[j].position.x;// + this.cameraPosition[0];
                    let finalY = POIs[j].position.y;
                    let finalZ = POIs[j].position.z;// + this.cameraPosition[2];

                    this.PoiRefs[j].setPosition([finalX, finalY, finalZ]);
                }

                // console.log("poi "+j+" angle: " + cartesianToPolar(POIs[j].position.x, POIs[j].position.z).degrees + "  Y = " + POIs[j].position.y);
            }

            console.log('pois repositioned: ' + POIs.length);
        }

        //console.log('Skate park: ' + JSON.stringify(POIs[3].position) + '  ih = ' + this.state.initialHeading);

        // if (this.state.calibrationOffset === false) {
        //     this.setCalibrationOffset();
        // }

        if (updateCounter < 2) {
            this.setPointsOfInterest();
        }
    }

    _latLongToMerc(lat_deg, lon_deg) {
        var lon_rad = (lon_deg / 180.0 * Math.PI);
        var lat_rad = (lat_deg / 180.0 * Math.PI);
        var sm_a = 6378137.0;
        var xmeters  = sm_a * lon_rad;
        var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
        return ({x:xmeters, y:ymeters});
    }

    _transformPointToAR(lat, long) {
        var objPoint = this._latLongToMerc(lat, long);
        var devicePoint = this._latLongToMerc(this.state.initialPosition.latitude, this.state.initialPosition.longitude);  //this._latLongToMerc(47.618534, -122.338478);
        // var devicePoint = this._latLongToMerc(CURRENT_TEST_LOCATION[0], CURRENT_TEST_LOCATION[1]);

        // latitude(north,south) maps to the z axis in AR
        // longitude(east, west) maps to the x axis in AR
        var objFinalPosZ = objPoint.y - devicePoint.y;
        var objFinalPosX = objPoint.x - devicePoint.x;
        //flip the z, as negative z(is in front of us which is north, pos z is behind(south).

        //TEST
        // return ({x:objFinalPosX, z:-objFinalPosZ});

        let polar = cartesianToPolar(objFinalPosX, objFinalPosZ);

        // console.log('transform to AR: ' + polar.degrees);

        //180 + CORRECTION_ANGLE
        polar.degrees += CORRECTION_ANGLE + this.state.initialHeading; //+ this.initialHeading;// + this.state.calibrationOffset; // +90 cuz x is right to left, so 0 is left, -90 is forward     ////(360 - this.state.initialHeading) + 180; // +180 since we need to invert Z in AR space

        // console.log('Adjusted: ' + polar.degrees);

        let finalCoords = polarToCartesian(polar.degrees, polar.distance);

        return ({x:finalCoords[0], z:-finalCoords[1]});
        //return ({x: objFinalPosX, z: -objFinalPosZ});
    }

    //normalization
    _normalize(pos) {
        //return (val - min) / (max - min);

        // let distanceToPoint = getDistanceBetweenCoordinates(pos.latitude, pos.longitude, CURRENT_TEST_LOCATION[0], CURRENT_TEST_LOCATION[1]);
        let curPos = this._transformPointToAR(pos.latitude, pos.longitude);

        //TEST
        //return {x: curPos[0], y: 0, z: curPos[1]};

        //ToastAndroid.showWithGravity('pos = ' + JSON.stringify(pos) + '  cur pos = ' + JSON.stringify(curPos), ToastAndroid.LONG, ToastAndroid.CENTER);

        let polar = cartesianToPolar(curPos.x, curPos.z);

        if (polar.distance < 8)
            polar.distance = 8;
        if (polar.distance > 10)
            polar.distance = 10;

        let finalCoords = polarToCartesian(polar.degrees, polar.distance);

        return {x: finalCoords[0], y: 0, z: finalCoords[1]};
    }

    _clamp(value, minimum, maximum) {
        if (value < minimum)
            value = minimum;
        if (value > maximum)
            value = maximum;

        return value;
    }

    _groupPOIs() {

        // let arr = [...POIs];
        //
        // ToastAndroid.showWithGravity(JSON.stringify(arr), ToastAndroid.LONG, ToastAndroid.CENTER);

        // let difference = 10;
        //
        // //sort(POIs).asc(x => cartesianToPolar(x.position.x, x.position.z).degrees);
        //

        let difference = 70;

        let height = 0.05;
        let inc = 0.85;
        //let found = 0;
        let res = 0;
        //let firstIndex = 0;

        let checked = [];

        for(let i=0;i<POIs.length;i++) {
            res = cartesianToPolar(POIs[i].position.x, POIs[i].position.z).degrees;

            if (res < 0)
                res = 360 + res;

            if (checked.includes(i) === false) {

                checked.push(i);

                // if Y > 0 it will be rescaled
                height = 0.05;
                POIs[i].position.y = height;
                height += inc;

                if (typeof (this.PoiRefs[i]) !== 'undefined' && typeof (this.PoiRefs[i].state) !== 'undefined' && typeof (this.PoiRefs[i].state.offers) !== 'undefined' && this.PoiRefs[i].state.offers.length > 0) {
                    if (this.PoiRefs[i].state.isMinimized === false)
                        height += 1 * this.PoiRefs[i].state.offers.length; // TODO: Set offer height somewhere
                    else
                        height += 1;
                }

                for (let k = 0; k < POIs.length; k++) {
                    if (k !== i) {
                        let degrees = cartesianToPolar(POIs[k].position.x, POIs[k].position.z).degrees;

                        if (degrees < 0)
                            degrees = 360 + degrees;

                        let dif = Math.abs(res - degrees);

                        if (dif <= difference) {
                            checked.push(k);

                            POIs[k].position.y = height;
                            height += inc;

                            if (typeof (this.PoiRefs[k]) !== 'undefined' && typeof (this.PoiRefs[k].state) !== 'undefined' && typeof (this.PoiRefs[k].state.offers) !== 'undefined' && this.PoiRefs[k].state.offers.length > 0) {
                                if (this.PoiRefs[k].state.isMinimized === false)
                                    height += 1 * this.PoiRefs[k].state.offers.length; // TODO: Set offer height somewhere
                                else
                                    height += 1;
                            }
                        }
                    }
                }
            }
        }

        this.setState({poisReady: true});
    }

    _formARObjectsCollection() {
        let collection = [];
        let independentOffers = [];
        let k = 0;

        for (let i=0;i<POIs.length;i++) {
            POIs[i].offers = [];
            POIs[i].kind = "poi";
        }

        for (let i=0;i<OFFERS.length;i++) {
            let iOffer = this.setOfferForPlace(OFFERS[i]);

            if (iOffer !== null) {
                independentOffers.push(iOffer);
            }
        }

        collection = [...POIs];

        for (let i=0;i<independentOffers.length;i++) {
            independentOffers[i].kind = "offer";
            // independentOffers[i].offers = [];
            // independentOffers[i].offers.push({
            //     "title": independentOffers[i].title.substring(0, 5),
            //     "text": independentOffers[i].subTitle.substring(0, 3),
            //     "titleExpanded": independentOffers[i].title,
            //     "textExpanded": independentOffers[i].subTitle,
            //     "textPopup": independentOffers[i].subTitle,
            //     "location": independentOffers[i].location,
            //     "type": "timer",
            //     "expireDate": independentOffers[i].offerEndDate.substring(6, 13)
            // });
            collection.push(independentOffers[i]);
        }

        POIs = collection;

        // for (let i = 0; i < PoisData.length; i++, k++) {
        //     collection.push(PoisData[i]);
        //     collection[k].position = [0, 10, -10];
        //     collection[k].distance = 0;
        // }

        // for (let i = 0; i < OffersData.length; i++, k++) {
        //     collection.push(OffersData[i]);
        //     collection[k].position = [0, 10, -10];
        //     collection[k].distance = 0;
        // }
        //
        // if (EventsBridge.arSceneCurrentNavigationItem !== null) {
        //     collection.push(EventsBridge.arSceneCurrentNavigationItem);
        // }

        // POIs = collection;

        // console.log("Formed collection:");

        // for(let i=0;i<POIs.length;i++) {
        //     console.log(POIs[i].kind);
        // }

        // console.log(JSON.stringify(collection));
    }
}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    titleContainer: {
        backgroundColor: '#ffffffaa',
        flexDirection: 'column',
        padding: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = ARScene;
