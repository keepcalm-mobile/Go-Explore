import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import CircleGlow from '../../../../../assets/rating/circleGlow.svg';
import StarBlack from '../../../../../assets/rating/starBlack.svg';
import {scale} from '../../../../utils/resize';
import StarFull from '../../../../../assets/rating/starFull.svg';

class Item extends React.Component<Props> {
    static TYPE_RATING : string = 'type_rating';
    static TYPE_AGE : string = 'type_age';

    static propTypes = {
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        type: PropTypes.oneOf([Item.TYPE_RATING, Item.TYPE_AGE]).isRequired,
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

    isActive = () => (this.state.isActive);
    deactivate = () => {
        if (this.state.isActive){
            this.setState({isActive : false});
        }
    };

    activeView = (iValue) => (
        iValue ? <CircleGlow style={s.activeBg}/> : null
    );

    itemIcon = (iValue) => (
        this.props.type === Item.TYPE_RATING ? (iValue ? <StarBlack style={s.starIcon} width={scale(16.5)} height={scale(16.5)}/> : <StarFull style={s.starIcon} width={scale(16.5)} height={scale(16.5)} />) : null
    );

    onPress = () => {
        this.props.onPress(this.props.id);
        this.setState({isActive : !this.state.isActive});
    };

    render() {
        return (
            <TouchableOpacity style={[s.circle, this.state.isActive ? s.circleActive : null]} onPress={this.onPress}>
                {this.activeView(this.state.isActive)}
                <Text style={[s.itemText, this.state.isActive ? s.itemTextActive : null]}>{this.props.value}</Text>
                {this.itemIcon(this.state.isActive)}
            </TouchableOpacity>
        );
    }
}

export default Item;
