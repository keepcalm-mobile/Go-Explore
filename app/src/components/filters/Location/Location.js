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
        type: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,
        presets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        placeholder : PropTypes.string,
    };

    static defaultProps = {
        presets : undefined,
        placeholder : 'Press to select location',
    };

    constructor(props) {
        super(props);

        let id;
        props.data.forEach((item, index, array) => {
            if (item.value === props.presets) id = index;
        });

        this.state = {
            isOpen: false,
            selectedId: id,
            title: id !== undefined ? props.data[id].label : props.placeholder,
            titleColor: id !== undefined ? colors.white : colors.secondaryText,
        };
        console.log('<><><><><><><><><> : ' + props.type);
    }

    get value() {
        return {[this.props.type]: this.state.selectedId !== undefined ? this.props.data[this.state.selectedId].value : ''};
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

        this.setState({ selectedId: iValue, title: title, titleColor: color });
    };

    render() {
        const {data} = this.props;
        const {title, titleColor, selectedId, isOpen} = this.state;

        return (
            <TouchableOpacity ref={ref => this.dropDown = ref} style={s.pickerContainer} onPress={this.openPicker} activeOpacity={1}>
                <Text style={[s.pickerTitle, {color: titleColor}]} >{ title }</Text>
                <DropdownArrow style={[s.pickerArrow, {transform:[{rotate: isOpen ? '180deg' : '0deg'}] }]}/>
                <PickerBox
                    ref={ref => this.myref = ref}
                    data={ data }
                    onValueChange={this.onValueChange}
                    onStatusChange={value => this.setState({ isOpen: value })}
                    selectedValue={ selectedId }
                />
            </TouchableOpacity>
        );
    }
}

export default Location;
// {/*<LinearGradient ref={ref => this.dropDown = ref} style={s.locationPickerContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.6}}>*/}
//</LinearGradient>