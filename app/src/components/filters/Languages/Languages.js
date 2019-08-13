import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import PickerBox from './PickerBox';
import s from './style';
import {colors} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import DropdownArrow from '../../../../assets/serviceIcons/dropdownArrow.svg';
import Item from '../Keywords/Item';

class Languages extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
        })).isRequired,
        placeholder : PropTypes.string,
        placeholderColor : PropTypes.string,
    };

    static defaultProps = {
        placeholder : 'Press to select languages',
        placeholderColor : colors.secondaryText,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            data: props.data.slice(),
        };
    }

    openPicker = () => {
        this.dropDown.measure( (fx, fy, width, height, px, py) => {
            this.pickerBox.openPicker(px, py, width, height);
        });
    };

    itemsView = () => {
        let items = [];

        this.state.data.forEach((item, index, array) => {
            if (item.active) {
                items.push(<Item key={item.label + 'Key'} id={index} title={item.label} onPress={this.onItemPress}/>);
            }
        });

        if (items.length) {
            return (
                <View style={s.itemsContainer}>
                    {items}
                </View>
            );
        } else {
            return <Text style={[s.pickerTitle, {color: this.props.placeholderColor}]} >{ this.props.placeholder }</Text>;
        }

        // data.map( (item, key) => (
        //     <Item key={key + 'Key'} id={key} data={item} onPress={ this.onItemClick } ref={ c => this.items.push(c) } />
        // ))
    };


    onItemPress = (iId) => {
        let data = this.props.data.slice();
        data[iId].active = !data[iId].active;

        this.setState({ data: data });
        this.pickerBox.setItems(data);
    };

    onStatusChange = (iValue) => {
        this.setState({ isOpen: iValue });
    };

    render() {
        const {data} = this.props;
        const {title, titleColor} = this.state;

        return (
            <TouchableOpacity ref={ref => this.dropDown = ref} style={s.pickerContainer} onPress={this.openPicker} activeOpacity={1}>
                {this.itemsView()}
                <DropdownArrow style={[s.pickerArrow, {transform:[{rotate: this.state.isOpen ? '180deg' : '0deg'}] }]}/>
                <PickerBox
                    ref={ref => this.pickerBox = ref}
                    data={ data }
                    onItemPress={this.onItemPress}
                    onStatusChange={this.onStatusChange}
                    selectedValue={ this.state.selectedId }
                />
            </TouchableOpacity>
        );
    }
}

export default Languages;
// {/*<LinearGradient ref={ref => this.dropDown = ref} style={s.locationPickerContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.6}}>*/}
//</LinearGradient>