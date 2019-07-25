import React from 'react';
import {Text, View} from 'react-native';
import s from './style';
import {Auth, logOut} from '../../../../../../../api/Auth';
import ButtonOrange from '../../../../../../../components/ButtonOrange';


class HotPicks extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.container}>
                <Text style={s.welcome}>Shopping coming soon</Text>
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

export default HotPicks;
