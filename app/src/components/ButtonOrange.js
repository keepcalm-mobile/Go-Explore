import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from '../utils/resize';
import {colors, fontSizes, fontNames, indent} from "../styles";
import type {Props} from "react-native/Libraries/Components/View/View";


class ButtonOrange extends React.Component<Props> {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        onLayout: PropTypes.func,
    };

    render = () => {
        const { title, onPress, onLayout } = this.props;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} onLayout={onLayout}>
                <LinearGradient colors={[colors.darkMain, colors.lightMain]} start={{ x: 0, y: 0, }} end={{ x: 1, y: 0 }} style={styles.linearGradient} >
                    <Text style={styles.buttonText}> {title} </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        marginBottom: verticalScale(24),
        marginLeft: indent,
        marginRight: indent,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.medium,
        textAlign: 'center',
        marginTop: verticalScale(19),
        marginBottom: verticalScale(13),
        // lineHeight: scale(56),
        color: colors.white,
        backgroundColor: 'transparent',
        letterSpacing: 2,
    },
});

export default ButtonOrange;
