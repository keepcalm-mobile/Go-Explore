import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import s from '../styles';
import {TextInput} from 'react-native-gesture-handler';
import ButtonOrange from '../../../components/ButtonOrange';
import LogoG from '../../../../assets/logoGoogle.svg';
import {scale, verticalScale} from '../../../utils/resize';
import LogoFb from '../../../../assets/logoFacebook.svg';
import {screens} from '../../../constants';
import TabResizer from './TabResizer';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const animValue = verticalScale(100);

class LoginTab extends TabResizer {
    constructor(props){
        super(props);

        console.log('LoginTab : ' + JSON.stringify(props));

        this.state = {
            ...this.state,
            animSocialHeight: animValue,
            itemsMinCount:3,
            email:'',
            password:'',
        };
    }

    static getDerivedStateFromProps(props, state) {
        if ( props.isSuccess ){
            props.navigation.navigate(screens.App);
        }
        return null;
    }

    updateStateLayoutProps(iAnim = false, iKeyboard = false) {
        super.updateStateLayoutProps(iAnim, iKeyboard);
        this.setState({animSocialHeight: iKeyboard ? 0 : animValue});
    }


    _socialArea = () => {
        if (this.state.animSocialHeight > animValue * 0.5) {
            return (
                <>
                    <Text style={s.socialTitle}>or login with</Text>
                    <View style={s.socialArea}>
                        <TouchableOpacity activeOpacity={0.5} style={s.socialBtn} onPress={this.onGooglePress}>
                            <LogoG width={scale(43)}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={s.socialBtn} onPress={this.onFacebookPress}>
                            <LogoFb width={scale(43)}/>
                        </TouchableOpacity>
                    </View>
                </>
            );
        } else {
            return null;
        }
    };

    _forgotArea = () => {
        if (this.state.animSocialHeight > animValue * 0.5) {
            return (<Text style={[s.forgot]} onPress={this.onForgotPress}>Forgot Password?</Text>);
        } else {
            return null;
        }
    };


    onSignInPress = () => {
        this.props.login({email:this.state.email, pass:this.state.password});
    };

    onForgotPress = () => {
        this.props.navigation.navigate({ routeName: screens.ForgotTab, key:screens.ForgotTab + 'Key'});
    };

    onSignUpPress = () => {
        this.props.navigation.navigate({ routeName: screens.SignUpTab, key:screens.SignUpTab + 'Key'});
    };

    onGooglePress = () => {
        // LoginManager.logOut();
        // alert('Google login');
    };

    /**** FACEBOOK ****/
    _responseInfoCallback = (error: ?Object, result: ?Object) => {
        if (error) {
            console.log('Error fetching data: ' + error.toString());
        } else {
            this.props.registration({login:result.name, email:result.email, phone:'', password:''});
            console.log('Success fetching data: ' + JSON.stringify(result));
        }
    };

    _getUserData = () => {
        const infoRequest = new GraphRequest(
            '/me?locale=en_US&fields=name,email',
            null,
            this._responseInfoCallback,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    };

    onFacebookPress = () => {
        LoginManager.logInWithPermissions(['public_profile', "email"]).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    console.log(
                        'Login success with permissions: ' +
                        result.grantedPermissions.toString()
                    );
                    this._getUserData();
                }
            },
            (error) => {
                console.log('Login fail with error: ' + error);
            }
        );
    };

    render() {
        const {bgStyle, textStyle} = super.render();

        return (
            //{/*<KeyboardAvoidingView style={s.bottom} behavior="padding">*/} // , justifyContent:'space-between', flexDirection:'column'
            <View style={{flex:1, justifyContent:'space-between', flexDirection:'column'}}>
                <View style={{height:1}}/>

                <View>
                    <View onLayout={this.itemsMinCount}>
                        <Animated.View style={[s.inputBg, bgStyle]}/>
                        <AnimatedInput
                            style={[s.input, textStyle]}
                            placeholder="Email"
                            placeholderTextColor={'#B7B7B7'}
                            keyboardType={'email-address'}
                            onChangeText={(email)=>this.setState({email})}
                            value={this.state.email}
                        />
                        <Animated.View style={[s.inputBg, bgStyle]}/>
                        <AnimatedInput
                            style={[s.input, textStyle]}
                            placeholder="Password"
                            placeholderTextColor={'#B7B7B7'}
                            onChangeText={(password)=>this.setState({password})}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </View>
                    {this._forgotArea()}
                </View>

                <View>
                    <ButtonOrange onLayout={this.itemsMinCount} onPress={this.onSignInPress} title={'LOGIN'}/>

                    {this._socialArea()}

                    <Text onLayout={this.itemsMinCount} style={[s.signUp, s.bottom]}>New to Capi Restaurant?
                        <Text style={{color: '#ff0058'}} onPress={this.onSignUpPress}> Sign up</Text>
                    </Text>
                </View>

            </View>
            //{/*</KeyboardAvoidingView>*/}
        );
    }
}

export default LoginTab;
