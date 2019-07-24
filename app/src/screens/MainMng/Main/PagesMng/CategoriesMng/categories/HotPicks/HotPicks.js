import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import s from './style';
import {Auth, logOut} from '../../../../../../../api/Auth';
import Template from '../Template';


class HotPicks extends Template {
    state = {

    };

    constructor(props) {
        super(props);
    }

    // render() {
    //     super.render();
    // }

    _logOut = async () => {
        const resp = await logOut();
        if (Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

export default HotPicks;
