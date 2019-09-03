import {View, TouchableWithoutFeedback, Text} from 'react-native';
import React, {Component} from 'react';
import StarFull from '../../../assets/rating/starFull.svg';
import StarEmpty from '../../../assets/rating/starEmpty.svg';
import s from './style';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating ? this.props.rating : 0,
            max: this.props.max ? this.props.max : 5,
            iconWidth: this.props.iconWidth ? this.props.iconWidth : 36,
            iconHeight: this.props.iconHeight ? this.props.iconHeight : 36,
            iconSelected: this.props.iconSelected ? this.props.iconSelected : StarFull,
            iconUnselected: this.props.iconUnselected ? this.props.iconUnselected : StarEmpty,
            editable: this.props.editable != null ? this.props.editable : true,
        };
    }

    _onRate(rating) {
        this.setState({rating});
        if (this.props.onRate) {
            this.props.onRate(rating);
        }
    }

    _star = (iBool) => {
        return iBool ? <this.state.iconSelected/> : <this.state.iconUnselected/>;
    };

    render() {
        let icons = [];
        for (let i = 1; i <= this.state.max; i++) {
            icons.push(
                <TouchableWithoutFeedback
                    disabled={!this.state.editable}
                    key={i}
                    style={{height:this.state.iconHeight,width:this.state.iconWidth}}
                    onPress={()=>this._onRate(i)}
                >
                    {this._star(this.state.rating >= i)}
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={[this.props.style,{flexDirection:'row'}]}>
                <Text style={s.ratingValue}>{this.state.rating.toFixed(1).toString()}</Text>
                {icons}
            </View>
        );
    }
}

export default Rating;
