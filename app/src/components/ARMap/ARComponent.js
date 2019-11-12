'use strict';

import React, { Component } from 'react';

import {View, Text, Image, StyleSheet, PermissionsAndroid, ToastAndroid} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroFlexView,
  ViroImage,
  ViroNode,
  ViroARSceneNavigator
} from 'react-viro';
import EventsBridge from '../../utils/EventsBridge';

const InitialARScene = require('./ARScene');
const CURRENT_TEST_LOCATION = [40.6976637,-74.1197639];

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"38460969-8103-426A-81B8-C9F02A91C5C0",
};

class ARComponent extends React.Component {

  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      sharedProps: sharedProps,
      offersData: this.props.offersData,
      poisData: this.props.poisData,
      heading: this.props.heading,
      currentPosition: EventsBridge.currentLocation,
      onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {},
      onTrackingLost: props.onTrackingLost ? this.props.onTrackingLost : () => {}
    };

    console.log('ar component props.location = ');
    console.log(this.props.location);
  }

  componentDidMount() {
    
  }

  render() {

    // console.log('ar component render');

    return (
        <View style={{position: 'absolute', width: '100%', height: '100%', left: 0, top: 0}}>

          {this.getARNavigator()}

        </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  getARNavigator() {
    return (
        <ViroARSceneNavigator
            {...this.state.sharedProps}
            initialScene={{scene:InitialARScene,
            passProps:{onClickHandler: this.onPOIClickHandler.bind(this), onTrackingLost: this.onTrackingLostHandler.bind(this),
              location: this.state.currentPosition, heading: this.state.heading, poisData: this.state.poisData, offersData: this.state.offersData}}}
        />
    );
  }

  onPOIClickHandler(poi) {
    console.log('AR Component CLICKED: ' + poi.title);

    console.log('AR Component state = ' + this.state);

    this.state.onClickHandler(poi);
  }

  onTrackingLostHandler() {

    console.log('on tracking lost ar component');
    this.state.onTrackingLost();
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Poppins, sans-serif',
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

module.exports = ARComponent;
