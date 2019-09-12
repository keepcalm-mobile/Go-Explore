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

const NORMALIZATION_MAXIMUM = 10;
const NORMALIZATION_MINIMUM = 7;

const CURRENT_TEST_LOCATION = [46.95364, 31.99375];
const CORRECTION_ANGLE = 20; // poi image starts drawing from the left, so it compensates it

//46.9537502
//31.9936326

//current location:
//lat: 46.95364
//lon: 31.99375

var updateCounter = 0;

var POIs = [

    // {latitude: 85, longitude: -135.0005567, distance: 0, position: [0,10,0], title: 'NORTH poi', rating: 0, votes: '0', type: 'custom'},

    {latitude: 46.9664069, longitude: 32.001888, distance: 0, position: [0,10,0], title: 'City Center', rating: 5, votes: '900', type: 'shop'},
    {latitude: 46.9541553, longitude: 31.9935474, distance: 0, position: [0,10,0], title: 'ATM', rating: 3, votes: '817', type: 'atm'},
    {latitude: 46.9678573, longitude: 31.9906763, distance: 0, position: [0,10,0], title: 'McDonalds', rating: 3, votes: '1.1k', type: 'coffee'},
    {latitude: 46.8512408, longitude: 32.012833, distance: 0, position: [0,10,0], title: 'Skate Park', rating: 3, votes: '276', type: 'coffee'},
];

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
            initialHeading: -1,
            heading: props.heading,
            pois: [],
            poisReady: true,
            northPosition: [0,0, -7],
            calibrationOffset: false,
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this._latLongToMerc = this._latLongToMerc.bind(this);
        this._transformPointToAR = this._transformPointToAR.bind(this);
        this.trackDeviceHeading = this.trackDeviceHeading.bind(this);
        this.onPOIClickedHandler = this.onPOIClickedHandler.bind(this);

        this.PoiRefs = [];

        for(let i=0;i<POIs.length;i++) {
            this.PoiRefs.push(React.createRef());
        }
    }

    componentDidMount() {
        this.trackDeviceHeading();
    }

    render() {

        return (
            this.getARScene()
        );
    }

    getARScene() {

        console.log('AR scene render');

        let pointsOfInterest = [];
        let currentPOIs = [...this.state.pois];

        if (this.state.poisReady) {
            for (let i = 0; i < 10 && i < currentPOIs.length; i++) {
                pointsOfInterest.push(
                    <PointOfInterest
                        onClickHandler={this.onPOIClickedHandler}
                        key={i}
                        position={[currentPOIs[i].position.x, currentPOIs[i].position.y, -currentPOIs[i].position.z]}
                        coords={{latitude: currentPOIs[i].latitude, longitude: currentPOIs[i].longitude}}
                        title={currentPOIs[i].title}
                        distance={getDistanceBetweenCoordinates(currentPOIs[i].latitude, currentPOIs[i].longitude, this.state.currentPosition.latitude, this.state.currentPosition.longitude)}
                        rating={currentPOIs[i].rating}
                        votes={currentPOIs[i].votes}
                        type={currentPOIs[i].type}
                        ref={(ref) => {
                            this.PoiRefs[i] = ref;
                        }}
                    />
                );
            }
        }

        return (
            <ViroARScene ref={(scene)=>{this.scene = scene}} onTrackingUpdated={this._onInitialized} >
                {/*<ViroText text={this.state.text2} scale={[.5, .5, .5]} position={[0, 0, -5]} style={styles.helloWorldTextStyle} ref={(ref) => { this.refText = ref }} />*/}

                {/*<ViroFlexView position={this.state.northPosition} width={2} height={1} style={{backgroundColor: '#ffffff', justifyContent: 'center'}}>*/}
                {/*  <ViroText text={'NORTH'} width={2} height={0.5} style={styles.helloWorldTextStyle} />*/}
                {/*</ViroFlexView>*/}

                {pointsOfInterest}

            </ViroARScene>
        );
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

    onPOIClickedHandler(poi) {

        console.log('AR Scene CLICKED: ' + poi.title);
        console.log('AR Scene state = ' + this.state);

        this.state.onClickHandler(poi);
    }

    _onInitialized(state, reason) {

        //return;

        if (state == ViroConstants.TRACKING_NORMAL) {

            console.log('Tracking normal');

        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
            console.log('Tracking lost');
        }
        else {
            console.log('On Initialized else?');
        }
    }



    trackDeviceHeading() {

        //console.log('this = ', this);

        // const degree_update_rate = 10; // Number of degrees changed before the callback is triggered
        // RNSimpleCompass.start(degree_update_rate, (degree) => {
        //this.setState({heading: degree});

        //HEADING = degree;

        let degree = this.state.heading;

        if (this.state.initialHeading === -1) {
            this.setState({initialHeading: degree});

            console.log('Setting points of interest... initial heading set to = ' +  degree);

            this.setPointsOfInterest();

            setTimeout(() => {
                this.setPointsOfInterest();
            }, 1000);

            //setInterval
            setInterval(() => {
                this.setPointsOfInterest();
            }, 10000);
        }

        this.setState({text2: 'Initial: ' + this.state.initialHeading + '\n current: ' + this.state.heading});
        // });
    }

    setPointsOfInterest() {
        updateCounter++;

        for (let i = 0; i<POIs.length; i++){
            POIs[i].distance = getDistanceBetweenCoordinates(this.state.initialPosition.latitude, this.state.initialPosition.longitude, POIs[i].latitude, POIs[i].longitude);
        }

        for (let j = 0; j < POIs.length; j++) {
            POIs[j].position = this._normalize({latitude: POIs[j].latitude, longitude: POIs[j].longitude});
        }

        let difference = 40;
        let deg = -360;
        let iterations = 360 / difference * 2;

        for (let i=0;i<iterations;i++) {
            this._groupPOIs(deg, deg+difference);
            deg += difference;
        }

        // problem with NaN persists
        for (let j=0;j<POIs.length;j++) {
            if (this.PoiRefs[j] && this.PoiRefs[j].setPosition && !isNaN(POIs[j].position.x) && !isNaN(POIs[j].position.y) && !isNaN(POIs[j].position.z)) {
                this.PoiRefs[j].setPosition([POIs[j].position.x, POIs[j].position.y, POIs[j].position.z]);

                //this.PoiRefs[j].setAngle(cartesianToPolar(POIs[j].position.x, POIs[j].position.z).degrees);
            }
        }

        //ToastAndroid.showWithGravity(JSON.stringify(pos), ToastAndroid.LONG, ToastAndroid.CENTER);

        this.setState({pois: POIs});

        if (this.state.calibrationOffset === false) {
            this.setCalibrationOffset();
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

        let polar = cartesianToPolar(objFinalPosX, objFinalPosZ);

        // console.log('transform to AR: ' + polar.degrees);

        //180 + CORRECTION_ANGLE
        polar.degrees += CORRECTION_ANGLE;// + this.state.calibrationOffset; // +90 cuz x is right to left, so 0 is left, -90 is forward     ////(360 - this.state.initialHeading) + 180; // +180 since we need to invert Z in AR space

        // console.log('Adjusted: ' + polar.degrees);

        let finalCoords = polarToCartesian(polar.degrees, polar.distance);

        return ({x:finalCoords[0], z:-finalCoords[1]});
        //return ({x: objFinalPosX, z: -objFinalPosZ});
    }

    //normalization
    _normalize(pos) {
        //return (val - min) / (max - min);

        let distanceToPoint = getDistanceBetweenCoordinates(pos.latitude, pos.longitude, CURRENT_TEST_LOCATION[0], CURRENT_TEST_LOCATION[1]);
        let curPos = this._transformPointToAR(pos.latitude, pos.longitude);

        //ToastAndroid.showWithGravity('pos = ' + JSON.stringify(pos) + '  cur pos = ' + JSON.stringify(curPos), ToastAndroid.LONG, ToastAndroid.CENTER);

        let polar = cartesianToPolar(curPos.x, curPos.z);
        //polar.distance = NORMALIZATION_MAXIMUM * 2000 / distanceToPoint;

        // console.log('polar = ' + JSON.stringify(polar) + '  curPos = ' + JSON.stringify(curPos) + '  pos = ' + JSON.stringify(pos));

        if (polar.distance < 6)
            polar.distance = 6;
        if (polar.distance > 10)
            polar.distance = 10;

        let finalCoords = polarToCartesian(polar.degrees, polar.distance);

        //console.log('poi: pos = ' + JSON.stringify(pos) + '  ||  ' + JSON.stringify(finalCoords));

        //ToastAndroid.showWithGravity('north = ' + JSON.stringify(finalCoords), ToastAndroid.LONG, ToastAndroid.CENTER);

        return {x: finalCoords[0], y: 0, z: finalCoords[1]};
    }

    _clamp(value, minimum, maximum) {
        if (value < minimum)
            value = minimum;
        if (value > maximum)
            value = maximum;

        return value;
    }

    _groupPOIs(degreeMin, degreeMax) {

        // let arr = [...POIs];
        //
        // ToastAndroid.showWithGravity(JSON.stringify(arr), ToastAndroid.LONG, ToastAndroid.CENTER);

        // let difference = 10;
        //
        // //sort(POIs).asc(x => cartesianToPolar(x.position.x, x.position.z).degrees);
        //

        let height = 0;
        let inc = 0.85;
        let found = 0;
        let res = degreeMin;
        let firstIndex = 0;

        for(let i=0;i<POIs.length;i++) {
            res = cartesianToPolar(POIs[i].position.x, POIs[i].position.z).degrees;
            if (res >= degreeMin && res <= degreeMax) {

                //ToastAndroid.showWithGravity('degree = '+res, ToastAndroid.LONG, ToastAndroid.CENTER);
                POIs[i].position.y = height;
                height += inc;

                if (found == 0) {
                    firstIndex = i;
                }

                found++;
            }
        }

        if (found > 1) {
            POIs[firstIndex].position.y = 0.05; // if Y > 0 it will be rescaled
        }

        //ToastAndroid.showWithGravity('found = '+found + '  degrees = ' + res, ToastAndroid.LONG, ToastAndroid.CENTER);
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
