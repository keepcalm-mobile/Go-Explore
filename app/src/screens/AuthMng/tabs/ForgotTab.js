import React from 'react';
import {View, Animated} from 'react-native';
import s from '../styles';
import TabResizer from './TabResizer';
import {TextInput} from 'react-native-gesture-handler';
import ButtonOrange from '../../../components/ButtonOrange';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

class ForgotTab extends TabResizer {
    constructor(props){
        super(props);

        console.log('ForgotTab : ' + JSON.stringify(props));

        this.state = {
            ...this.state,
            itemsMinCount:2,
            email: '',
        };
    }

    render() {
        const {bgStyle, textStyle} = super.render();

        return (
            //{/*<SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>*/}
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
                    </View>
                </View>

                <ButtonOrange onLayout={this.itemsMinCount} onPress={this._sendEmail} title={'SUBMIT'}/>
            </View>
            // </SafeAreaView>
        );
    }

    _sendEmail = async () => {
        // const resp = await signIn(this.state.email, this.state.password);
        // if (Auth.AUTH_COMPLETE === resp){
        //     this.props.navigation.navigate(screens.App);
        // } else {
        //     alert('Wrong all');
        // }
    };
}

export default ForgotTab;
