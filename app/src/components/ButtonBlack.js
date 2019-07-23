import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from '../utils/resize';
import {colors, fontSizes, fontNames, indent} from "../styles";
import type {Props} from "react-native/Libraries/Components/View/View";


class ButtonBlack extends React.Component<Props> {
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
                    <LinearGradient colors={['#000000', '#3A3A3A']} start={{ x: 0, y: 0, }} end={{ x: 1, y: 0 }} style={styles.linearDark} >
                        <Text style={styles.buttonText}> {title} </Text>
                    </LinearGradient>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        padding: scale(1.25),
        marginLeft: indent,
        marginRight: indent,
        borderRadius: 8,
    },
    linearDark: {
        // marginBottom: verticalScale(24),
        // marginLeft: indent,
        // marginRight: indent,
        borderRadius: 7,
    },
    buttonText: {
        fontFamily: fontNames.bold,
        fontSize: fontSizes.smallBtn,
        textAlign: 'center',
        marginTop: scale(4),
        marginBottom: scale(3.5),
        marginHorizontal: indent * 0.75,
        lineHeight: scale(17),
        color: colors.white,
        backgroundColor: 'transparent',
        // letterSpacing: 2,
    },
});

export default ButtonBlack;
