import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ToastAndroid} from 'react-native';

import IconClose from '../../../../assets/serviceIcons/closeIcon.svg';
import LinearGradient from "react-native-linear-gradient";

class Keyword extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            toggle: props.toggle ? props.toggle : false,
            editable: props.editable ? props.editable : false,
            fontSize: props.fontSize ? props.fontSize : 10,
            active: props.active ? props.active : false,
            onDelete: props.onDelete ? props.onDelete : (title) => {},
            onPress: props.onPress ? props.onPress : () => {},
            item: null,
            textStyle: styles.text,
            title: props.title ? props.title : '',
            startColor: '#000000',
            endColor: '#3a3a3a',
        };
    }

    componentDidMount(): void {
        if (this.state.active === true) {
            this.setState({
                textStyle: styles.textActive,
                startColor: '#ff9e18',
                endColor: '#ffda66',
            });
        }

        if (this.state.editable === true)
        {
            this.setState({
                item: <View style={{flexDirection: 'row'}}>
                    <Text style={[this.state.textStyle, {fontSize: this.state.fontSize}]}>{this.state.title}</Text>
                    <TouchableOpacity onPress={() => {this.state.onDelete(this.state.title);}}>
                        <IconClose style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
            });

        }
        else
        {
            this.setState({
                item: <Text style={[this.state.textStyle, {marginRight: 0, fontSize: this.state.fontSize}]}>{this.state.title}</Text>
            });
        }
    }

    //TODO: FIX BUG WHEN clicking for the first time: doesn't change 'active' variable
    // also, textStyle doesn't change? Should be black text color when active
    toggleActive() {

        if (this.state.toggle === false)
            return;

        this.setState({
            active: this.state.active === true ? false : true
        });

        if (this.state.active === true) {
            this.setState({
                textStyle: styles.textActive,
                startColor: '#ff9e18',
                endColor: '#ffda66'
            });
        }
        else {
            this.setState({
                textStyle: styles.text,
                startColor: '#000000',
                endColor: '#3a3a3a'
            });
        }

        ToastAndroid.showWithGravity(
            'toggled ' + this.state.title + '  now active = ' + this.state.active,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }

    render () {
        return (
            <TouchableOpacity style={styles.keyword} onPress={() => {
                this.state.onPress();
                this.toggleActive();
            }}>
                <LinearGradient style={{borderRadius: 5, padding: 8}} colors={[this.state.startColor, this.state.endColor]} useAngle={true} angle={17} angleCenter={{ x: 0.7, y: 0.7}}>
                    {this.state.item}
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    keyword: {
        //backgroundColor: 'red',
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
