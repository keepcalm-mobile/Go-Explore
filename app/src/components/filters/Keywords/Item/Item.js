import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../styles';
import IconClose from '../../../../../assets/serviceIcons/closeIcon.svg';
import {scale} from '../../../../utils/resize';

class Item extends React.Component<Props> {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {title, id, onPress} = this.props;
        return (
            <LinearGradient style={s.cntBorder} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={158} angleCenter={{ x: 0.5, y: 0.5}}>
                <LinearGradient style={s.container} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={8} angleCenter={{ x: 0.7, y: 0.5}}>
                    <Text style={s.title}>{title}</Text>
                    <TouchableOpacity style={s.touchableArea} onPress={ () => {onPress(id);} }>
                        <IconClose style={s.closeIcon} width={scale(10)} height={scale(10)}/>
                    </TouchableOpacity>
                </LinearGradient>
            </LinearGradient>
        );
    }
}

export default Item;
