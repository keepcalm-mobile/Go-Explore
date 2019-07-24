import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import s, { colors, fontNames, fontSizes, indent} from '../../styles';
import circleGlow from '../../../assets/rating/circleGlow.png';

const CircleValues = (props) => {

    let values = props.values ? props.values : null;

    let component = <Text style={{color: '#ffffff'}}>Values property is empty: {JSON.stringify(props.values)}</Text>

    let items = []

    if (values)
    {
        for (let i = 0; i < values.length; i++) {
            if (values[i].active)
            {
                items.push(<View style={[styles.circle, {borderWidth: 0}]}>
                    <Image style={styles.glow} source={circleGlow} />
                    <Text style={styles.text}>{values[i].text}</Text>
                </View>);
            }
            else
            {
                items.push(<View style={styles.circle}>
                    <Text style={styles.text}>{values[i].text}</Text>
                </View>);
            }
        }
        component = <View style={{flexDirection: 'row'}}>{items}</View>
    }

    return (
        <View>
            {component}
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12
    },
    text: {
        color: colors.white,
        fontSize: fontSizes.big
    },
    glow: {
        position: 'absolute',
        left: -11,
        top: -12
    }
});

export default CircleValues;
