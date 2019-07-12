import React from 'react';
import {Animated, Keyboard, View} from 'react-native';
import s from '../styles';
import {TextInput} from 'react-native-gesture-handler';
import TabResizer from './TabResizer';
import ButtonOrange from '../../../components/ButtonOrange';
import {screens} from '../../../constants';
import {fontNames, fontSizes} from '../../../styles';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

class OtpTab extends TabResizer {
    constructor(props){
        super(props);

        console.log('OtpTab : ' + JSON.stringify(props));

        this.state = {
            ...this.state,
            itemsMinCount:2,
            value0:'•',
            value1:'•',
            value2:'•',
            value3:'•',
            prevValue:'',
        };

        this.inputs = [];
    }

    static getDerivedStateFromProps(props, state) {
        if ( props.isSuccess ){
            props.navigation.navigate({ routeName: screens.TermsTab, key:screens.TermsTab + 'Key'});
        }
        return null;
    }

    _socialArea = () => {
        let items = [];
        const {bgStyle, textStyle} = super.render();

        for (let i = 0; i < 4; i++) {

            items.push(
                <View key={'uniqueKey' + i.toString()}>
                    <Animated.View style={[s.inputBg, bgStyle]}/>
                    <AnimatedInput
                        ref={(input) => { this.inputs[i] = input; }}
                        maxLength={1}
                        // selectTextOnFocus={true}
                        blurOnSubmit={false}
                        clearTextOnFocus={true}
                        style={[s.input, textStyle, {textAlign: 'center', fontFamily: fontNames.bold, fontSize: fontSizes.heading}]}
                        keyboardType={'phone-pad'}
                        onFocus={ () => this._onFocusField(i) }
                        onKeyPress={ (iValue) => this._onKeyPress(iValue, i) }
                        onEndEditing={ () => this._onEndEditing(i) }
                        onChangeText={ (iValue) => this._onChangeText(iValue, i) }
                        value={this.state['value' + i.toString()]}
                    />
                </View>
            );
        }

        return items;
    };


    _onFocusField = (i) => {
        this.setState({ ['value' + i.toString()] : '', prevValue:this.state['value' + i.toString()] });
    };

    _onKeyPress = (iValue, i) => {
        if (iValue.nativeEvent.key === 'Backspace' && i !== 0){
            this.setState({['value' + i.toString()] : '•', prevValue:'•'} );
            this.inputs[(i - 1)].getNode().focus();
        } else {
            this.setState({prevValue:'•'} );
        }
    };

    _onEndEditing = (i) => {
        if (this.inputs[i].props.value === ''){
            this.setState({ ['value' + i.toString()] : this.state.prevValue });
        }
    };

    _onChangeText = (iValue, i) => {
        if (iValue !== '') {
            this.setState({['value' + i.toString()]: iValue});
            if (i === this.inputs.length - 1) {
                Keyboard.dismiss();
            } else {
                this.inputs[i + 1].getNode().focus();
            }
        }
    };


    render() {

        return (
            <View style={{flex:1, justifyContent:'space-between', flexDirection:'column'}}>
                <View style={{height:1}}/>

                <View onLayout={this.itemsMinCount} style={{justifyContent:'center', flexDirection:'row'}}>
                    {this._socialArea()}
                </View>

                <ButtonOrange onLayout={this.itemsMinCount} onPress={this._confirmPhone} title={'VERIFY NOW'}/>
            </View>
        );
    }

    _confirmPhone = () => {
        this.props.confirm(this.state.value0 + this.state.value1 + this.state.value2 + this.state.value3);
    };
}

export default OtpTab;
