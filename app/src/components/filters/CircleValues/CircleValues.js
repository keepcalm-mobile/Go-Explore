import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {View} from 'react-native';
import s from './style';
import PropTypes from 'prop-types';
import Item from './Item';

const VALUES_RATING = ['1', '2', '3', '4', '5'];
const VALUES_AGE = ['+0', '+6', '+12', '+16', '+18'];

class CircleValues extends React.Component<Props> {
    static propTypes = {
        type: PropTypes.oneOf([Item.TYPE_RATING, Item.TYPE_AGE]),
        presets: PropTypes.string,
    };

    static defaultProps = {
        type: Item.TYPE_RATING,
        presets: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            values: props.type === Item.TYPE_RATING ? VALUES_RATING : VALUES_AGE,
        };
        this.curActive = this.state.values.indexOf(props.presets);
    }

    get value() {
        return {[this.props.type] : this.state.values[this.curActive]};
    }

    onItemClick = (iId) => {
        if (this.curActive !== -1) {
            this.items[this.curActive].deactivate();
        }
        this.curActive = iId === this.curActive ? -1 : iId;
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
