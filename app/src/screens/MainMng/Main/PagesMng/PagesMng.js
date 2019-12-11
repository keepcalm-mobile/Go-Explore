import React from 'react';
import NotificationsScreen from './Notifications';
import CalendarScreen from './Calendar';
import CategoriesMng from './CategoriesMng';
import BookmarksScreen from './Bookmarks';
import ArgRealScreen from './ArgReal';
import {createBottomTabNavigator} from 'react-navigation';
import {screens} from '../../../../constants';
import s from './style';

import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform, ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import EventsBridge from "../../../../utils/EventsBridge";

const LATITUDE = 25.2864106;
const LONGITUDE = 51.5271888;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const GPS_TIMEOUT = 60000;
const GPS_MAXIMUM_AGE = 60000; // current location caching duration in milliseconds

const TabsNavi = createBottomTabNavigator({
        [screens.Notifications]  : { screen: NotificationsScreen},
        [screens.Calendar] : { screen: CalendarScreen},
        [screens.DataPages] : { screen: CategoriesMng},
        [screens.Bookmarks]    : { screen: BookmarksScreen},
        [screens.VirtualReality]  : { screen: ArgRealScreen},
    },{
        initialRouteName: screens.DataPages,
        initialRouteKey: screens.DataPages + 'Key',
        backBehavior:'history',
        // transparentCard: true,
        defaultNavigationOptions: {
            gesturesEnabled: true,
            tabBarVisible: false,
        },
    cardShadowEnabled: false,
    }
);


class PagesMng extends React.Component<Props> {
    static router = TabsNavi.router;

    constructor(props) {
        super(props);

        this.state = {
            gpsGranted: false,
            currentPosition: []
        };

        console.log('MNG PAGES CONSTRUCT : ' + JSON.stringify(props));
    }

    render() {
        const { navigation } = this.props;

        //TODO: enable other screens, was: navigation

        return (
            <TabsNavi navigation={navigation} style={s.container}/>
        );
    }

    componentDidMount() {
        if (Platform.OS === 'android' && this.state.gpsGranted !== true) {
            this.requestPermission();
        }
        else {
            this.getCurrentPosition();
        }
    }

    async requestPermission() {
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

                    ToastAndroid.showWithGravity(
                        'GPS granted After request',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );

                    this.setState({gpsGranted: true});
                    this.getCurrentPosition();
                }
            } catch (ex) {
                //console.log(ex);
            }
        }
    }

    setPosition(position) {

        console.log("Position updated:");
        console.log(position);

        let pos = {latitude: position.coords.latitude, longitude: position.coords.longitude};

        console.log(JSON.stringify(position));

        this.setState({
            currentPosition: pos,
        });

        EventsBridge.updateLocation(pos);
    }

    getCurrentPosition() {
        if (Platform.OS === 'android' && PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
            this.setState({ gpsGranted: true });
        }
        else if (Platform.OS === 'ios'){
            this.setState({ gpsGranted: true });
        }
        else {
            return;
        }

        Geolocation.getCurrentPosition(
            position => {
                this.setPosition(position);
                // const target = position;
                // target.coords.latitude += 0.0020;
                // target.coords.longitude += 0.0020;
                // this.setTargetPosition(target);

                AsyncStorage.setItem('LastGPS', JSON.stringify(position));

                // setTimeout(() => {
                //     if (this._map)
                //         {this._map.animateToCoordinate(position.coords, 0);} // deprecated, but works
                //
                // }, 300);

                Geolocation.watchPosition(position => this.setPosition(position), error => {
                        // ToastAndroid.showWithGravity(
                        //     'Watch position error: ' + JSON.stringify(error),
                        //     ToastAndroid.LONG,
                        //     ToastAndroid.CENTER,
                        // );
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
}

export default PagesMng;
