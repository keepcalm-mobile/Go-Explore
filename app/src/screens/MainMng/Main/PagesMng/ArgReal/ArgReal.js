import React from 'react';
import {Text, View} from 'react-native';
import s from './style';

class ArgReal extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.container}>
                <Text style={s.welcome}>AR coming soon</Text>
            </View>
        );
    }
}

export default ArgReal;
