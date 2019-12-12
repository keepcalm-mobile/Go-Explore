
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const GPS_TIMEOUT = 60000;
const GPS_MAXIMUM_AGE = 60000; // current location caching duration in milliseconds

class EventsBridge {
    static arComponent = null;
    static arScene = null;
    static mapRef = null;
    static arScreenRef = null;
    static arSceneCurrentNavigationItem = null;
    static currentPlacesData = [];
    static groupingARIteration = 0;
    static startedNavigation = false;
    static currentRoute = false;
    static currentRouteStep = false;
    static gpsGranted = false;
    static isARPaused = false;

    static currentLocation = {
        latitude: 25.2864106,
        longitude: 51.5271888
    };

    static updateLocation(location) {
        this.currentLocation = location;

        console.log("EventsBridge, location:");
        console.log(this.currentLocation);

        if (this.mapRef) {
            this.mapRef.setLocation(location);
        }

        if (this.arScreenRef) {
            this.arScreenRef.setPosition(location);
        }
    }

    static async requestPermission() {
        if (Platform.OS === 'android') {
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
                    this.gpsGranted = true;
                    this.getCurrentPosition();
                }
            } catch (ex) {
                //console.log(ex);
            }
        }
    }

    static setPosition(position) {

        console.log("Position updated in EB");
        // console.log(position);

        let pos = {latitude: position.coords.latitude, longitude: position.coords.longitude};

        this.updateLocation(pos);
    }

    static getCurrentPosition() {
        if (Platform.OS === 'android' && PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
            this.gpsGranted = true;
        }
        else if (Platform.OS === 'ios'){
            this.gpsGranted = true;
        }
        else {
            this.gpsGranted = false;
            return;
        }

        Geolocation.getCurrentPosition(
            position => {
                this.setPosition(position);

                AsyncStorage.setItem('LastGPS', JSON.stringify(position));

                Geolocation.watchPosition(position => this.setPosition(position), error => {

                },
                {enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: GPS_MAXIMUM_AGE});
            },
            error => {
                this.getCurrentPosition();
            },
            {enableHighAccuracy: true, timeout: GPS_TIMEOUT, maximumAge: GPS_TIMEOUT},
        );
    }
}

export default EventsBridge;
