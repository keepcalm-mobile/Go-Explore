import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import {colors} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';

class Item extends React.Component<Props> {
    static propTypes = {
        id: PropTypes.number.isRequired,
        value: PropTypes.shape({
            showDay: PropTypes.string.isRequired,
            showdate: PropTypes.string.isRequired,
            passingDate: PropTypes.string.isRequired,
            disabled:PropTypes.bool.isRequired,
        }).isRequired,//PropTypes.objectOf(
        onPress: PropTypes.func.isRequired,
        isActive: PropTypes.bool,
    };

    static defaultProps = {
        isActive : false,
    };

    constructor(props) {
        super(props);

        this.state = {
            isActive: props.isActive,
        };
    }

    get isActive() {
        return this.state.isActive;
    }
    set isActive(iValue) {
        if (iValue !== this.state.isActive){
            this.setState({isActive : iValue});
        }
    }

    deactivate = () => {
        if (this.state.isActive){
            this.setState({isActive : false});
        }
    };

    activeView = (iValue) => (
        iValue ? <LinearGradient
            useAngle={true} angle={90}
            colors={[colors.darkMain, colors.lightMain]}
            style={s.activeBg}
        /> : null
    );

    onPress = () => {
        this.props.onPress(this.props.id);
    };

    render() {
        return (
            <View>
                <Text style={s.itemDayText}>{this.props.value.showDay}</Text>
                <TouchableOpacity style={[s.circle, this.state.isActive ? s.circleActive : null]} onPress={this.onPress} disabled={this.state.isActive || this.props.value.disabled}>
                    {this.activeView(this.state.isActive)}
                    <Text style={[s.itemText, this.state.isActive ? s.itemTextActive : ( this.props.value.disabled ? s.itemTextDisabled : null) ]}>{this.props.value.showdate}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Item;
