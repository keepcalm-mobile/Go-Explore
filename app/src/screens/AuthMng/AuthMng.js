import React from "react";
import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, Animated, Easing} from "react-native";
import AuthBackground from "../../components/AppBackground";
import Waves from "../../components/Waves";
import Logo from "../../../assets/logo.svg";
import {scale} from "../../utils/resize";
import {createStackNavigator} from "react-navigation";
import s from './styles';
import {ForgotScreen, LoginScreen, TermsScreen, OptScreen, SignupScreen} from "./tabs";
import AuthLoader from "../AuthLoader/AuthLoader";


const AuthTabs = createStackNavigator({
    Login: LoginScreen,
    Forgot: ForgotScreen,
    Signup: SignupScreen,
    Opt: OptScreen,
    Terms: TermsScreen,
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

    constructor(props) {
        super(props);
        console.log("AuthMng : " + JSON.stringify(props));
    }

    // componentWillUpdate() {
    //     // LayoutAnimation.easeInEaseOut();
    // }

    render() {
        const { navigation } = this.props;
        const { push, replace, popToTop, pop, dismiss } = navigation;
        // const activeRoute = routes[index];

        return (
            <View style={{ flex: 1 }}>
            {/*<SafeAreaView style={{ flex: 1 }} forceInset={{ horizontal: 'always', top: 'always' }} >*/}
                <AuthBackground/>
                <Waves/>
                <View style={s.container}>
                    <Logo width={scale(330)} style={s.logo}/>
                    <Text style={s.welcome}>Welcome to GoExplore City</Text>
                    <Text style={s.signIn}>Sign in to continue</Text>

                    <AuthTabs navigation={navigation}/>
                </View>




            {/*</SafeAreaView>*/}
            </View>
        );
    }
}

export default AuthMng;

