import React from 'react';
import {Animated, View} from 'react-native';
import s from '../styles';
import TabResizer from './TabResizer';
import ButtonOrange from '../../../components/ButtonOrange';
import {TextInput} from 'react-native-gesture-handler';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

class SignupTab extends TabResizer {
    constructor(props){
        super(props);

        console.log('SignupTab : ' + JSON.stringify(props));

        this.state = {
            ...this.state,
            itemsMinCount:2,
            email: '',
            phoneNumber: '',
            fullName: '',
            password: '',
        };
    }


    render() {
        const {bgStyle, textStyle} = super.render();

        return (
            <View style={{flex:1, justifyContent:'space-between', flexDirection:'column'}}>
                <View style={{height:1}}/>
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
                        placeholder="Mobile Number"
                        placeholderTextColor={'#B7B7B7'}
                        keyboardType={'phone-pad'}
                        onChangeText={(phoneNumber)=>this.setState({phoneNumber})}
                        value={this.state.phoneNumber}
                    />
                    <Animated.View style={[s.inputBg, bgStyle]}/>
                    <AnimatedInput
                        style={[s.input, textStyle]}
                        placeholder="Full Name"
                        placeholderTextColor={'#B7B7B7'}
                        keyboardType={'default'}
                        onChangeText={(fullName)=>this.setState({fullName})}
                        value={this.state.fullName}
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

                <ButtonOrange onLayout={this.itemsMinCount} onPress={this._onSignUpPress} title={'SIGN UP'}/>
            </View>
        );
    }

    _onSignUpPress = async () => {
        // const resp = await signIn(this.state.email, this.state.password);
        // if (Auth.AUTH_COMPLETE === resp){
        //     this.props.navigation.navigate(screens.App);
        // } else {
        //     alert('Wrong all');
        // }
    };
}

export default SignupTab;
