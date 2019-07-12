import React from 'react';
import {Text, View} from 'react-native';
import s from './style';

class Bookmarks extends React.Component<Props> {
    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.container}>
                <Text style={s.welcome}>Bookmarks coming soon</Text>
            </View>
        );
    }
}

export default Bookmarks;
