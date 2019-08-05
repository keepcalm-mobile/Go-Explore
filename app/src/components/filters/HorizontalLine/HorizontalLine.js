import React from 'react';
import {StyleSheet, View} from 'react-native';
import {indent} from '../../../styles';

const HorizontalLine = () => (
        <View style={{width: '100%', height: 1, flexDirection: 'row', marginVertical: indent,  backgroundColor: '#121212'}} />
    );

export default HorizontalLine;