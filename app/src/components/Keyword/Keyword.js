import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import IconClose from '../../../assets/topIcons/closeIcon.svg';
import LinearGradient from "react-native-linear-gradient";

const Keyword = (props) => {

    let editable = props.editable ? props.editable : false;
    let fontSize = props.fontSize ? props.fontSize : 10;
    let active = props.active ? props.active : false;
    let item = {}

    let textStyle = active ? styles.textActive : styles.text;

    if (editable)
    {
        item = <View style={{flexDirection: 'row'}}>
            <Text style={[textStyle, {fontSize: fontSize}]}>{props.title}</Text>
            <TouchableOpacity>
                <IconClose style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
    }
    else
    {
        item = <Text style={[textStyle, {marginRight: 0, fontSize: fontSize}]}>{props.title}</Text>
    }

    let startColor = '#000000';
    let endColor = '#3a3a3a';

    if (props.active)
    {
        startColor = '#FF9E18';
        endColor = '#ffda66';
    }

    return (
        <LinearGradient style={styles.keyword} colors={[startColor, endColor]} useAngle={true} angle={17} angleCenter={{ x: 0.7, y: 0.7}}>
            {item}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    keyword: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#000000',
        borderRadius: 5,
        marginRight: 15,
        flexDirection: 'row',
        marginBottom: 15
    },
    text: {
        color: '#ffffff',
        fontSize: 10,
        marginRight: 8
    },
    textActive: {
      color: '#000000',
      fontWeight: 'bold',
      marginRight: 8,
      fontSize: 10
    },
    closeIcon: {
        width: 10,
        height: 10
    }
});

export default Keyword;
