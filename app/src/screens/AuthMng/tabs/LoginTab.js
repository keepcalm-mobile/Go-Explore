import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
// import s from "../styles";
import {TextInput} from "react-native-gesture-handler";
import ButtonOrange from "../../../components/ButtonOrange";
import LogoG from "../../../../assets/logoGoogle.svg";
import {scale, verticalScale} from "../../../utils/resize";
import LogoFb from "../../../../assets/logoFacebook.svg";
import {Auth, signIn} from "../../../api/Auth";
import {colors, doubleIndent, fontNames, fontSizes} from "../../../styles";

class LoginTab extends React.Component<Props> {

    constructor(props){
        super(props);

        console.log("LoginTab : " + JSON.stringify(props));

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
            // {/*<View style={s.container}>*/}


            <View style={s.bottom}>
                <TextInput
                    style={s.input}
                    placeholder="Email"
                    placeholderTextColor={'#B7B7B7'}
                    keyboardType={'email-address'}
                    onChangeText={(email)=>this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    style={s.input}
                    placeholder="Password"
                    placeholderTextColor={'#B7B7B7'}
                    onChangeText={(password)=>this.setState({password})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text style={s.forgot} onPress={() => push('Forgot')}>Forgot Password?</Text>

                <ButtonOrange onPress={this._signIn} title={'LOGIN'}/>
                <Text style={s.socialTitle}>or login with</Text>

                <View style={s.socialArea}>
                    <TouchableOpacity activeOpacity={0.5} style={s.socialBtn} onPress={this.onGooglePress}>
                        <LogoG width={scale(43)}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={s.socialBtn} onPress={this.onFacebookPress}>
                        <LogoFb width={scale(43)}/>
                    </TouchableOpacity>
                </View>

                <Text style={s.signUp}>New to Capi Restaurant?
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

export default LoginTab;


const s = StyleSheet.create({
    container: {
        flex: 1,
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
        fontFamily: fontNames.bold,
        fontSize: fontSizes.heading,
        lineHeight: 36,
        color: colors.white,
        // paddingTop:20,
        // height: 36,
        // top:'18%',
        // textAlign: 'center',
        // margin: 10,
    },

    signIn:{
        fontFamily: 'Poppins-Regular',
        left: '5.6%',
        fontSize: fontSizes.small,
        color: colors.white,
    },

    input:{
        margin:15,
        height:40,
        padding:5,
        fontSize: fontSizes.medium,
        borderBottomWidth:1,
        borderBottomColor:'#ffa83b',
        color: colors.white,
        fontFamily: fontNames.regular,
    },

    forgot: {
        fontFamily: fontNames.regular,
        textAlign: 'right',
        color: colors.white,
        fontSize: fontSizes.medium,
        right: '5.6%',
        // paddingBottom: verticalScale(73),
        marginBottom: verticalScale(73),
    },

    socialTitle: {
        fontFamily: fontNames.regular,
        textAlign: 'center',
        color: colors.white,
        fontSize: fontSizes.big,
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
        fontSize: fontSizes.medium,
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