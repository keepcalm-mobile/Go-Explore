import React from 'react';
import {Text, View} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import ScrollablePage from '../../../ScrollablePage';


class HealthBeauty extends ScrollablePage {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={s.container}>
                <Text style={s.welcome}>Health Beauty coming soon</Text>
            </View>
        );
    }
// <ButtonOrange onPress={this._logOut} title={'LOGOUT'}/>
    _logOut = async () => {
        const resp = await logOut();
        if (Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

export default HealthBeauty;
