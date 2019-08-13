import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {View} from 'react-native';
import s from './style';
// import circleGlow from '../../../../assets/rating/circleGlow.png';
import PropTypes from 'prop-types';
import Item from './Item';

const VALUES_RATING = ['1', '2', '3', '4', '5'];
const VALUES_AGE = ['+0', '+6', '+12', '+16', '+18'];

class CircleValues extends React.Component<Props> {
    static propTypes = {
        type: PropTypes.oneOf([Item.TYPE_RATING, Item.TYPE_AGE]),
        active: PropTypes.string,
    };

    static defaultProps = {
        type : Item.TYPE_RATING,
        active : '',
    };

    constructor(props) {
        super(props);

        this.state = {
            values: props.type === Item.TYPE_RATING ? VALUES_RATING : VALUES_AGE,
        };

        if (props.active !== '') {
            this.curActive = this.state.values.indexOf(props.active);
        }
    }

    onItemClick = (iId) => {
        if (this.curActive !== undefined) {
            this.items[this.curActive].deactivate();
        }
        this.curActive = iId === this.curActive ? undefined : iId;
    };


    render() {
        const {values} = this.state;
        this.items = [];

        return (
            <View style={s.container}>
                {values.map( (item, key) => (
                    <Item key={key} id={key} value={item} type={this.props.type} onPress={this.onItemClick} isActive={this.curActive === key} ref={ c => this.items.push(c) }/>
                    ) )}
            </View>
        );
    }
}

export default CircleValues;
