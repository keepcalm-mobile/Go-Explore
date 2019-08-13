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
            active: PropTypes.bool.isRequired,
        })).isRequired,
        onItemPress: PropTypes.func.isRequired,
        onStatusChange: PropTypes.func,
        itemTextColor: PropTypes.string,
        itemChosenTextColor: PropTypes.string,
        separatorColor: PropTypes.string,
    };

    static defaultProps = {
        itemTextColor: colors.white,
        itemChosenTextColor: colors.secondaryText,
        separatorColor: colors.lightSecondary,
    };

    constructor(props){
        super(props);

        this.state = {
            visible: false,
            data: props.data.slice(),
            x:0,
            y:0,
            width:0,
            height:0,
        };
    }

    // componentDidMount() {
    //     this._onItemPress(this.state.selectedId);
    // }

    // componentDidUpdate(prevProps, nextState) {
    //     nextState.visible !== this.state.visible && this._animatePicker();
    // }

    _onItemPress = iId => {
        this.props.onItemPress(iId);
        this._closePicker();
    };

    setItems = (iData) => {
        this.setState({data: iData});
    };

    openPicker = (iX, iY, iWidth, iHeight) => {
        this.state.visible ? this._closePicker() : this.setState({x:iX, y:iY, width:iWidth, height: iHeight, visible: true });
        this.props.onStatusChange(true);
    };

    _closePicker = () => {
        this.state.visible && this.setState({ visible: false });
        this.props.onStatusChange(false);
    };

    _renderItem = ({item, index}) => (
        <>
            <Text onPress={_ => { this._onItemPress(index); }} style={[s.textItem, {color: this.state.data[index].active ? this.props.itemChosenTextColor : this.props.itemTextColor}]}>{item.label}</Text>
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