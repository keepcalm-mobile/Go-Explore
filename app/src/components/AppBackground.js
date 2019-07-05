import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles';


const AuthBackground = () => (
    <LinearGradient
        colors={[colors.lightMain, colors.darkMain]}
        start={{ x: 0, y: 0, }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
    />
);

export default AuthBackground;