import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../styles';

class Item extends React.Component<Props> {
    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.shape({
                label: PropTypes.string.isRequired,
                active: PropTypes.bool.isRequired,
            }).isRequired,
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.view = props.data.active ? this.viewActive : this.viewCommon;

        this.state = {
            isActive : props.data.active,
        };
    }

    isActive = () => (this.state.isActive);
    deactivate = () => {
        if (this.state.isActive){
            this.setActivate(false);
        }
    };

    onItemPress = () => {
        this.props.onPress(this.props.id);
        this.setActivate(!this.state.isActive);
        this.setState({isActive : !this.state.isActive});
    };

    setActivate = (iValue) => {
        this.view = iValue ? this.viewActive : this.viewCommon;
        this.setState({isActive : iValue});
    };

    viewCommon = (iLabel) => (
        <LinearGradient style={s.cntBorder} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={158} angleCenter={{ x: 0.5, y: 0.5}}>
            <LinearGradient style={s.container} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={8} angleCenter={{ x: 0.7, y: 0.5}}>
                <Text style={s.title}>{iLabel}</Text>
            </LinearGradient>
        </LinearGradient>
    );

    viewActive = (iLabel) => (
        <LinearGradient style={s.containerActive} colors={[colors.darkMain, colors.lightMain]} useAngle={true} angle={8} angleCenter={{ x: 0.7, y: 0.5}}>
            <Text style={[s.title, s.titleActive]}>{iLabel}</Text>
        </LinearGradient>
    );


    render() {
        const {label} = this.props.data;

        return (
            <TouchableOpacity style={s.touchableArea} onPress={ this.onItemPress }>
                {this.view(label)}
            </TouchableOpacity>
        );
    }
}

export default Item;
