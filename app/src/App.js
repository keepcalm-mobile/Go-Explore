import React from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import {scale, verticalScale} from './utils/resize';
import AppBackground from './components/AppBackground';
import Waves from './components/Waves';
import Logo from "../assets/logo.svg";
import LogoFb from "../assets/logoFacebook.svg";
import LogoG from "../assets/logoGoogle.svg";
import ButtonOrange from "./components/ButtonOrange";
import {createSwitchNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import {signIn, Auth, logOut} from "./api/Auth";


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//var logoW = Dimensions.get('window').width * .85;//Dimensions.get('window').width * .85 > 330 ? 330 : Dimensions.get('window').width * .85;
class LoginScreen extends React.Component {

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
        return (
            <View style={styles.container}>
                <AppBackground/>
                <Waves/>
                <Logo width={scale(330)} style={styles.logo}/>
                <Text style={styles.welcome}>Welcome to GoExplore City</Text>
                <Text style={styles.signIn}>Sign in to continue</Text>

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
                    <Text style={styles.forgot} onPress={this.onForgotPress}>Forgot Password?</Text>

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
                        <Text style={{color: '#ff0058'}} onPress={this.onSignUpPress}> Sign up</Text>
                    </Text>
                </View>

            </View>
        );
    }

    _signIn = async () => {
        const resp = await signIn(this.state.email, this.state.password);
        if(Auth.AUTH_COMPLETE === resp){
            this.props.navigation.navigate('App');
        }else{
            alert('Wrong all');
        }
        // if(userInfo.email===this.state.email && userInfo.password===this.state.password){
        //     alert('Logged');
        //     await AsyncStorage.setItem('logged', '1');
        //     this.props.navigation.navigate('App');
        // }else{
        //     alert('Wrong all');
        // }
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
    onSignUpPress = () => {
        alert("Sign Up");
    };
    onForgotPress = () => {
        alert("Forgot");
    };
    onLoginPress = () => {
        alert("Forgot");
    };
}





class HomeScreen extends React.Component{
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to GoExplore City</Text>
                <ButtonOrange onPress={this._logOut} title={'LOGOUT'}/>
            </View>
        );
    }

    _logOut = async () => {
        const resp = await logOut();
        if(Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

class AuthLoadingScreen extends React.Component{
    constructor(props){
        super(props);
        this._loadData();
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

    _loadData = async () => {
        const logged = await AsyncStorage.getItem('logged2');
        this.props.navigation.navigate(logged !== '1' ? 'Auth' : 'App');
    }
}

const AppStack = createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator({Login: LoginScreen});



export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack
        },{
            initialRouteName:'AuthLoading'
        }
    )
)



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
    }

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
