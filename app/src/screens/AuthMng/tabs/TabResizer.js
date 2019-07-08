import React from 'react';
import {Animated, Dimensions, Keyboard, LayoutAnimation, Platform, TextInput} from 'react-native';
import {verticalScale} from '../../../utils/resize';
import {ModMap} from '../../../modules';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;

class TabResizer extends React.Component<Props> {
    static navigationOptions = {header: null};

    static calcLayout(iLayout) {
        let total = 0;
        for (let prop in iLayout) {total += iLayout[prop];}
        return Math.round(total);
    }

    static layoutLength(iLayout) {
        let total = 0;
        for (let prop in iLayout) {total += 1;}
        return total;
    }

    state = {
        animBtnMargin: verticalScale(73),
        opacityValue: new Animated.Value(0.0),
        animatedValue: new Animated.Value(0.0),
        itemsMinCount:1,
    };

    // keyboardShown = false;
    // keyboardHeight = 0;
    _layoutsMin = {};


    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props[ModMap.RegAnim] !== prevProps[ModMap.RegAnim]) {
    //         console.log('RESIZER DidUpdate : ' + JSON.stringify(this.props));
    //         this.updateStateLayoutProps(this.props[ModMap.RegAnim]);
    //     }
    // }


    _keyboardWillShow = (e) => {
        // this.keyboardShown = true;
        // this.keyboardHeight = e.endCoordinates.height;
        this.updateStateLayoutProps(this.props[ModMap.RegAnim], true, true);
    };

    _keyboardWillHide = (e) => {
        // this.keyboardShown = false;
        // this.keyboardHeight = 0;
        this.updateStateLayoutProps(this.props[ModMap.RegAnim], true, false);
    };


    updateStateLayoutProps(iLayout, iAnim = false, iKeyboard = false) {
        let toValue = iKeyboard ? 1.0 : 0.0;

        if (iAnim){
            Animated.parallel([
                Animated.timing(this.state.animatedValue, {
                    toValue: toValue,
                    duration: 500,
                }),
                Animated.timing(this.state.opacityValue, {
                    toValue: toValue,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start();

            LayoutAnimation.easeInEaseOut();
        } else {
            this.state.animatedValue.setValue(toValue);
            this.state.opacityValue.setValue(toValue);
        }

        this.setState({animBtnMargin: this.keyboardShown ? 0 : verticalScale(73)});
    }

    itemsMinCount = (event) => {
        let iTarget = event.nativeEvent.target;
        let iValue = event.nativeEvent.layout.height;

        if (this._layoutsMin[iTarget] && this._layoutsMin[iTarget] >= iValue) {return;}
        this._layoutsMin[iTarget] = iValue;

        if (this.state.itemsMinCount === TabResizer.layoutLength(this._layoutsMin)) {
            // this.props.setCntHeight({areaMin: TabResizer.calcLayout(this._layoutsMin)});
            this.props.navigation.setParams({ minSize: TabResizer.calcLayout(this._layoutsMin) });
        }
    };


    render() {
        return {
            bgStyle: {
                opacity: this.state.opacityValue,
            },
            textStyle: {
                borderBottomColor : this.state.animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255, 168, 59, 1.0)', 'rgba(255, 168, 59, 0.0)'] }),
                color : this.state.animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'] }),
            },
            // backgroundColor : this.state.animatedValue.interpolate({ inputRange: [0, 100], outputRange: ['rgba(241, 241, 246, 0.0)', 'rgba(241, 241, 246, 1.0)'] }),
            // borderBottomWidth : this.state.animatedValue.interpolate({ inputRange: [0, 100], outputRange: [1.0, 0.0] }),
            // borderRadius : this.state.borderRadius,
        };
    }
}

export default TabResizer;
