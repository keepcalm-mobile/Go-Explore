import type {Props} from 'react-native/Libraries/Components/View/View';
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s, {markerSize} from './style';
import {colors, indent, windowW, fontSizes, fontNames, doubleIndent} from '../../../styles';
import MultiSlider from 'react-native-range';
import LinearGradient from 'react-native-linear-gradient';

class RangeSlider extends React.Component<Props> {
    static propTypes = {
        type: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        presets: PropTypes.array,
    };

    static defaultProps = {
        // setMin : 0,
        // setMax : 100,
        data: [0,100],
        presets:[-1,100000],
    };

    constructor(props) {
        super(props);
        this.state = {
            valueMin:props.data[0],
            valueMax:props.data[1],
            setMin: props.presets ? (props.presets[0] >= props.data[0] ? props.presets[0] : props.data[0]) : props.data[0],
            setMax: props.presets ? (props.presets[1] <= props.data[1] ? props.presets[1] : props.data[1]) : props.data[1],
        };
        console.log('<><><><><><><><><> : ' + props.type);
    }

    get value() {
        return {[this.props.type]:[this.state.setMin, this.state.setMax]};
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    onValueChange = (values) => {
        this.setState({ setMin: values[0], setMax: values[1] });
    };

    customMarker = (e) => (
        <LinearGradient
            useAngle={true} angle={90}
            currentValue={e.currentValue}
            colors={[colors.lightMain, colors.darkMain]}
            style={s.markerBorder}
        >
            <LinearGradient
                useAngle={true} angle={90}
                colors={[colors.darkMain, colors.lightMain]}
                style={s.marker}
            />
        </LinearGradient>
    );

    render() {
        const {setMin, setMax, valueMin, valueMax} = this.state;
        const left = ( ((setMin - valueMin) / (valueMax - valueMin) * 100).toString() + '%');
        const right = ( ((1 - (setMax - valueMin) / (valueMax - valueMin)) * 100).toString() + '%');

        return (
            <View style={s.container}>
                <MultiSlider
                    values={[setMin, setMax]}
                    min={valueMin}
                    max={valueMax}
                    step={1}
                    onValuesChangeStart={this.disableScroll}
                    onValuesChangeFinish={this.enableScroll}
                    trackStyle={s.trackStyle}
                    selectedStyle={s.selectedStyle}
                    containerStyle={s.sliderCntStyle}
                    sliderLength={windowW - doubleIndent * 2 - markerSize}

                    onValuesChange={this.onValueChange}
                    customMarker={this.customMarker}
                />

                <View style={s.labelCnt}>
                    <Text style={[s.labelTxt, s.labelTxtLeft, { left: left }]}> QAR{setMin} </Text>
                    <Text style={[s.labelTxt, s.labelTxtRight, { right: right }]}>QAR{setMax}</Text>
                </View>
            </View>
        );
    }
}

export default RangeSlider;

