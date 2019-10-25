import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {View} from 'react-native';
import s from './style';
import PropTypes from 'prop-types';
import Item from './Item';

class CinemaTime extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired,
        filter: PropTypes.array,
        onLayout: PropTypes.func,
    };

    static defaultProps = {
        filter: [],
    };

    constructor(props) {
        super(props);
        this.state = {filter:props.filter };
        // this.items = [];
    }

    set filter(iValue) {
        this.setState({filter:iValue});
    }

    onItemClick = (iItem) => {
        if (this.curItem){
            this.curItem.deselect();
        }

        this.curItem = iItem;
        this.curItem.select();

        if (this.props.onSelect){
            this.props.onSelect(this.curItem.value);
        }
    };

    get itemsRender() {
        let items = [];
        const filter = this.state.filter;
        let idx = 0;
        // this.props.data.map( (item, key) => {
        for (let key = 0; key < this.props.data.length; key++) {
            let item = this.props.data[key];
            if (!filter.length || filter.indexOf(item.experience) !== -1) {
                items.push( <Item key={item.sessionId + 'Key'} id={key} data={item} style={(idx % 3 !== 2 ? s.separator : null)} onPress={this.onItemClick}/> );
                idx++;
            }
        }
        return items;
    }

    onLayout = (e) => {
        if (this.props.onLayout) {
            this.props.onLayout(e);
        }
    };

    render() {
        return (
            <View style={s.container} onLayout={this.onLayout}>
                {this.itemsRender}
            </View>
        );
    }
}

export default CinemaTime;
