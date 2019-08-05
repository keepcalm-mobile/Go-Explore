import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Picker, Text, TextInput, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import {colors} from "../../../styles";
import LinearGradient from "react-native-linear-gradient";

class Location extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            location: 'Mall of Qatar - Doha',
        };
    }

    render() {
        // const {image, text} = this.props.data;
        return (

                <Picker
                    selectedValue={this.state.location}
                    style={s.locationPicker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({location: itemValue})
                    }>
                    <Picker.Item label="Mall of Qatar - Doha" value="place0" />
                    <Picker.Item label="Another Place 1" value="place1" />
                    <Picker.Item label="Another Place 2" value="place2" />
                </Picker>

        );
    }
}

export default Location;
//<LinearGradient style={s.locationPickerContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.6}}>
//</LinearGradient>
