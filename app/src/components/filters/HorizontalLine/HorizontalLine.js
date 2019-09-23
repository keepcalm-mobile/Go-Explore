import React from 'react';
import {StyleSheet, View} from 'react-native';
import {doubleIndent, indent} from '../../../styles';

const HorizontalLine = () => (
    <View style={{marginHorizontal: indent, height: 1, flexDirection: 'row', marginVertical: indent,  backgroundColor: '#121212'}} />
);

export default HorizontalLine;
