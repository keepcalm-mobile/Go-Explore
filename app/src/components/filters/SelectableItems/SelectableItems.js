import type {Props} from 'react-native/Libraries/Components/View/View';
import {TextInput, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Item from './Item';

class SelectableItems extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired,
        })).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onItemClick = (iId) => {

    };

    render() {
        const {data} = this.props;

        this.items = [];
        return (
            <View style={s.itemsContainer}>
                {data.map( (item, key) => (
                    <Item key={key + 'Key'} id={key} data={item} onPress={ this.onItemClick } ref={ c => this.items.push(c) } />
                ))}
            </View>
        );
    }
}

export default SelectableItems;