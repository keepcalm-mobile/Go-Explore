import React from "react";
import {Keyboard, Text, View, Animated, Easing, LayoutAnimation, StyleSheet, Dimensions, Platform, ScrollView} from "react-native";
import {createStackNavigator} from "react-navigation";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Background from "../../components/AppBackground";
import Waves from "../../components/Waves";
import Logo from "../../../assets/logo.svg";
import {scale, verticalScale} from "../../utils/resize";
import {doubleIndent, indent} from "../../styles";
import s from './styles';
import {ForgotScreen, LoginScreen, TermsScreen, OptScreen, SignupScreen} from "./tabs";
import {screens} from "../../constants";
import {ModMap} from "../../modules";

const startY = (Platform.OS === 'android') ? 0 : getStatusBarHeight();
const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;
const topMargMin = indent + startY;
const topMargMax = (Dimensions.get("window").height*.04) + startY;//verticalScale(15)


const AuthTabs = createStackNavigator({
    [screens.LoginTab]  : LoginScreen,
    [screens.ForgotTab] : ForgotScreen,
    [screens.SignUpTab] : SignupScreen,
    [screens.OptTab]    : OptScreen,
    [screens.TermsTab]  : TermsScreen,
}
,{
    headerMode: 'none',
    transparentCard: true,
    // mode: 'modal',
        // cardStyle: {
        // backgroundColor: 'transparent',
        // opacity: 1,
    // },
    defaultNavigationOptions: {
        gesturesEnabled: true,
    },
    cardShadowEnabled: false,
    transitionConfig: () => ({
        containerStyle: {
            backgroundColor: 'transparent',
        },
        transitionSpec: {
            duration: 500,
            easing: Easing.inOut(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps;
            const toIndex = index;
            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const width = layout.initWidth;

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, -width],
            });

            const opacity = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [0, 1, 0],
            });

            return { opacity, transform: [{ translateX }] };
        },
    }),
}
);



class AuthMng extends React.Component<Props> {
    static router = AuthTabs.router;

    state = {
        animOpacity : new Animated.Value(0.999),
        animLogoTop : topMargMax,
        animScrollH : (Dimensions.get("window").height - barH),
        animAreaH : (Dimensions.get("window").height - barH),
        animCntH : Dimensions.get("window").height*.65,//385,
        scrollEnabled : false,
    };

    topLayoutH = 0;
    keyboardShown = false;
    viewAreaH = this.state.animAreaH;

    constructor(props) {
        super(props);
        console.log("AuthMng : " + JSON.stringify(props));
    }

    // _updateStateLayoutProps(iLayout, iAnim = false) {
    //     let center = this.keyboardShown ? iLayout.cMaxHeight : iLayout.cMaxHeight;
    //     let bottom = this.keyboardShown ? iLayout.bMinHeight : iLayout.bMaxHeight;
    //
    //     let topMargin = (this.keyboardShown ? indent : (Dimensions.get("window").height*.04)) + startY;
    //     let scrollH = this.viewAreaH;
    //
    //     let cntH = center + bottom + indent;
    //     let itemsH = cntH + this.topLayoutH + topMargin;//
    //
    //
    //     if(this.viewAreaH > itemsH){
    //         console.log(" > : ");
    //         cntH += (this.viewAreaH - itemsH) * .5;
    //     }else{
    //         console.log(" < : ");
    //         scrollH = itemsH;
    //     }
    //
    //     console.log("itemsH : " + itemsH);
    //     console.log("viewAreaH : " + this.viewAreaH);
    //     console.log("animCntH : " + cntH);
    //     console.log("animScrollH : " + scrollH);
    //
    //     if(iAnim) LayoutAnimation.easeInEaseOut();
    //     if(iLayout.cMinHeight!==0 && iLayout.cMaxHeight!==0 && iLayout.bMinHeight!==0 && iLayout.bMaxHeight!==0)
    //     this.setState({animLogoTop: topMargin, animAreaH: this.viewAreaH, animCntH:cntH, animScrollH:scrollH});
    // }

    _updateStateLayoutProps(iLayout, iAnim = false) {
        let topMargin = this.keyboardShown ? topMargMin : topMargMax;
        let scrollH = this.viewAreaH;

        let topAreaH = this.topLayoutH + topMargin;
        let cntH = scrollH - topAreaH;

        if(this.keyboardShown && (iLayout.areaMin) > cntH){
            cntH = iLayout.areaMin;
            scrollH = cntH + topAreaH;
        }

        if(iAnim) LayoutAnimation.easeInEaseOut();
        this.setState({animLogoTop: topMargin, animAreaH: this.viewAreaH, animCntH:cntH, animScrollH:scrollH, scrollEnabled: scrollH > this.viewAreaH });
    }


    _calcLayouts = (event) => {
        if(this.topLayoutH >= event.nativeEvent.layout.height)return;
        this.topLayoutH = event.nativeEvent.layout.height;
        this.props.setCntHeight({tMin:this.topLayoutH+topMargMin, tMax: this.topLayoutH+topMargMax});
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        console.log("REG componentWillReceiveProps : " + JSON.stringify(nextProps));

        this._updateStateLayoutProps( nextProps[ModMap.RegAnim] );
        // LayoutAnimation.easeInEaseOut();
        // this.setState({animCntH: nextProps[ModMap.RegAnim].curCntHeight});
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardWillShow = (e) => {
        Animated.parallel([
            Animated.timing(this.state.animOpacity, {
                toValue: 0.0,
                duration: 500,
                useNativeDriver: true,
            }),
            // Animated.timing(this.state.animLogoTop, {
            //     toValue: verticalScale(25),
            //     duration: 500,
            //     useNativeDriver: true,
            // }),
        ]).start();

        this.keyboardShown = true;
        this.viewAreaH = Dimensions.get("window").height - barH - e.endCoordinates.height;
        this._updateStateLayoutProps(this.props[ModMap.RegAnim], true);
    };

    _keyboardWillHide = () => {
        Animated.parallel([
            Animated.timing(this.state.animOpacity, {
                toValue: 1.0,
                duration: 500,
                useNativeDriver: true,
            }),
            // Animated.timing(this.state.animLogoTop, {
            //     toValue: verticalScale(55),
            //     duration: 500,
            //     useNativeDriver: true,
            // }),
        ]).start();

        this.keyboardShown = false;
        this.viewAreaH = Dimensions.get("window").height - barH;
        this._updateStateLayoutProps(this.props[ModMap.RegAnim], true);
    };


    render() {
        const { navigation } = this.props;
        const { push, replace, popToTop, pop, dismiss } = navigation;
        // const activeRoute = routes[index];

        return (//{height:this.state.animAreaH},
            <View style={[s.fillAll, {backgroundColor: '#000000'}]}>
                <Animated.View style={[StyleSheet.absoluteFill, {opacity: this.state.animOpacity}]}>
                    <Background/>
                    <Waves/>
                </Animated.View>
                <View style={{height:this.state.animAreaH}}>
                    <ScrollView contentContainerStyle={{height:this.state.animScrollH, justifyContent:'space-between', flexDirection:'column'}} scrollEnabled={this.state.scrollEnabled}>
                        <View style={{marginTop: this.state.animLogoTop}} onLayout={this._calcLayouts}>
                            <Logo width={scale(330)} style={s.logo}/>
                            <Text style={s.welcome}>Welcome to GoExplore City</Text>
                            <Text style={s.signIn}>Sign in to continue</Text>
                        </View>
                        <View style={[{height:this.state.animCntH}]}>
                            <AuthTabs navigation={navigation}/>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );//
    }
}

// , scrollEnabled:false
//contentContainerStyle={{flex:1, justifyContent:'space-between', flexDirection:'column'}, flexWrap:'wrap'
//flex:.68//flex:.32//height:this.state.animAreaH,
//height:this.state.animAreaH,z
//flex:1, justifyContent:'flex-end', alignContent:"space-between", flexDirection:'column', flexWrap:'wrap'
export default AuthMng;

//<SafeAreaView style={{ flex: 1 }} forceInset={{ horizontal: 'always', top: 'always' }} >