import React from 'react';
import { Animated, Dimensions, Keyboard, LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import s from '../styles';
import {TextInput} from 'react-native-gesture-handler';
import ButtonOrange from '../../../components/ButtonOrange';
import LogoG from '../../../../assets/logoGoogle.svg';
import {scale, verticalScale} from '../../../utils/resize';
import LogoFb from '../../../../assets/logoFacebook.svg';
import {Auth, signIn} from '../../../api/Auth';
import {screens} from '../../../constants';
import TabResizer from './TabResizer';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

class LoginTab extends TabResizer {
    constructor(props){
        super(props);

        console.log('LoginTab : ' + JSON.stringify(props));

        this.state = {
            ...this.state,
            animSocialHeight: verticalScale(100),
            itemsMinCount:3,
            email:'',
            password:'',
        };
    }

    updateStateLayoutProps(iLayout, iAnim = false, iKeyboard = false) {
        super.updateStateLayoutProps(iLayout, iAnim, iKeyboard);
        let socHeight = iKeyboard ? 0 : verticalScale(100);

        // if (iAnim) LayoutAnimation.easeInEaseOut();
        this.setState({animSocialHeight: socHeight});
    }


    _socialArea = () => {
        if (this.state.animSocialHeight > 50) {
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
        if (this.state.animSocialHeight > 50) {
            return ( <Text style={[s.forgot]} onPress={this.onForgotPress}>Forgot Password?</Text> );
        } else {
            return null;
        }
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

    onSignInPress = async () => {
        // const resp = await signIn(this.state.email, this.state.password);
        // if (Auth.AUTH_COMPLETE === resp){
            this.props.navigation.navigate(screens.App);
        // } else {
        //     alert('Wrong all');
        // }
    };

    onForgotPress = () => {
        this.props.navigation.navigate({ routeName: screens.ForgotTab, key:screens.ForgotTab + 'Key'});
        // this.props.navigation.push(screens.ForgotTab);
    };

    onSignUpPress = () => {
        this.props.navigation.navigate({ routeName: screens.SignUpTab, key:screens.SignUpTab + 'Key'});
    };

    onGooglePress = () => {
        alert('Google login');
        // this.setState({
        //     count: this.state.count+1
        // })
    };

    onFacebookPress = () => {
        alert('Facebook login');
    };
}

export default LoginTab;
