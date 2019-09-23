import type {Props} from 'react-native/Libraries/Components/View/View';
import {TextInput, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Item from './Item';

class SelectableItems extends React.Component<Props> {
    static propTypes = {
        type: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        presets: PropTypes.array,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        presets: [],
    };

    constructor(props) {
        super(props);
        this.state = { };
        this.items = [];
    }

    componentWillUnmount(): void {
        while (this.items.length !== 0){
            this.items.shift();
        }
        this.items = null;
    }

    get value() {
        let items = [];
        this.items.forEach((item, index, array) => {
            if (item.isActive) items.push(item.label);
        });

        return {[this.props.type]:items};
    }

    onItemClick = (iId) => {
        if (this.props.onChange){
            this.props.onChange(this.value);
        }
    };

    onItemRef = iItem => {
        if (iItem && this.items) {this.items.push(iItem);}
    };

    render() {
        const {data, presets} = this.props;

        return (
            <View style={s.itemsContainer}>
                {data.map( (item, key) => (
                    <Item key={key + 'Key'} id={key} data={{label:item, active: presets && presets.indexOf(item) !== -1 ? true : false }} onPress={ this.onItemClick } ref={ this.onItemRef } />
                ))}
            </View>
        );
    }
}

export default SelectableItems;
