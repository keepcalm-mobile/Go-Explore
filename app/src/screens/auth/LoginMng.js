import React from "react";
import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, Animated, Easing} from "react-native";
import AppBackground from "../../components/AppBackground";
import Waves from "../../components/Waves";
import Logo from "../../../assets/logo.svg";
import {scale, verticalScale} from "../../utils/resize";
import {TextInput} from "react-native-gesture-handler";
import ButtonOrange from "../../components/ButtonOrange";
import LogoG from "../../../assets/logoGoogle.svg";
import LogoFb from "../../../assets/logoFacebook.svg";
import {auth, Auth, signIn} from "../../api/Auth";
import {createStackNavigator, SafeAreaView, StackViewTransitionConfigs} from "react-navigation";













class TermsScreen extends React.Component<Props> {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text style={styles.welcome}>OPTScreen</Text>
            </SafeAreaView>
        );
    }
}


class OptScreen extends React.Component<Props> {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text style={styles.welcome}>OPTScreen</Text>
            </SafeAreaView>
        );
    }
}


class ForgotScreen extends React.Component<Props> {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text style={styles.welcome}>ForgotScreen</Text>
            </SafeAreaView>
        );
    }
}


class SignupScreen extends React.Component<Props> {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text style={styles.welcome}>SignupScreen</Text>
            </SafeAreaView>
        );
    }
}


class LoginScreen extends React.Component<Props> {

    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:''
        };
    }

    static navigationOptions = {
        header:null
    };

    render() {
        const { navigation } = this.props;
        const { push, replace, popToTop, pop, dismiss } = navigation;

        return (
            // {/*<View style={styles.container}>*/}


                <View style={styles.bottom}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'#B7B7B7'}
                        keyboardType={'email-address'}
                        onChangeText={(email)=>this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={'#B7B7B7'}
                        onChangeText={(password)=>this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <Text style={styles.forgot} onPress={() => push('Forgot')}>Forgot Password?</Text>

                    <ButtonOrange onPress={this._signIn} title={'LOGIN'}/>
                    <Text style={styles.socialTitle}>or login with</Text>

                    <View style={styles.socialArea}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.socialBtn} onPress={this.onGooglePress}>
                            <LogoG width={scale(43)}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.socialBtn} onPress={this.onFacebookPress}>
                            <LogoFb width={scale(43)}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.signUp}>New to Capi Restaurant?
                        <Text style={{color: '#ff0058'}} onPress={() => push('Signup')}> Sign up</Text>
                    </Text>
                </View>

            // </View>
        );
    }

    _signIn = async () => {
        const resp = await signIn(this.state.email, this.state.password);
        if(Auth.AUTH_COMPLETE === resp){
            this.props.navigation.navigate('App');
        }else{
            alert('Wrong all');
        }
    };

    onGooglePress = () => {
        alert("Google login");
        // this.setState({
        //     count: this.state.count+1
        // })
    };
    onFacebookPress = () => {
        alert("Facebook login");
    };
}



const LoginTabs = createStackNavigator({
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



export class LoginMng extends React.Component<Props> {
    static router = LoginTabs.router;

    // componentWillUpdate() {
    //     LayoutAnimation.easeInEaseOut();
    // }

    render() {
        const { navigation } = this.props;
        const { push, replace, popToTop, pop, dismiss } = navigation;
        // const activeRoute = routes[index];

        return (
            <View style={{ flex: 1 }}>
            {/*<SafeAreaView style={{ flex: 1 }} forceInset={{ horizontal: 'always', top: 'always' }} >*/}
                <AppBackground/>
                <Waves/>
                <View style={styles.container}>
                    <Logo width={scale(330)} style={styles.logo}/>
                    <Text style={styles.welcome}>Welcome to GoExplore City</Text>
                    <Text style={styles.signIn}>Sign in to continue</Text>

                    <LoginTabs navigation={navigation}/>
                </View>




            {/*</SafeAreaView>*/}
            </View>
        );
    }
}






export class AuthLoadingScreen extends React.Component<Props> {
    constructor(props){
        super(props);
        this._auth();
    }
    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator>
                    <StatusBar barStyle={'default'}/>
                </ActivityIndicator>
                <Text style={styles.welcome}>Loading</Text>
            </View>
        );
    }

    _auth = async () => {
        const logged = await auth();
        this.props.navigation.navigate(logged !== Auth.AUTH_COMPLETE ? 'Auth' : 'App');
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },

    logo: {
        // position: 'absolute',
        left: '6.29%',
        marginTop: verticalScale(55),
        marginBottom: verticalScale(15.5),
        // top: '6.77%',
    },

    welcome: {
        // position: 'absolute',
        left: '5.6%',
        fontFamily: 'Poppins-Bold',
        fontSize: scale(24),
        lineHeight: 36,
        color: '#FFFFFF',
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },

    signIn:{
        fontFamily: 'Poppins-Regular',
        left: '5.6%',
        fontSize: scale(12),
        color: '#FFFFFF',
    },

    input:{
        margin:15,
        height:40,
        padding:5,
        fontSize:scale(16),
        borderBottomWidth:1,
        borderBottomColor:'#ffa83b',
        color: 'white',
        fontFamily: 'Poppins-Regular',
    },

    forgot: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'right',
        color: '#FFFFFF',
        fontSize: scale(16),
        right: '5.6%',
        // paddingBottom: verticalScale(73),
        marginBottom: verticalScale(73),
    },

    socialTitle: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: scale(18),
        // paddingBottom: verticalScale(73),
    },

    socialArea: {
        // paddingLeft: '30%',
        // paddingRight: '30%',
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center',//'space-evenly',
    },

    socialBtn: {
        flexDirection:'column',
        padding: scale(12)
    },

    signUp: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: '#EEF6FF',
        fontSize: scale(16),
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: verticalScale(16),
    },

    // container2: {
    //     backgroundColor:'green',
    //     flex: 1,
    // },
    // child: {
    //     flex: 1,
    //     backgroundColor: 'blue',
    //     transform: [
    //         { perspective: 850 },
    //         { translateX: - Dimensions.get('window').width * 0.24 },
    //         { rotateY: '60deg'},
    //
    //     ],
    // }
});

// export default {LoginScreen, AuthLoadingScreen};
