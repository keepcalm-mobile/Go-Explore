'use strict';

import React, { Component } from 'react';

import {StyleSheet, ToastAndroid} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroFlexView,
    ViroImage,
    ViroNode,
    ViroMaterials,
    ViroAnimations
} from 'react-viro';

import frameLeftBlackStart from './res/frameLeftBlackStart.png';
import frameLeftBlackBody from './res/frameLeftBlackBody.png';
import frameRightGoldBody from './res/frameRightGoldBody.png';
import frameRightGoldEnd from './res/frameRightGoldEnd.png';

import frame from './res/poiFrame.png';
import expandFrame from './res/expandFrame.png';
import iconAttraction from '../../../assets/attractionIcon.png';
import iconOffer from './res/iconDiscount.png';

import  rating0 from './res/rating_0.png';
import  rating1 from './res/rating_1.png';
import  rating2 from './res/rating_2.png';
import  rating3 from './res/rating_3.png';
import  rating4 from './res/rating_4.png';
import  rating5 from './res/rating_5.png';
import EventsBridge from "../../utils/EventsBridge";

export default class PointOfInterest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMinimized: true,
            objectAnimation: 'scaleDown',
            runObjectAnimation: false,
            kind: props.kind ? props.kind : 'poi',
            rating: props.rating ? props.rating : "0",
            votes: props.votes ? props.votes : 0,
            title: props.title ? props.title : 'Coffee shop',
            distance: props.distance ? props.distance : 47,
            position: props.position ? props.position : [0,10,-7],
            coords: props.coords ? props.coords : {latitude: 0, longitude: 0},
            icon: props.icon ? props.icon : 'coffee',
            scale: [1,1,1],
            offers: props.offers ? props.offers : undefined,
            onClickHandler: props.onClickHandler ? props.onClickHandler : (poi) => {}
        };

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onOfferClickHandler = this.onOfferClickHandler.bind(this);
        this.onOfferAnimationFinished = this.onOfferAnimationFinished.bind(this);

        this.showTest = true;
    }

    setPosition(position) {

        // if (typeof(this.node) === 'undefined') {
        //     console.log('this.node = undefined for kind: ' + this.state.kind + '  title: ' + this.state.title);
        //     return;
        // }

        // console.log(this.state.title + ' pos = ' + this.state.position + ' got pos = ' + position);

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

        if (this.state.isMinimized === true && this.state.kind !== 'offer' && typeof(this.state.offers) !== 'undefined' && this.state.offers.length > 0) {

            this.setState({
                objectAnimation: 'fadeOut',
                runObjectAnimation: true
            });

            // this.setState({isMinimized: false});
            return;
        }

        //TODO: pass the whole POI, so it can be added to the list to other pois

        this.state.onClickHandler({
            title: this.state.title,
            coords: this.state.coords
        });

        // {latitude: 85, longitude: -135.0005567, distance: 0, position: [0,10,0], title: 'NORTH poi', rating: 0, votes: '0', type: 'custom'},
        EventsBridge.arSceneCurrentNavigationItem = {
            latitude: this.state.coords.latitude,
            longitude: this.state.coords.longitude,
            distance: 0,
            position: this.state.position,
            title: this.state.title,
            rating: this.state.rating,
            votes: this.state.votes,
            kind: this.state.kind
        };
    }

    onOfferClickHandler(index = 0) {

        let offers = {...this.state.offers};

        console.log('Clicked on an offer');
        console.log(offers[index]);

        EventsBridge.arComponent.setPopupData({
            coords: this.state.coords,
            offer: offers[index]
        });
    }

    onOfferAnimationFinished() {

        if (this.state.objectAnimation === 'fadeOut') {
            if (this.state.isMinimized === true) {
                this.setState({
                    objectAnimation: 'fadeIn', //fadeOutInstant
                    runObjectAnimation: true,
                    isMinimized: false
                });

                // setTimeout(() => {
                //     this.setState({
                //         objectAnimation: 'fadeIn',
                //         runObjectAnimation: true
                //     });
                // }, 10);
            }
        }
    }

    getTwoDigitString(num) {
        let str = "";

        if (num < 10 && num >= 0) {
            str += "0";
        }

        str += num + "";

        return str;
    }

    getTimerTimeLeft(index = 0) {

        let offers = {...this.state.offers};
        let offer = offers[index];

        let textToShow = "";

        // let expDateYear = parseInt(offer.expireDate.substring(0,4));
        // let expDateMonth = parseInt(offer.expireDate.substring(5,2));
        // let expDateDay = parseInt(offer.expireDate.substring(8,2));
        // let expDateHours = parseInt(offer.expireDate.substring(11,2));
        // let expDateMinutes = parseInt(offer.expireDate.substring(14,2));

        let expireDate = new Date();
        expireDate.setFullYear(2019, 10, 25);
        expireDate.setHours(15, 0, 0);
        // expireDate.setFullYear(expDateYear, expDateMonth, expDateDay);
        // expireDate.setHours(expDateHours, expDateMinutes);


        let difference = new Date();
        let now = new Date();
        //now.setTime(Date.now());

        let totalMilliseconds = expireDate.getTime() - now.getTime();
        difference.setTime(totalMilliseconds);

        // console.log("difference = " + totalMilliseconds);

        // let days = Math.floor(difference / (1000 * 3600 * 24));
        // difference.setTime(totalMilliseconds - (days * 1000 * 3600 * 24));
        // let hours = Math.floor(difference / (1000 * 3600));
        // difference.setTime(totalMilliseconds - ((days * 1000 * 3600 * 24) + (hours * 1000 * 3600)));
        // let minutes = Math.floor(difference / (1000 * 60));
        // difference.setTime(totalMilliseconds - ((days * 1000 * 3600 * 24) + (hours * 1000 * 3600) + (minutes * 1000 * 60)));
        // let seconds = Math.floor(difference / (1000));

        let until = totalMilliseconds / 1000;
        let timeLeft = {
            seconds: parseInt(until % 60),
            minutes: parseInt(until / 60, 10) % 60,
            hours: parseInt(until / (60 * 60), 10) % 24,
            days: parseInt(until / (60 * 60 * 24), 10),
        };

        let days = timeLeft.days;
        let hours = timeLeft.hours;
        let minutes = timeLeft.minutes;
        let seconds = timeLeft.seconds;

        // console.log("Timer:::: until = " + until);

        if (expireDate.getTime() > now.getTime()) {
            //console.log("expire date larger");
            textToShow += this.getTwoDigitString(days) + ":" + this.getTwoDigitString(hours) + ":" + this.getTwoDigitString(minutes) + ":" + this.getTwoDigitString(seconds);
        }
        else {
            textToShow = "00:00:00:00";

            // console.log(expireDate.getTime() + "  vs  " + now.getTime());
        }

        // if (this.showTest === true) {
        //     this.showTest = false;
        //
        //     ToastAndroid.showWithGravity("expireDate = " + expireDate + "  now = " + now + "  first = " + expireDate.getTime() + "  2nd = " + now.getTime(), ToastAndroid.LONG, ToastAndroid.CENTER);
        //
        //     setTimeout(() => { this.showTest = true; }, 5000);
        // }

        return textToShow;
    }

    getOfferByIndex(index = 0, customTitle = null, customText = null) {
        let pos = [0, 1 + index, 0];

        let offers = {...this.state.offers};
        let offer = offers[index];

        let offerTitle = customTitle != null ? customTitle : offer.title;
        let textToShow = customText != null ? customText : offer.text;

        //TODO: Switch by offer type, types: percentage, fixed, timer
        //TODO: adjust fontSize

        let currentLeftPartFlexValue = offerTitle.length;

        //icon
        let iconPosition = [-2.2,0,0.25];
        let iconImage = iconOffer;

        let height = 0.65;

        if (offer.type === 'timer' && customText === null) {
            // values for an offer with the timer
            // this.state.specialOffer.expireDate in this case must be set

            textToShow = this.getTimerTimeLeft();
        }

        let currentRightPartFlexValue = textToShow.length;

        if (currentRightPartFlexValue < 3) {
            currentRightPartFlexValue = 2;
        }

        if (currentLeftPartFlexValue < 3) {
            currentLeftPartFlexValue = 2;
        }

        const fullLengthSymbolsCount = 20;
        let symbolsTotal = (currentLeftPartFlexValue + currentRightPartFlexValue);

        let restFlexValue = (fullLengthSymbolsCount - symbolsTotal);

        if (symbolsTotal >= fullLengthSymbolsCount)
            restFlexValue = 0;

        let endingsFlexValue = (symbolsTotal + restFlexValue) * 0.05;

        return (
            <ViroNode key={index} position={pos} transformBehaviors={["billboard"]}
                      animation={{name : this.state.objectAnimation, run : this.state.runObjectAnimation, loop : false,
                          onFinish: this.onOfferAnimationFinished}}>
                {/*<ViroImage  height={frameHeight} width={frameWidth} source={frameImage} />*/}

                <ViroFlexView width={5} height={height}
                              style={{
                                  //backgroundColor: '#777777',
                                  flexDirection: 'row',
                              }}>

                    <ViroFlexView style={{
                        //backgroundColor: '#b7671b',
                        flex: endingsFlexValue,
                    }} height={height} materials={["blackPartLeftStart"]}>
                    </ViroFlexView>

                    <ViroFlexView style={{
                        //backgroundColor: '#b7671b',
                        flex: currentLeftPartFlexValue,
                        paddingTop: 0.1,
                        paddingLeft: 0.5,
                    }} height={height} materials={["blackPartLeft"]}>
                        <ViroText text={offerTitle} style={styles.offerMainText} />
                    </ViroFlexView>

                    <ViroFlexView style={{
                        //backgroundColor: '#b7671b',
                        flex: currentRightPartFlexValue,
                        paddingTop: 0.1
                    }} height={height} materials={["goldenPartRight"]}>
                        <ViroText text={textToShow} style={styles.offerSubText}  />
                    </ViroFlexView>

                    <ViroFlexView style={{
                        //backgroundColor: '#b7671b',
                        flex: endingsFlexValue
                    }} height={height} materials={["goldenPartRightEnd"]}>
                    </ViroFlexView>

                    <ViroFlexView style={{
                        // backgroundColor: '#b7671b',
                        flex: restFlexValue,
                    }} height={height}>
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

    getSpecialOffer() {
        if (typeof (this.state.offers) === 'undefined' || this.state.offers.length === 0) {
            return null;
        }

        let pos = {...this.state.position};
        pos[1] += 0.8;

        if (this.state.kind === 'offer') {
            pos = this.state.position;

            let offers = {...this.state.offers};
            let offer = offers[0];

            if (offer.type === 'timer') {
                // values for an offer with the timer
                // this.state.specialOffer.expireDate in this case must be set

                let textToShow = this.getTimerTimeLeft();

                return (
                    <ViroNode position={pos} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }} onClick={this.onClickHandler}
                              animation={{name : this.state.objectAnimation, run : this.state.runObjectAnimation, loop : false,
                                  onFinish: this.onOfferAnimationFinished}}>
                        <ViroImage  height={1} width={5} source={frame} />
                        <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={iconOffer} renderingOrder={4} />

                        <ViroText position={[0.1,0.1,0.25]} width={3} text={(offer.titleExpanded)} style={styles.text} renderingOrder={3} />
                        <ViroText position={[0.1,-0.275,0.25]} width={3} textAlign={'left'} text={textToShow} style={styles.timerText} renderingOrder={2} />

                    </ViroNode>
                );
            }

            return (
                <ViroNode position={pos} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }} onClick={this.onClickHandler}
                          animation={{name : this.state.objectAnimation, run : this.state.runObjectAnimation, loop : false,
                              onFinish: this.onOfferAnimationFinished}}>
                    <ViroImage height={1} width={5} source={frame} />
                    <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={iconOffer} />

                    <ViroText position={[0.1,0.1,0.25]} width={3} text={(offer.titleExpanded)} style={styles.text} renderingOrder={3} />
                    <ViroText position={[0.1,-0.175,0.25]} width={3} textAlign={'left'} text={(offer.textExpanded)} style={styles.rating} renderingOrder={2} />
                    <ViroText position={[0.1,-0.375,0.25]} width={3} text={'1.2km from Fatread Beach'} style={styles.textSmall} renderingOrder={1} />
                </ViroNode>
            );
        }
        else {

            let offers = [];

            if (this.state.isMinimized === false) {
                for (let i = 0; i < this.state.offers.length; i++) {
                    offers.push(this.getMaximizedOffer(i));
                }
            }
            else {
                if (this.state.offers.length === 1) {
                    offers.push(this.getOfferByIndex());
                } else {
                    //show multiple view
                    offers.push(this.getOfferByIndex(0, "Offers", this.state.offers.length.toString()));
                }
            }

            return offers;
        }
    }

    getMaximizedOffer(index = 0) {

        let position = [0, 1.1 + index * 1.1, 0];
        let offers = {...this.state.offers};
        let offer = offers[index];

        if (this.state.kind === 'offer') {
            position = {...this.state.position};
        }

        if (offer.type === 'timer') {
            // values for an offer with the timer
            // this.state.specialOffer.expireDate in this case must be set

            let textToShow = this.getTimerTimeLeft();

            return (
                <ViroNode key={index} position={position} transformBehaviors={["billboard"]} onClick={() => {this.onOfferClickHandler(index)}}
                          animation={{name : this.state.objectAnimation, run : this.state.runObjectAnimation, loop : false,
                              onFinish: this.onOfferAnimationFinished}}>
                    <ViroImage  height={1} width={5} source={expandFrame} />
                    <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={iconOffer} renderingOrder={4} />

                    <ViroText position={[0.1,0.1,0.25]} width={3} text={(offer.titleExpanded)} style={styles.text} renderingOrder={3} />
                    <ViroText position={[0.1,-0.275,0.25]} width={3} textAlign={'left'} text={textToShow} style={styles.timerText} renderingOrder={2} />

                </ViroNode>
            );
        }

        return (
            <ViroNode key={index} position={position} transformBehaviors={["billboard"]} onClick={() => {this.onOfferClickHandler(index)}}
                      animation={{name : this.state.objectAnimation, run : this.state.runObjectAnimation, loop : false,
                          onFinish: this.onOfferAnimationFinished}}>
                <ViroImage  height={1} width={5} source={expandFrame} />
                <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={iconOffer} renderingOrder={4} />

                <ViroText position={[0.1,0.1,0.25]} width={3} text={offer.titleExpanded} style={styles.text} renderingOrder={3} />
                <ViroText position={[0.1,-0.175,0.25]} width={3} textAlign={'left'} text={offer.textExpanded} style={styles.rating} renderingOrder={2} />
                <ViroText position={[0.1,-0.375,0.25]} width={3} text={'1.2km from Fatread Beach'} style={styles.textSmall} renderingOrder={1} />

            </ViroNode>
        );
    }

    getPOI(currentIcon, rate) {
        return (
            <ViroNode>
                <ViroNode position={this.state.position} scale={this.state.scale} transformBehaviors={["billboard"]} ref={(ref) => { this.node = ref }} onClick={this.onClickHandler}>
                    <ViroImage  height={1} width={5} source={frame} />
                    <ViroImage position={[-1.9,0,0.25]}  height={0.8} width={0.8} source={currentIcon} />

                    <ViroImage position={[-0.55,-0.1,0.25]} height={0.2} width={1} source={rate} />
                    <ViroText position={[0.1,0.1,0.25]} width={3} text={(this.state.title)} style={styles.text}  />
                    <ViroText position={[-1.15,-0.175,0.25]} width={0.5} text={(''+this.state.rating)} style={styles.rating}  />
                    <ViroText position={[0.1,-0.375,0.25]} width={3} text={'1.2km from Fatread Beach'} style={styles.textSmall}  />
                    {/*<ViroText position={[1.55,-0.15,0.25]} width={1} text={(this.state.distance / 1000 / 5 * 60).toFixed(2) + ' min'} style={styles.textSmall}  />*/}

                    {this.getSpecialOffer()}
                </ViroNode>

                {/*{this.getSpecialOffer()}*/}
            </ViroNode>
        );
    }

    getRatingImage() {
        let rate = rating0;

        if (this.state.rating === 5) {
            rate = rating5;
        } else if (this.state.rating === 4) {
            rate = rating4;
        } else if (this.state.rating === 3) {
            rate = rating3;
        } else if (this.state.rating === 2) {
            rate = rating2;
        } else if (this.state.rating === 1) {
            rate = rating1;
        }

        return rate;
    }

    render() {

        let currentIcon = iconAttraction;
        let rate = this.getRatingImage();

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

/*
 * Register the various animations we require
 */
ViroAnimations.registerAnimations({
    fadeOut:{properties:{opacity:0}, duration: 500},
    fadeIn:{properties:{opacity: 1}, duration: 500},
    fadeOutInstant:{properties:{opacity:0}, duration: 0},
    fadeInInstant:{properties:{opacity: 1}, duration: 0},
    scaleDown:{properties:{scaleX: 0, scaleY: 0, scaleZ: 0}, duration:1000},
    scaleUp:{properties:{scaleX: 1, scaleY: 1, scaleZ: 1}, duration:1000, easing: 'Bounce'},
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
    timerText: {
        color: '#FF9E18',
        fontFamily: 'Poppins, Arial',
        fontSize: 24,
        textAlignVertical: 'center',
        textAlign: 'left',
        fontWeight: 'bold'
    }
});

module.exports = PointOfInterest;

