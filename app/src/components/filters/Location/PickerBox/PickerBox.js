import type {Props} from 'react-native/Libraries/Components/View/View';
import React from 'react';
import {Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import s, {width, height} from './style';
import {colors} from '../../../../styles';

class PickerBox extends React.Component<Props> {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
        })).isRequired,
        onValueChange: PropTypes.func.isRequired,
        onStatusChange: PropTypes.func,
        selectedId: PropTypes.number,
        itemTextColor: PropTypes.string,
        itemChosenTextColor: PropTypes.string,
        separatorColor: PropTypes.string,
    };

    static defaultProps = {
        selectedId: undefined,
        itemTextColor: colors.white,
        itemChosenTextColor: colors.secondaryText,
        separatorColor: colors.lightSecondary,
    };

    constructor(props){
        super(props);

        this.state = {
            visible: false,
            data: [...props.data],
            x:0,
            y:0,
            width:0,
            height:0,
            selectedId: props.selectedId,
        };
    }

    componentDidMount() {
        this._onValueChange(this.state.selectedId);
    }

    // componentDidUpdate(prevProps, nextState) {
    //     nextState.visible !== this.state.visible && this._animatePicker();
    // }

    _onValueChange = iId => {
        let newId = iId === this.state.selectedId ? PickerBox.defaultProps.selectedId : iId;

        this.setState({selectedId: newId});
        this.props.onValueChange(newId);

        this._closePicker();
    };

    openPicker = (iX, iY, iWidth, iHeight) => {
        this.state.visible ? this._closePicker() : this.setState({x:iX, y:iY, width:iWidth, height: iHeight, visible: true });
        this.props.onStatusChange(true);
    };

    _closePicker = () => {
        this.state.visible && this.setState({ visible: false });
        this.props.onStatusChange(false);
    };

    // _animatePicker = () => {
    //     const initialValue    = this.state.visible ? -this.height : 0,
    //         finalValue      = this.state.visible ? 0 : -this.height;
    //
    //     this.state.verticalPos.setValue(initialValue);
    //
    //     Animated.spring(this.state.verticalPos, {
    //         toValue: finalValue,
    //         friction: Platform.OS === 'ios' ? 9 : 8,
    //     }).start();
    // };

    _renderItem = ({item, index}) => (
        <>
            <Text onPress={_ => { this._onValueChange(index); }} style={[s.textItem, {lineHeight:this.state.height, color: this.state.selectedId === index ? this.props.itemChosenTextColor : this.props.itemTextColor}]}>{item.label}</Text>
            {index !== this.state.data.length - 1 && <View style={[s.separator, {backgroundColor: this.props.separatorColor}]} />}
        </>
    );

    render() {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.visible} onRequestClose={this._closePicker}>
                <TouchableOpacity style={s.bgArea} onPress={this._closePicker} activeOpacity={1}/>

                <FlatList
                    bounces={false}
                    style={[s.flat, {width:this.state.width, marginTop:this.state.y + this.state.height - 10, marginLeft:this.state.x, maxHeight:this.state.height * 3}]}
                    contentContainerStyle={s.contentFlat}
                    data={this.state.data}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={this._renderItem}
                />
            </Modal>
        );
    }
}

export default PickerBox;