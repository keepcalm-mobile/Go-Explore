import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import s from '../styles';
import TabResizer from './TabResizer';
import {screens} from '../../../constants';
import {doubleIndent, indent} from '../../../styles';
import ButtonOrange from '../../../components/ButtonOrange';
import LinearGradient from 'react-native-linear-gradient';


class TermsTab extends TabResizer {
    constructor(props){
        super(props);

        console.log('OtpTab : ' + JSON.stringify(props));

        this.state = {
            ...this.state,
            itemsMinCount:2,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if ( props.isSuccess ){
            props.navigation.navigate(screens.App);
        }
        return null;
    }

    render() {

        return (
            <View style={{flex:1, justifyContent:'space-between', flexDirection:'column'}}>
                <LinearGradient colors={['#000000', '#00000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{zIndex:1, height:doubleIndent * 2, marginBottom:-doubleIndent * 2}} />

                <ScrollView contentContainerStyle={{paddingTop:doubleIndent, paddingBottom:doubleIndent}}
                            style={{marginBottom:indent}}
                            scrollEnabled={this.state.scrollEnabled}
                            keyboardShouldPersistTaps={'handled'}
                            removeClippedSubviews={false}
                            onLayout={this.itemsMinCount}>
                        <Text style={s.terms}>{TermsText}</Text>
                </ScrollView>

                <LinearGradient colors={['#00000000', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{height:doubleIndent * 2, marginTop:-doubleIndent * 2}} />
                <ButtonOrange onLayout={this.itemsMinCount} onPress={this._onFinish} title={'FINISH'}/>
            </View>
        );
    }

    _onFinish = () => {
        this.props.confirm(this.state.value0 + this.state.value1 + this.state.value2 + this.state.value3);
    };
}

export default TermsTab;

const TermsText = 'Terms of service (also known as terms of use and terms and conditions, commonly abbreviated as TOS or ToS and ToU) are rules by which one must agree to abide in order to use a service.Terms of service can also be merely a disclaimer, especially regarding the use of websites.\n' +
    '\n' +
    'The Terms of Service Agreement is mainly used for legal purposes by companies which provide software or services, such as browsers, e-commerce, search engines, social media, and transport services.\n' +
    '\n' +
    'A legitimate terms-of-service agreement is legally binding and may be subject to change. Companies can enforce the terms by refusing service. Customers can enforce by filing a suit or arbitration case if they can show they were actually harmed by a breach of the terms. There is a heightened risk of data going astray during corporate changes, including mergers, divestitures, buyouts, downsizing, etc., when data can be transferred improperly.';
