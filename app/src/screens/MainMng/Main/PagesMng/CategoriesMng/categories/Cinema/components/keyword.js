import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import IconClose from '../../../../../../../../../assets/topIcons/closeIcon.svg';
import {scale} from "../../../../../../../../utils/resize";
import LinearGradient from "react-native-linear-gradient";

const Keyword = (props) => {
    return (
        <LinearGradient style={styles.keyword} colors={['#000000', '#3a3a3a']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity>
                <IconClose style={styles.closeIcon} />
            </TouchableOpacity>
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
       marginLeft: 9,
       marginRight: 9,
       flexDirection: 'row',
       // justifyContent: 'flex-start'
   },
   text: {
       color: '#ffffff',
       fontSize: 10,
       marginRight: 8
   },
    closeIcon: {
        width: 10,
        height: 10
    }
});

export default Keyword;
