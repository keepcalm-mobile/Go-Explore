
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Alert
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import MapViewNavigation, { NavigationModes, TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';

const getMethods = (obj) => {
  let properties = new Set();
  let currentObj = obj;
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)));
  return [...properties.keys()].filter(item => typeof obj[item] !== 'function');
};

//Disable warnings box
console.disableYellowBox = true;

const windowH = Dimensions.get('window').height;
const windowW = Dimensions.get('window').width;
const tripleWidth = windowW * 3;
const maskOffset = windowH - 400;

import mapStyles from './mapStyles.json';
const CURRENT_TEST_LOCATION = [46.95364, 31.99375];
const GOOGLE_MAPS_APIKEY = 'AIzaSyA7rncWjnX4Ugd5OoCnMNNT2D3KfDlgp6Y'; // TODO: Change it to a proper key, currently it is only for testing (In AndroidManifest.xml too)

const LATITUDE = CURRENT_TEST_LOCATION[0];
const LONGITUDE = CURRENT_TEST_LOCATION[1];
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const AppFonts = {
  regular: 'Akkurat-Normal',
  bold: 'Akkurat-Bold',
  light: 'Akkurat-Light'
};

/**
 * Set to true to use the controls methods instead of props
 * @type {boolean}
 */
const USE_METHODS = true;

export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE - 0.003,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      heading: props.heading ? props.heading : -1,
      currentPosition: props.location ? props.location : {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
      origin: {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
      destination: false,
      navigationMode: NavigationModes.IDLE,
      travelMode: TravelModes.DRIVING,
      isNavigation: false,
      route: false,
      step: false
    };

    //this.navigationTimer = null;
    this.startedNavigation = false;
    this.isPositionSet = false;
  }

  componentDidMount() {

  }

  render() {

    return (

        <View style={{flex: 1, flexDirection: 'row', height: '100%'}}>

          {this.getExitNavigation()}

          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: maskOffset}}>
            <View style={{backgroundColor: '#a0a0ff', width: tripleWidth, height: tripleWidth, borderRadius: tripleWidth, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View
                  style={{
                    backgroundColor: '#afc3ff',
                    width: windowW,//tripleWidth,
                    height: maskOffset, //700
                    //paddingTop: 50
                  }}
              >
                <MapView
                    ref={ref => this.refMap = ref}
                    provider={PROVIDER_GOOGLE}
                    //mapPadding={{top: 0,left: 0,right: 0, bottom: 50}}
                    style={{flex: 1}}
                    //customMapStyle={MapStyles}
                    initialRegion={{
                      latitude: this.state.currentPosition.latitude,
                      longitude: this.state.currentPosition.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    onMapReady={(res) => {

                    }}
                >
                  <MapViewNavigation
                      origin={this.state.origin}
                      destination={this.state.destination}
                      navigationMode={this.state.navigationMode}
                      travelMode={this.state.travelMode}
                      ref={ref => this.refNavigation = ref}
                      map={() => this.refMap}
                      apiKey={GOOGLE_MAPS_APIKEY}
                      simulate={false}
                      onRouteChange={route => this.setState({route})}
                      onStepChange={(step, nextStep) => this.setState({step, nextStep})}
                      displayDebugMarkers={true}
                      onNavigationStarted={route => console.log("Navigation Started")}
                      onNavigationCompleted={route => this.setState({isNavigation: false})}
                  />

                  {this.getCurrentPositionMarker()}
                </MapView>

              </View>
              {this.getManeuverView()}
            </View>
          </View>

        </View>
    );
  }

  setHeading(heading) {
    //this.setState({heading: heading});

    // console.log('Setting heading... this.isPositionSet = ' + this.isPositionSet);

    if (this.startedNavigation) {

      if (!this.refNavigation) {
        console.log('invalid this.refNavigation = ' + this.refNavigation);
        return;
      }

      if (this.isPositionSet === true) {
        this.refNavigation.updateBearing(heading);
      }
      else {

        this.isPositionSet = true;

        this.refNavigation.setPosition({
          ...this.state.currentPosition,
          heading: heading,
        });
      }



      //
      // this.refNavigation.allowUpdate(false); // TODO: add ability to update the map?
    }
  }

  setLocation(location) {
    this.setState({currentPosition: location});
  }

  navigateTo(target) {

    // if (this.state.navigationMode !== NavigationModes.IDLE) {
    //   clearInterval(this.navigationTimer);
    //   // this.navigationTimer = null;
    // }

    this.isPositionSet = false;
    this.startedNavigation = true;
    this.setState({destination: target});

    //setTimeout(() => {
      this.goDisplayRoute();

    //}, 1000);

     setTimeout(() => {

       if (this.startedNavigation === true) {
         this.goNavigateRoute();
       }


       // if (this.state.navigationMode !== NavigationModes.IDLE) {
       //   // clearInterval(this.navigationTimer);
       //   // this.navigationTimer = null;
       // }

      //  this.navigationTimer = setInterval(() => {
      //   this.refNavigation.setPosition({
      //     ...this.state.currentPosition,
      //     heading: this.state.heading,
      //   });
      //
      //   this.refNavigation.allowUpdate(false); // TODO: add ability to update the map?
      //
      // }, 500);

    }, 200);
  }

  getCurrentPositionMarker() {
    if (this.startedNavigation === true) {
      return null;
    }

    return (
        <Marker
            coordinate={this.state.currentPosition}
            title={'Current Position'}
            description={'You are here'}
        />
    );
  }

  getExitNavigation() {
    if (this.startedNavigation === false) {
      return null;
    }

    return (
        <TouchableOpacity style={{position: 'absolute', left: 0, top: 50, width: '100%', height: 50, backgroundColor: '#6b67ff', justifyContent: 'center'}}
                          onPress={this.exitNavigation.bind(this)}>
          <Text style={{fontSize: 16, color: '#ffffff', textAlign: 'center'}}>Exit navigation</Text>
        </TouchableOpacity>
    );
  }

  getManeuverView() {
    if (this.state.route === false) {
      return null;
    }

    return (
        <View style={{
          position: 'absolute',
          width: windowW,
          top: maskOffset - 170,
          //left: 0,
          //backgroundColor: '#aa66dd'
        }}>
          <ManeuverView
              step={this.state.step}
              fontFamily={AppFonts.light}
              fontFamilyBold={AppFonts.bold}
              arrowColor={'#cccccc'}
          />
        </View>
    );
  }

  /**
   * goDisplayRoute
   * @void
   */
  goDisplayRoute()
  {
    if(!this.validateRoute()) return;

    // There are two ways to display a route - either through the method
    // displayRoute or by setting the props.
    // The difference is that you get instant feedback when using methods vs props.

    if(USE_METHODS) {

      this.refNavigation.displayRoute(
          this.state.origin,
          this.state.destination,
          {
            mode: this.state.travelMode
          }
      ).then(route => {
        console.log(route);
      });

    } else {

      this.setState({
        navigationMode: NavigationModes.ROUTE,
      });
    }
  }

  /**
   * goNavigateRoute
   * @void
   */
  goNavigateRoute()
  {

    //ToastAndroid.showWithGravity('Navigation...', ToastAndroid.LONG, ToastAndroid.CENTER);

    if (!this.validateRoute()) return;

    //ToastAndroid.showWithGravity('VALID!...', ToastAndroid.LONG, ToastAndroid.CENTER);

    // There are two ways to navigate a route - either through the method
    // navigateRoute or by setting the props.
    // The difference is that you get instant feedback when using methods vs props.

    if (USE_METHODS) {

      this.refNavigation.navigateRoute(
          this.state.origin,
          this.state.destination,
          {
            mode: this.state.travelMode
          }
      ).then(route => {
        this.setState({
          isNavigation: true
        })
      });

    } else {

      this.setState({
        navigationMode: NavigationModes.NAVIGATION,
      });
    }
  }

  /**
   * validateRoute
   * @returns {boolean}
   */
  validateRoute()
  {
    return true; //TEST

    if(this.state.destination.length >= 3) return true;

    Alert.alert('Address required', 'You need to enter an address first');

    return false;
  }

  exitNavigation() {
    console.log('Exiting map navigation...');

    this.setState({
      navigationMode: NavigationModes.IDLE
    });

    this.refNavigation.clearRoute();
    this.startedNavigation = false;

    this.refNavigation.setPosition({
      ...this.state.currentPosition,
      heading: 0,
    });

    this.isPositionSet = false;

    // if (this.navigationTimer !== null) {
    //   clearInterval(this.navigationTimer);
    //   this.navigationTimer = null;
    // }
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

//module.exports = ViroSample;
