'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroFlexView,
    ViroImage,
    ViroNode,
    ViroMaterials
} from 'react-viro';

import frameLeftBlackStart from './res/frameLeftBlackStart.png';
import frameLeftBlackBody from './res/frameLeftBlackBody.png';
import frameRightGoldBody from './res/frameRightGoldBody.png';
import frameRightGoldEnd from './res/frameRightGoldEnd.png';

import offerFrameLeftBlack from './res/frameLeftBlack.png';
import offerFrameRightGold from './res/frameRightGold.png';
import offerMinFrame from './res/offerMinFrame.png';
import offerTimerFrame from './res/offerTimerFrame.png';
import frame from './res/poiFrame.png';
import expandFrame from './res/expandFrame.png';
import iconAttraction from '../../../assets/attractionIcon.png';


import iconOffer from './res/iconOffer.png';
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
            kind: props.kind ? props.kind : 'poi',
            text: props.text ? props.text : 'some offer text',
            rating: props.rating ? props.rating : 3,
            votes: props.votes ? props.votes : 0,
            title: props.title ? props.title : 'Coffee shop',
            distance: props.distance ? props.distance : 47,
            position: props.position ? props.position : [0,10,-7],
            coords: props.coords ? props.coords : {latitude: 0, longitude: 0},
            icon: props.icon ? props.icon : 'coffee',
            scale: [1,1,1],
            specialOffer: props.specialOffer ? props.specialOffer : undefined,
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    setPosition(position) {

        if (typeof(this.node) === 'undefined') {
            console.log('this.node = undefined for kind: ' + this.state.kind + '  title: ' + this.state.title);
            return;
        }

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
        console.log('CLICKED: ' + this.state.title);
        this.state.onClickHandler({
            title: this.state.title,
            coords: this.state.coords
        });
    }

    getSpecialOffer() {
        if (typeof (this.state.specialOffer) === 'undefined') {
            return null;
        }

        let pos = [0, 0.8, 0];
        let scale = [1,1,1];

        if (this.state.kind === 'offer') {
            pos = this.state.position;
            scale = [1,1,1];

            return (
                <ViroNode scale={scale} position={pos} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }} onClick={this.onClickHandler}>
                    <ViroImage height={1} width={5} source={frame} />
                    <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={iconOffer} />

                    {/*<ViroImage position={[-0.55,-0.1,0.25]} height={0.2} width={1} source={rate} />*/}
                    <ViroText position={[0.1,0.1,0.25]} width={3} text={(this.state.title)} style={styles.text}  />
                    <ViroText position={[-1.15,-0.175,0.25]} width={3} text={this.state.text} style={styles.rating}  />
                    <ViroText position={[0.1,-0.375,0.25]} width={3} text={'1.2km from Fatread Beach'} style={styles.textSmall}  />
                </ViroNode>
            );
        }
        else {

            pos = [0, 1.25, 0];
            scale = [1,1,1]; //[0.7, 0.7, 0.7];//[0.8, 0.8, 0.8];

            let minimized = true;

            if (minimized === false) {
                return (
                    this.getMaximizedOffer()
                );
            }

            //TODO: Switch by offer type, types: percentage, fixed, timer
            //TODO: adjust fontSize

            const initialSymbolsCount = 8;
            const initialContainerWidth = 5;//4.96;
            let currentSymbolsCount = this.state.specialOffer.title.length + this.state.specialOffer.text.length;

            //frame
            let frameImage = offerMinFrame;
            //icon
            let iconPosition = [-2.2,0,0.25];
            let iconImage = iconOffer;
            let leftPartFlexValue = 67;
            let rightPartFlexValue = 32;

            let containerWidth = 5; //initialContainerWidth * (currentSymbolsCount / initialSymbolsCount);
            // scale[0] *= (containerWidth / initialContainerWidth);
            //
            // if (scale[0] >= 1)
            //     scale[0] = 1;
            // else if (scale[0] <= 0.7)
            //     scale[0] = 0.7;

            let pivot = [-2.5, 0, 0];



            if (this.state.specialOffer.type === 'timer') {
                // values for an offer with the timer
                // this.state.specialOffer.expireDate in this case must be set

                frameImage = offerTimerFrame;
                //frameWidth = 6.667;
            }

            return (
                <ViroNode scale={scale} position={pos} transformBehaviors={["billboard"]} >
                    {/*<ViroImage  height={frameHeight} width={frameWidth} source={frameImage} />*/}

                    <ViroFlexView width={5} height={0.5}
                    style={{
                        //backgroundColor: '#777777',
                        flexDirection: 'row',
                    }}>

                        <ViroFlexView style={{
                            //backgroundColor: '#b7671b',
                            flex: 3,
                        }} height={0.5} materials={["blackPartLeftStart"]}>
                        </ViroFlexView>

                        <ViroFlexView style={{
                            //backgroundColor: '#b7671b',
                            flex: leftPartFlexValue,
                            paddingTop: 0.1,
                            paddingLeft: 0.5,
                        }} height={0.5} materials={["blackPartLeft"]}>
                            <ViroText text={(this.state.specialOffer.title)} style={styles.offerMainText} />
                        </ViroFlexView>

                        <ViroFlexView style={{
                            //backgroundColor: '#b7671b',
                            flex: rightPartFlexValue,
                            paddingTop: 0.1
                        }} height={0.5} materials={["goldenPartRight"]}>
                            <ViroText text={(this.state.specialOffer.text)} style={styles.offerSubText}  />
                        </ViroFlexView>

                        <ViroFlexView style={{
                            //backgroundColor: '#b7671b',
                            flex: 3
                        }} height={0.5} materials={["goldenPartRightEnd"]}>
                        </ViroFlexView>

                        <ViroFlexView style={{
                            // backgroundColor: '#b7671b',
                            flex: 60,
                        }} height={0.5}>
                        </ViroFlexView>

                        {/*<ViroImage height={1} width={2.69} source={offerFrameLeftBlack} />*/}
                        {/*<ViroImage height={1} width={1.88} source={offerFrameRightGold} />*/}
                    </ViroFlexView>

                    <ViroImage position={iconPosition}  height={0.4} width={0.4} source={iconImage} />

                    {/*<ViroText scale={textScale} position={leftTextPosition} width={leftTextWidth} textAlign={'left'} textVerticalAlign={'center'}*/}
                    {/*          text={(this.state.specialOffer.title)} style={[styles.offerMainText, {fontSize: leftTextFontSize}]}  />*/}
                    {/*<ViroText scale={textScale} position={rightTextPosition} width={rightTextWidth} text={(this.state.specialOffer.text)} style={styles.offerSubText}  />*/}
                </ViroNode>
            );
        }
    }

    getMaximizedOffer() {

        let position = [0, 1.1, 0];

        return (
            <ViroNode position={position} transformBehaviors={["billboard"]}>
                <ViroImage  height={1} width={5} source={expandFrame} />
                <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={iconOffer} renderingOrder={4} />

                <ViroText position={[0.1,0.1,0.25]} width={3} text={(this.state.specialOffer.titleExpanded)} style={styles.text} renderingOrder={3} />
                <ViroText position={[0.1,-0.175,0.25]} width={3} textAlign={'left'} text={(this.state.specialOffer.textExpanded)} style={styles.rating} renderingOrder={2} />
                <ViroText position={[0.1,-0.375,0.25]} width={3} text={'1.2km from Fatread Beach'} style={styles.textSmall} renderingOrder={1} />

            </ViroNode>
        );
    }

    getPOI(currentIcon, rate) {
        return (
            <ViroNode scale={this.state.scale} position={this.state.position} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }} onClick={this.onClickHandler}>
                <ViroImage  height={1} width={5} source={frame} />
                <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={currentIcon} />

                <ViroImage position={[-0.55,-0.1,0.25]} height={0.2} width={1} source={rate} />
                <ViroText position={[0.1,0.1,0.25]} width={3} text={(this.state.title)} style={styles.text}  />
                <ViroText position={[-1.15,-0.175,0.25]} width={0.5} text={(''+this.state.rating.toFixed(1))} style={styles.rating}  />
                <ViroText position={[0.1,-0.375,0.25]} width={3} text={'1.2km from Fatread Beach'} style={styles.textSmall}  />
                {/*<ViroText position={[1.55,-0.15,0.25]} width={1} text={(this.state.distance / 1000 / 5 * 60).toFixed(2) + ' min'} style={styles.textSmall}  />*/}

                {this.getSpecialOffer()}
            </ViroNode>
        );
    }

    render() {

        let currentIcon = iconAttraction;
        //let currentPosition = [0,0.5, -9];
        let rate = rating5;

        if (this.state.icon === 'shop') {
            //currentIcon = iconShop;
            //rate = rating5;
            //currentPosition = [-6,0, -11];
        }
        else if (this.state.icon === 'atm') {
            //currentIcon = iconATM;
            //rate = rating3;
            //currentPosition = [4.5, 0, -7];
        }

        if (this.state.kind === 'poi') {
            return (
                this.getPOI(currentIcon, rate)
            );
        }
        else {
            return (
                this.getSpecialOffer(currentIcon, rate)
            );
        }
    }
}

ViroMaterials.createMaterials({
    blackPartLeftStart: {
        diffuseTexture: frameLeftBlackStart,
    },
    blackPartLeft: {
        diffuseTexture: frameLeftBlackBody,
    },
    goldenPartRight: {
        diffuseTexture: frameRightGoldBody,
    },
    goldenPartRightEnd: {
        diffuseTexture: frameRightGoldEnd,
    }
});

var styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins, Arial',
        fontSize: 35,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    textSmall: {
        fontFamily: 'Poppins, Arial',
        fontSize: 17,
        color: '#939393',
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    rating: {
        fontFamily: 'Poppins, Arial',
        fontSize: 20,
        color: '#F2C94C',
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    offerMainText: {
        fontFamily: 'sans-serif',
        fontSize: 24,
        color: '#F2C94C',
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold',
        flex: 1
    },
    offerSubText: {
        fontFamily: 'Poppins, Arial',
        fontSize: 24,
        color: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    },
});

module.exports = PointOfInterest;

