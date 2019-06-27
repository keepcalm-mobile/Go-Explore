import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class AppBackground extends React.PureComponent {
    render() {
        return (
            <LinearGradient
                colors={['#F8DF8D', '#FF9E18']}
                start={{ x: 0, y: 0, }}
                end={{ x: 1, y: 0 }}
                style={styles.background}
            />
        )
    }
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFill,
    },
});