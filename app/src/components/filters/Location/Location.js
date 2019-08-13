import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import PickerBox from './PickerBox';
import s from './style';
import {colors} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import DropdownArrow from '../../../../assets/serviceIcons/dropdownArrow.svg';

class Location extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,
        selectedId : PropTypes.number,
        placeholder : PropTypes.string,
    };

    static defaultProps = {
        selectedId : undefined,
        placeholder : 'Press to select location',
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedId: props.selectedId,
            title: props.selectedId !== undefined ? props.data[props.selectedId].label : props.placeholder,
            titleColor: props.selectedId !== undefined ? colors.white : colors.secondaryText,
        };
    }

    openPicker = () => {
        this.dropDown.measure( (fx, fy, width, height, px, py) => {
            this.myref.openPicker(px, py, width, height);
        });
    };

    onValueChange = (iValue) => {
        let color = colors.secondaryText;
        let title = this.props.placeholder;

        if (iValue !== undefined) {
            color = colors.white;
            title = this.props.data[iValue].label;
        }

        this.setState({ selectedValue: iValue, title: title, titleColor: color });
    };

    render() {
        const {data} = this.props;
        const {title, titleColor} = this.state;

        return (
            <TouchableOpacity ref={ref => this.dropDown = ref} style={s.pickerContainer} onPress={this.openPicker} activeOpacity={1}>
                <Text style={[s.pickerTitle, {color: titleColor}]} >{ title }</Text>
                <DropdownArrow style={[s.pickerArrow, {transform:[{rotate: this.state.isOpen ? '180deg' : '0deg'}] }]}/>
                <PickerBox
                    ref={ref => this.myref = ref}
                    data={ data }
                    onValueChange={this.onValueChange}
                    onStatusChange={value => this.setState({ isOpen: value })}
                    selectedValue={ this.state.selectedId }
                />
            </TouchableOpacity>
        );
    }
}

export default Location;
// {/*<LinearGradient ref={ref => this.dropDown = ref} style={s.locationPickerContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.6}}>*/}
//</LinearGradient>