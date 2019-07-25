import React from 'react';
import {StyleSheet, View} from 'react-native';

const HorizontalLine = (props) => {
    return (
        <View style={{width: '100%', height: 2, flexDirection: 'row', marginTop: 15, marginBottom: 15}}>
            <View style={{flex: 1, backgroundColor: '#222222'}}></View>
        </View>
    );
}

export default HorizontalLine;
