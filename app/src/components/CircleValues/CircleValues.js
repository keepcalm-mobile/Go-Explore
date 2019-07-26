import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';

import s, { colors, fontNames, fontSizes, indent} from '../../styles';
import circleGlow from '../../../assets/rating/circleGlow.png';

class CircleValues extends  React.Component{

    constructor(props) {
        super(props);
        this.state = {
            values: props.values ? props.values : null,
            onValuesChanged: props.onValuesChanged ? props.onValuesChanged : (values) => {}
        }
    }

    itemClicked = (title) => {

        let list = [...this.state.values];

        for(let i = 0; i < list.length; i++){
            if ( list[i].text === title) {
                list[i].active = !list[i].active;
            }
        }

        this.setState({
            values: list
        });

        this.state.onValuesChanged(this.state.values);
    }

    render() {

        let component = <Text style={{color: '#ffffff'}}>Values property is empty: {JSON.stringify(this.state.values)}</Text>

        let items = []

        if (this.state.values)
        {
            for (let i = 0; i < this.state.values.length; i++) {
                if (this.state.values[i].active)
                {
                    items.push(<TouchableOpacity key={i} style={[styles.circle, {borderWidth: 0}]} onPress={() => {this.itemClicked(this.state.values[i].text);}}>
                        <Image style={styles.glow} source={circleGlow} />
                        <Text style={styles.text}>{this.state.values[i].text}</Text>
                    </TouchableOpacity>);
                }
                else
                {
                    items.push(<TouchableOpacity key={i} style={styles.circle} onPress={() => {this.itemClicked(this.state.values[i].text);}}>
                        <Text style={styles.text}>{this.state.values[i].text}</Text>
                    </TouchableOpacity>);
                }
            }
            component = <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>{items}</View>
        }

        return (
            <View style={{flexDirection: 'row', width: '100%', height: 44, marginTop: 15}}>
                {component}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        width: 44,
        height: 44,
        borderRadius: 44,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center'
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
