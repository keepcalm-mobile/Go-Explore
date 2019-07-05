import React from "react";
import {Animated, Dimensions, Keyboard, LayoutAnimation, Platform, TextInput} from "react-native";
import {verticalScale} from "../../../utils/resize";
import {ModMap} from "../../../modules";
import {getStatusBarHeight} from "react-native-status-bar-height";

const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;

class TabResizer extends React.Component<Props> {
    static navigationOptions = {header: null};
    static CENTER_MIN : String = "cMin";
    static CENTER_MAX : String = "cMax";
    static BOTTOM_MIN : String = "bMin";
    static BOTTOM_MAX : String = "bMax";

    static calcLayout(iLayout) {
        let total = 0;
        for (let prop in iLayout) total += iLayout[prop];
        return total;
    }

    state = {
        // animOpacity: new Animated.Value(0.999),
        animBtnMargin: verticalScale(73),//new Animated.Value(),
        animEmpty: 0,
        areaHeight: 358,
        separatorsHeight: 0,
        borderBottomWidth: 0,
        animatedValue: new Animated.Value(0.0),
    };

    keyboardShown = false;
    keyboardHeight = 0;
    layoutValues = {};
    _layoutsCMin = {};
    _layoutsCMax = {};
    _layoutsBMin = {};
    _layoutsBMax = {};
    // animatedStyle = {};



    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log("REG componentWillReceiveProps : " + JSON.stringify(nextProps));
        this.updateStateLayoutProps( nextProps[ModMap.RegAnim] );
    }


    _keyboardWillShow = (e) => {
        this.keyboardShown = true;
        this.keyboardHeight = e.endCoordinates.height;
        this.updateStateLayoutProps(this.props[ModMap.RegAnim], true);
    };

    _keyboardWillHide = (e) => {
        this.keyboardShown = false;
        this.keyboardHeight = 0;
        this.updateStateLayoutProps(this.props[ModMap.RegAnim], true);
    };


    updateStateLayoutProps(iLayout, iAnim = false) {
        let btnMargin = this.keyboardShown ? 0 : verticalScale(73);
        let cntViewsH = this.keyboardShown ? (this.layoutValues[TabResizer.CENTER_MIN] + this.layoutValues[TabResizer.BOTTOM_MIN]) : (this.layoutValues[TabResizer.CENTER_MAX] + this.layoutValues[TabResizer.BOTTOM_MAX]);
        if(!cntViewsH) cntViewsH = 358;

        let curH = Dimensions.get("window").height - barH - this.keyboardHeight - (this.keyboardShown ? iLayout.tMin : iLayout.tMax);

        let seps = 0;
        if(cntViewsH < curH){
            seps = (curH - cntViewsH) * .5;
        }else{
            curH = cntViewsH;
        }

        if(iAnim){
            Animated.timing(this.state.animatedValue, {
                toValue: (this.keyboardShown ? 1.0 : 0.0),
                duration: 500,
                // useNativeDriver: true,
            }).start();

            LayoutAnimation.easeInEaseOut();
        }else{
            this.state.animatedValue.setValue(this.keyboardShown ? 100 : 0);
        }

        this.setState({animBtnMargin: btnMargin, areaHeight: curH, separatorsHeight:seps, borderBottomWidth : this.keyboardShown ? 0 : 1});
    }


    calcCMin = (event) => { this._updateLayout(this._layoutsCMin, event.nativeEvent.target, event.nativeEvent.layout.height, TabResizer.CENTER_MIN) };
    calcCMax = (event) => { this._updateLayout(this._layoutsCMax, event.nativeEvent.target, event.nativeEvent.layout.height, TabResizer.CENTER_MAX) };
    calcBMin = (event) => { this._updateLayout(this._layoutsBMin, event.nativeEvent.target, event.nativeEvent.layout.height, TabResizer.BOTTOM_MIN) };
    calcBMax = (event) => { this._updateLayout(this._layoutsBMax, event.nativeEvent.target, event.nativeEvent.layout.height, TabResizer.BOTTOM_MAX) };


    _updateLayout(iLayout, iTarget, iValue, iId) {
        if(iLayout[iTarget] && iLayout[iTarget] >= iValue) return;
        iLayout[iTarget] = iValue;

        this.layoutValues[iId] = TabResizer.calcLayout(iLayout);
        if(iId === TabResizer.CENTER_MIN || iId === TabResizer.BOTTOM_MIN)
            this._updateAreaProps();
        else
            this.updateStateLayoutProps(this.props[ModMap.RegAnim]);
    }

    _updateAreaProps() {
        this.props.setCntHeight({areaMin:(TabResizer.calcLayout(this._layoutsCMin) + TabResizer.calcLayout(this._layoutsBMin))});
    }

    render() {
        return {
            bgStyle: {
                opacity: this.state.animatedValue
            },
            textStyle: {
                borderBottomColor : this.state.animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['rgba(255, 168, 59, 1.0)', 'rgba(255, 168, 59, 0.0)'] }),
                color : this.state.animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'] }),
            }
            // backgroundColor : this.state.animatedValue.interpolate({ inputRange: [0, 100], outputRange: ['rgba(241, 241, 246, 0.0)', 'rgba(241, 241, 246, 1.0)'] }),
            // borderBottomWidth : this.state.animatedValue.interpolate({ inputRange: [0, 100], outputRange: [1.0, 0.0] }),
            // borderRadius : this.state.borderRadius,
        }
    }
}

export default TabResizer;
