import React from 'react';
import {Text, View} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import ScrollablePage from '../../../ScrollablePage';


class Travel extends ScrollablePage {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={s.container}>
                <Text style={s.welcome}>Travel coming soon</Text>
                <ButtonOrange onPress={this._logOut} title={'LOGOUT'}/>
            </View>
        );
    }

    _logOut = async () => {
        const resp = await logOut();
        if (Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

export default Travel;
