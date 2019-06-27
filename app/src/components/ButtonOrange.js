import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from '../utils/resize';


class ButtonOrange extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render = () => {
        const { title, onPress } = this.props;
        return (

            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                <LinearGradient colors={['#FF9E18', '#F8DF8D']} start={{ x: 0, y: 0, }} end={{ x: 1, y: 0 }} style={styles.linearGradient} >
                    <Text style={styles.buttonText}> {title} </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        // flex: 1,
        marginBottom: verticalScale(24),
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        fontSize: scale(16),
        textAlign: 'center',
        marginTop: verticalScale(19),
        marginBottom: verticalScale(13),
        color: '#ffffff',
        backgroundColor: 'transparent',
        letterSpacing: 2,
    },
});

export default ButtonOrange;