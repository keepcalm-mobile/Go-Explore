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

const InitialARScene = require('./ARScene');
const CURRENT_TEST_LOCATION = [46.95364, 31.99375];

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
      currentPosition: props.location ? props.location : {latitude: CURRENT_TEST_LOCATION[0], longitude: CURRENT_TEST_LOCATION[1]},
      onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
    };
  }

  componentDidMount() {

  }

  render() {

    return (
        <View style={{position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, backgroundColor: '#33ff22'}}>{this.getARNavigator()}</View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  getARNavigator() {
    return (
        <ViroARSceneNavigator
            {...this.state.sharedProps}
            initialScene={{scene:InitialARScene,
            passProps:{onClickHandler: this.onPOIClickHandler.bind(this), location: this.state.currentPosition}}}
        />
    );
  }

  onPOIClickHandler(poi) {
    console.log('AR Component CLICKED: ' + poi.title);

    console.log('AR Component state = ' + this.state);

    this.state.onClickHandler(poi);
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

module.exports = ARComponent;
