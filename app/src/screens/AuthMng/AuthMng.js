import React from 'react';
import {Keyboard, Text, View, Animated, Easing, LayoutAnimation, StyleSheet, Dimensions, Platform, ScrollView} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {AppBg, Waves, OverlayLoader} from '../../components';
import Logo from '../../../assets/logo.svg';
import {scale, verticalScale} from '../../utils/resize';
import {colors, doubleIndent, fontNames, fontSizes, indent} from '../../styles';
import s from './styles';
import {ForgotScreen, LoginScreen, TermsScreen, OptScreen, SignupScreen} from './tabs';
import {screens} from '../../constants';
import {ModMap} from '../../modules';


const AuthTabs = createStackNavigator({
    [screens.LoginTab]  : { screen: LoginScreen},
    [screens.ForgotTab] : { screen: ForgotScreen},
    [screens.SignUpTab] : { screen: SignupScreen},
    [screens.OptTab]    : { screen: OptScreen},
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



const startY = (Platform.OS === 'android') ? 0 : getStatusBarHeight();
const barH = (Platform.OS === 'android') ? getStatusBarHeight() : 0;
const windowH = Dimensions.get('window').height - barH;
const topMargMin = indent + startY;
const topMargMax = Math.round(Dimensions.get('window').height * 0.04) + startY;//verticalScale(15)

class AuthMng extends React.Component<Props> {
    static router = AuthTabs.router;

    topLayoutH = 0;//Math.round(windowH * 0.1);

    state = {
        animOpacity : new Animated.Value(0.999),
        animLogoTop : topMargMax,
        animScrollH : windowH,
        animAreaH : windowH,
        animCntH : 0,//Math.round(windowH * 0.9),
        scrollEnabled : false,
        isLoading:false,
    };

    constructor(props) {
        super(props);
        console.log('AuthMng : ' + JSON.stringify(props));
        console.log('router : ' + JSON.stringify(AuthTabs.router));

        console.log('WINDOW H : ' + windowH);
    }

    _updateStateLayoutProps(iAnim = false, iKey = false, iKeyH = 0) {
        // console.log("!!! - ROUT STATE : " + this.props.navigation._childrenNavigation[this.props.navigation.state.routes[this.props.navigation.state.index].key].getParam('minSize', '213') );
        const areaMin = this._getCurrentRouteSize(this.props.navigation.state);//this.props.navigation.state.routes[this.props.navigation.state.index].params.minSize;
        let viewAreaH = windowH - iKeyH;
        let scrollH = windowH - iKeyH;
        let topMargin = iKey ? topMargMin : topMargMax;

        let topAreaH = this.topLayoutH + topMargin;
        let cntH = scrollH - topAreaH;

        if (iKey && areaMin > cntH){
            cntH = areaMin;
            scrollH = cntH + topAreaH;
        }

        if (iAnim) {LayoutAnimation.easeInEaseOut();}
        this.setState({animLogoTop: topMargin, animAreaH: viewAreaH, animCntH:cntH, animScrollH:scrollH, scrollEnabled: scrollH > viewAreaH });
    }

    _getCurrentRouteSize(navState):number {
        let value = 0;
        if (navState.routes[navState.index].hasOwnProperty('params')){
            value = navState.routes[navState.index].params.minSize;
        }
        return value ? value : 0;
    }

    _calcLayouts = (event) => {
        const topHeight = Math.round(event.nativeEvent.layout.height);
        if (this.topLayoutH >= topHeight) {return;}
        this.topLayoutH = topHeight;
        this._updateStateLayoutProps();
        // this.props.setCntHeight({tMin:this.topLayoutH + topMargMin, tMax: this.topLayoutH + topMargMax});
    };


    static getDerivedStateFromProps(props, state) {
        console.log('GET Derived AUTH MNG : ' + JSON.stringify(props));
        // console.log('GET Derived AUTH MNG : ' + JSON.stringify(state));
        if (props.loginIsLoading !== state.isLoading){
            return {isLoading : props.loginIsLoading};
        } else {
            return null;
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    // // if (this.props[ModMap.RegAnim] !== prevProps[ModMap.RegAnim]) {
    //     console.log('DID AUTH MNG : ' + JSON.stringify(this.props));
    //     // this._updateStateLayoutProps(this.props[ModMap.RegAnim]);
    // // }
    // }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardWillShow = (e) => {
        Animated.timing(this.state.animOpacity, {
            toValue: 0.0,
            duration: 500,
            useNativeDriver: true,
        }).start();

        this._updateStateLayoutProps(true, true, e.endCoordinates.height);
    };

    _keyboardWillHide = () => {
        Animated.timing(this.state.animOpacity, {
            toValue: 1.0,
            duration: 500,
            useNativeDriver: true,
        }).start();

        this._updateStateLayoutProps(true, false);
    };


    render() {
        const { navigation } = this.props;
        const { push, replace, popToTop, pop, dismiss } = navigation;
        // const activeRoute = routes[index];

        return (//{height:this.state.animAreaH},
            <View style={[s.fillAll, {backgroundColor: '#000000'}]}>
                <Animated.View style={[StyleSheet.absoluteFill, {opacity: this.state.animOpacity}]}>
                    <AppBg/>
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
                <OverlayLoader
                    visible={this.state.isLoading}
                    message="Loading... 😀😀😀"
                />
            </View>
        );
    }
}

// , scrollEnabled:false
//contentContainerStyle={{flex:1, justifyContent:'space-between', flexDirection:'column'}, flexWrap:'wrap'
//flex:.68//flex:.32//height:this.state.animAreaH,
//height:this.state.animAreaH,z
//flex:1, justifyContent:'flex-end', alignContent:"space-between", flexDirection:'column', flexWrap:'wrap'
//<SafeAreaView style={{ flex: 1 }} forceInset={{ horizontal: 'always', top: 'always' }} >
export default AuthMng;

