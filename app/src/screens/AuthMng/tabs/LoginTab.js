import React from "react";
import { Animated, Dimensions, Keyboard, LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import s from "../styles";
import {TextInput} from "react-native-gesture-handler";
import ButtonOrange from "../../../components/ButtonOrange";
import LogoG from "../../../../assets/logoGoogle.svg";
import {scale, verticalScale} from "../../../utils/resize";
import LogoFb from "../../../../assets/logoFacebook.svg";
import {Auth, signIn} from "../../../api/Auth";
import {screens} from "../../../constants";
import TabResizer from "./TabResizer";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

class LoginTab extends TabResizer {//React.Component<Props> {
    constructor(props){
        super(props);

        console.log("LoginTab : " + JSON.stringify(props));

        this.state = {
            ...this.state,
            email:'',
            password:'',
            animSocialHeight: verticalScale(100),
            alpha:0,
        };
    }

    updateStateLayoutProps(iLayout, iAnim = false) {
        // LayoutAnimation.easeInEaseOut();
        // Animated.parallel([
        //     Animated.timing(this.state.animOpacity, {
        //         toValue: 0.0,
        //         duration: 500,
        //         useNativeDriver: true,
        //     }),
        //     // Animated.timing(this.state.animLogoTop, {
        //     //     toValue: verticalScale(25),
        //     //     duration: 500,
        //     //     useNativeDriver: true,
        //     // }),
        // ]).start();

        super.updateStateLayoutProps(iLayout, iAnim);
        let socHeight = this.keyboardShown ? 0 : verticalScale(100);

        if(iAnim) LayoutAnimation.easeInEaseOut();
        this.setState({animSocialHeight: socHeight});
    }


    _socialArea = () => {
        if (this.state.animSocialHeight > 1) {
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
            )
        } else {
            return null;
        }
    };

    _forgotArea = () => {
        if (this.state.animSocialHeight > 1) {
            return (
                <Text style={[s.forgot]} onPress={() => this.props.navigation.push(screens.ForgotTab)}>Forgot Password?</Text>
            )
        }else{
            return null;
        }
    };


    render() {
        const {bgStyle, textStyle} = super.render();

        return (
            //{/*<KeyboardAvoidingView style={s.bottom} behavior="padding">*/} // , justifyContent:'space-between', flexDirection:'column'
            <View style={[{height:this.state.areaHeight}]}>
                <View style={{height:this.state.separatorsHeight}}/>
                <View onLayout={this.calcCMax}>
                    <View onLayout={this.calcCMin}>
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
                <View style={{height:this.state.separatorsHeight}}/>
                <View onLayout={this.calcBMax}>

                    <ButtonOrange onLayout={this.calcBMin} onPress={this._signIn} title={'LOGIN'}/>

                    {this._socialArea()}

                    <Text onLayout={this.calcBMin} style={[s.signUp, s.bottom]}>New to Capi Restaurant?
                        <Text style={{color: '#ff0058'}} onPress={() => this.props.navigation.push(screens.SignUpTab)}> Sign up</Text>
                    </Text>
                </View>

            </View>
        //{/*<View style={{height:this.state.animEmpty}}/>*/}
            //{/*</KeyboardAvoidingView>*/}
        );
    }

    _signIn = async () => {
        const resp = await signIn(this.state.email, this.state.password);
        if(Auth.AUTH_COMPLETE === resp){
            this.props.navigation.navigate(screens.App);
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

export default LoginTab;