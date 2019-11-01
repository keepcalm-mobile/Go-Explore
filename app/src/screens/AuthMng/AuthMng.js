import React from 'react';
import { Keyboard, Text, View, Animated, Easing, LayoutAnimation, StyleSheet, Dimensions, Platform, ScrollView, PermissionsAndroid, ToastAndroid } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {AppBg, Waves, OverlayLoader} from '../../components';
import Logo from '../../../assets/logo.svg';
import {scale, verticalScale} from '../../utils/resize';
import {colors, doubleIndent, fontNames, fontSizes, indent} from '../../styles';
import s from './styles';
import {ForgotScreen, LoginScreen, TermsScreen, OtpScreen, SignupScreen} from './tabs';
import {screens} from '../../constants';

async function requestPermission() {
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

        // if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
        //
        //     ToastAndroid.showWithGravity(
        //         'Permissions granted',
        //         ToastAndroid.LONG,
        //         ToastAndroid.CENTER,
        //     );
        // }

    } catch (err) {
        console.warn(err);
    }
}

const AuthTabs = createStackNavigator({
    [screens.LoginTab]  : { screen: LoginScreen},
    [screens.ForgotTab] : { screen: ForgotScreen},
    [screens.SignUpTab] : { screen: SignupScreen},
    [screens.OtpTab]    : { screen: OtpScreen},
    [screens.TermsTab]  : { screen: TermsScreen},
}
,{
    initialRouteName: screens.LoginTab,
    initialRouteKey: screens.LoginTab + 'Key',
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
            backgroundColor: '#00000000',
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



const startY = (Platform.OS === 'android') ? 0 : getStatusBarHeight();
const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;
const windowH = Dimensions.get('window').height - barH;
const topMargMin = indent + startY;
const topMargMax = Math.round(Dimensions.get('window').height * 0.04) + startY;//verticalScale(15)
const titles = {
    default:{
        title:{ text:'Welcome to GoExplore City', style:{color:colors.white} },
        subTitle:{ text:'Sign in to continue', style:{color:colors.white, fontSize: fontSizes.small, lineHeight: scale(24)} },
    },
    [screens.OtpTab]:{
        title:{ text:'Verify your Mobile', style:{color:colors.highlight} },
        subTitle:{ text:'Enter your OTP code here', style:{color:colors.secondaryText, fontSize: fontSizes.medium, lineHeight: scale(24)} },
    },
    [screens.TermsTab]:{
        title:{ text:'Terms of service', style:{color:colors.highlight} },
        subTitle:{ text:'For User Capi Bar', style:{color:colors.secondaryText, fontSize: fontSizes.medium, lineHeight: scale(24)} },
    },
};

class AuthMng extends React.Component<Props> {
    static router = AuthTabs.router;

    topLayoutH = 0;//Math.round(windowH * 0.1);

    state = {
        bgOpacity : new Animated.Value(0.999),
        titleOpacity : new Animated.Value(0.999),
        animLogoTop : topMargMax,
        animScrollH : windowH,
        animAreaH : windowH,
        animCntH : 0,//Math.round(windowH * 0.9),
        scrollEnabled : false,
        isLoading:false,
        titleID : 'default',
    };

    constructor(props) {
        super(props);
        this.prevTitle = this.state.titleID;//;

        console.log('AuthMng : ' + JSON.stringify(props));
        console.log('router : ' + JSON.stringify(AuthTabs.router));
        console.log('WINDOW H : ' + windowH);
    }

    static getCurrentRouteSize(navState):number {
        let value = 0;
        if (navState.routes[navState.index].params !== undefined) {
            if (navState.routes[navState.index].params.minSize !== undefined) {
                value = navState.routes[navState.index].params.minSize;
            }
        }
        return value;
    }

    static getCurrentRouteName(navState):string {
        return navState.routes[navState.index].routeName;
    }

    static getDerivedStateFromProps(props, state) {
        console.log('GET Derived AUTH MNG : ' + JSON.stringify(props));

        if (props.loginIsLoading !== state.isLoading){
            return {isLoading : props.loginIsLoading};
        } else {
            return null;
        }
    }


    _updateStateLayoutProps(iAnim = false, iKey = false, iKeyH = 0) {
        // console.log("!!! - ROUT STATE : " + this.props.navigation._childrenNavigation[this.props.navigation.state.routes[this.props.navigation.state.index].key].getParam('minSize', '213') );
        const areaMin = AuthMng.getCurrentRouteSize(this.props.navigation.state);//this.props.navigation.state.routes[this.props.navigation.state.index].params.minSize;
        let viewAreaH = windowH - iKeyH;
        let scrollH = windowH - iKeyH;
        let topMargin = iKey ? topMargMin : topMargMax;

        let topAreaH = this.topLayoutH + topMargin;
        let cntH = scrollH - topAreaH;

        if (iKey && areaMin > cntH){
            cntH = areaMin;
            scrollH = cntH + topAreaH;
        }

        if (iAnim) {
            this._setBgOpacity(iKey ? 0.0 : 1.0);
            LayoutAnimation.easeInEaseOut();
        }
        this.setState({animLogoTop: topMargin, animAreaH: viewAreaH, animCntH:cntH, animScrollH:scrollH, scrollEnabled: scrollH > viewAreaH });

        this._scrollCnt.scrollTo({y: 300});
    }


    _calcLayouts = (event) => {
        const topHeight = Math.round(event.nativeEvent.layout.height);
        if (this.topLayoutH >= topHeight) {return;}
        this.topLayoutH = topHeight;
        this._updateStateLayoutProps();
    };


    componentDidUpdate(prevProps, prevState) {
        const newRouteName = AuthMng.getCurrentRouteName(this.props.navigation.state);
        if (newRouteName === screens.TermsTab){
            this._setBgOpacity(0);
        } else if (AuthMng.getCurrentRouteName(prevProps.navigation.state) === screens.TermsTab && this.opacity === 0.0){
            this._setBgOpacity(1.0);
        }

        let nextTitle = (newRouteName === screens.TermsTab || newRouteName === screens.OtpTab) ? newRouteName : 'default';

        if (this.prevTitle !== nextTitle ) {
            this.prevTitle = nextTitle;
            this._changeTitle(nextTitle);
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) =>  this._updateStateLayoutProps(true, true, e.endCoordinates.height));//this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._updateStateLayoutProps(true, false));//this._keyboardWillHide);

        requestPermission();
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    _setBgOpacity(iValue){
        if (iValue === 1.0 && AuthMng.getCurrentRouteName(this.props.navigation.state) === screens.TermsTab) return;

        this.opacity = iValue;
        Animated.timing(this.state.bgOpacity, {
            toValue: iValue,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    _changeTitle(iProps){
            Animated.timing(this.state.titleOpacity, {
                toValue: 0.0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                this._titleHiddenHandler(iProps);
            });
    }

    _titleHiddenHandler(iProps){
        this.setState({titleID : iProps});
        Animated.timing(this.state.titleOpacity, {
            toValue: 1.0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }


    render() {
        const { navigation } = this.props;
        const { push, replace, popToTop, pop, dismiss } = navigation;
        // const activeRoute = routes[index];

        return (
            <View style={s.container}>
                <Animated.View style={[StyleSheet.absoluteFill, {opacity: this.state.bgOpacity}]}>
                    <AppBg/>
                    <Waves/>
                </Animated.View>
                <View style={{height:this.state.animAreaH}}>
                    <ScrollView contentContainerStyle={[{height:this.state.animScrollH}, s.scrollCnt]}
                                scrollEnabled={this.state.scrollEnabled}
                                keyboardShouldPersistTaps={'handled'}
                                removeClippedSubviews={false}
                                pinchGestureEnabled={false}
                                ref={c => this._scrollCnt = c}>
                        <View style={{marginTop: this.state.animLogoTop}} onLayout={this._calcLayouts}>
                            <Logo width={scale(330)} style={s.logo}/>
                            <Animated.View style={{opacity: this.state.titleOpacity}}>
                                <Text style={[s.welcome, titles[this.state.titleID].title.style]}>{titles[this.state.titleID].title.text}</Text>
                                <Text style={[s.subTitle, titles[this.state.titleID].subTitle.style]}>{titles[this.state.titleID].subTitle.text}</Text>
                            </Animated.View>
                        </View>
                        <View style={{height:this.state.animCntH}}>
                            <AuthTabs navigation={navigation}/>
                        </View>
                    </ScrollView>
                </View>
                <OverlayLoader
                    visible={this.state.isLoading}
                    message="Loading..."
                />
            </View>
        );
    }
}
//contentContainerStyle={{flex:1, justifyContent:'space-between', flexDirection:'column'}, flexWrap:'wrap'
//flex:.68//flex:.32//height:this.state.animAreaH,
//height:this.state.animAreaH,z
//flex:1, justifyContent:'flex-end', alignContent:"space-between", flexDirection:'column', flexWrap:'wrap'
//<SafeAreaView style={{ flex: 1 }} forceInset={{ horizontal: 'always', top: 'always' }} >
export default AuthMng;

