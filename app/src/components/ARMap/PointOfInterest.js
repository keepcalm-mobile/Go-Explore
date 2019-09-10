'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroFlexView,
    ViroImage, ViroNode
} from 'react-viro';

import frame from './res/frame.png';

import iconCafe from './res/icon_cafe.png';
import iconShop from './res/icon_shop.png';
import iconATM from './res/icon_atm.png';

import  rating1 from './res/rating_1.png';
import  rating2 from './res/rating_2.png';
import  rating3 from './res/rating_3.png';
import  rating4 from './res/rating_4.png';
import  rating5 from './res/rating_5.png';

export default class PointOfInterest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: props.rating ? props.rating : 3,
            votes: props.votes ? props.votes : 0,
            title: props.title ? props.title : 'Coffee shop',
            distance: props.distance ? props.distance : 47,
            position: props.position ? props.position : [0,0,-7],
            coords: props.coords ? props.coords : {latitude: 0, longitude: 0},
            type: props.type ? props.type : 'coffee',
            scale: [1,1,1],
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    setPosition(position) {
        this.node.setNativeProps({position: position});

        //this.setState({title: 'y = ' + position[1]});

        // if there are multiple POIs in the same direction, they are ordered by Y and it will be > 0
        if (position[1] > 0) {
            this.setState({scale: [0.75,0.75,0.75]});
        }
    }

    setAngle(angle) {
        this.setState({votes: angle})
    }

    onClickHandler(position, source) {
        const CITY_CENTER = `Central Ave, 98, Mykolaiv, Mykolaivs\'ka oblast, 54000`; // {latitude: 46.9664069, longitude: 32.001888};
        console.log('CLICKED: ' + this.state.title);
        this.state.onClickHandler({
            title: this.state.title,
            coords: this.state.coords,
            target: CITY_CENTER
        });
    }

    render() {


        let currentIcon = iconCafe;
        let currentPosition = [0,0.5, -9];
        let rate = rating4;

        if (this.state.type === 'shop') {
            currentIcon = iconShop;
            rate = rating5;
            currentPosition = [-6,0, -11];
        }
        else if (this.state.type === 'atm') {
            currentIcon = iconATM;
            rate = rating3;
            currentPosition = [4.5, 0, -7];
        }

        if (this.state.type !== 'custom') {
            return (

                <ViroNode scale={this.state.scale} position={currentPosition} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }} onClick={this.onClickHandler}>
                    <ViroImage  height={1} width={4} source={frame} />
                    <ViroImage position={[-1.45,0,0.25]}  height={0.8} width={0.8} source={currentIcon} />

                    <ViroImage position={[0,-0.2,0.25]} height={0.315} width={1.83} source={rate} />
                    <ViroText position={[0.6,0.15,0.25]} width={3} text={(this.state.title + '   ' + this.state.distance + 'm')} style={styles.text}  />
                    <ViroText position={[1.55,-0.35,0.25]} width={1} text={this.state.votes + ' votes'} style={styles.textSmall}  />
                    <ViroText position={[1.55,-0.15,0.25]} width={1} text={(this.state.distance / 1000 / 5 * 60).toFixed(2) + ' min'} style={styles.textSmall}  />

                    {/*<ViroImage position={[-0.4,-0.1,0.05]}  height={0.2} width={0.2} source={require('../../res/icon_star.png')} />*/}
                    {/*<ViroImage source={require('../../res/cs.png')} width={2.79} height={1} />*/}

                    {/*<ViroFlexView position={[0,-0.1,0.5]} height={0.4} width={1.2}>*/}
                    {/*    {rating}*/}
                    {/*</ViroFlexView>*/}
                </ViroNode>
            );
        }
        else {
            return (

                <ViroNode scale={this.state.scale} position={currentPosition} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }}>
                    <ViroImage  height={1} width={4} source={frame} />
                    <ViroImage position={[-1.45,0,0.25]}  height={0.8} width={0.8} source={currentIcon} />

                    <ViroImage position={[0,-0.2,0.25]} height={0.315} width={1.83} source={rate} />
                    <ViroText position={[0.6,0.15,0.25]} width={3} text={(this.state.title)} style={styles.text}  />
                    {/*<ViroText position={[1.55,-0.35,0.25]} width={1} text={this.state.votes + ' votes'} style={styles.textSmall}  />*/}
                    {/*<ViroText position={[1.55,-0.15,0.25]} width={1} text={(this.state.distance / 1000 / 5 * 60).toFixed(2) + ' min'} style={styles.textSmall}  />*/}

                    {/*<ViroImage position={[-0.4,-0.1,0.05]}  height={0.2} width={0.2} source={require('../../res/icon_star.png')} />*/}
                    {/*<ViroImage source={require('../../res/cs.png')} width={2.79} height={1} />*/}

                    {/*<ViroFlexView position={[0,-0.1,0.5]} height={0.4} width={1.2}>*/}
                    {/*    {rating}*/}
                    {/*</ViroFlexView>*/}
                </ViroNode>
            );
        }


    }
}


var styles = StyleSheet.create({
    text: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    textSmall: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    },
});

module.exports = PointOfInterest;

