import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {View} from 'react-native';
import s from './style';
import PropTypes from 'prop-types';
import Item from './Item';

class CinemaDate extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            showDay: PropTypes.string.isRequired,
            showdate: PropTypes.string.isRequired,
            showMonth: PropTypes.string.isRequired,
            passingDate: PropTypes.string.isRequired,
        })).isRequired,
        onSelect: PropTypes.func,
        presets: PropTypes.string,
    };

    static defaultProps = {
        presets: '',
    };

    constructor(props) {
        super(props);

        let data = [];
        for (let item of props.data) {
            const showdate = data.length ? item.showdate : item.passingDate.split('-')[0];
            const passingDate = item.passingDate;
            const showDay = data.length ? item.showDay : item.showdate;
            data.push({showdate,passingDate,showDay,disabled:false});
        }

        this.state = {
            data:data,
        };
        this.curActive = this.props.data.indexOf(props.presets);

        this.items = [];
    }

    componentWillUnmount(): void {
        while (this.items.length !== 0){
            this.items.shift();
        }
        this.items = null;
    }

    get value() {
        return this.curActive !== -1 ? this.state.data[this.curActive].passingDate : '';
    }

    get chosen(){
        return this.curActive;
    }

    set chosen(iValue) {
        if (this.curActive !== -1) {
            this.items[this.curActive].isActive = false;
        }

        this.curActive = iValue;

        if (this.items[this.curActive]) {
            this.items[this.curActive].isActive = true;
        }
    }

    update = (iData) => {
        let cur = this.state.data.slice();
        let minCanBeActive = -1;
        let curActiveIsDisabled = this.curActive === -1;

        if (iData) {
            for (let i = 0; i < iData.length; i++) {
                cur[i].disabled = !iData[i].items.length;

                if (minCanBeActive === -1 && !cur[i].disabled) minCanBeActive = i;
                if (this.curActive === i && cur[i].disabled) curActiveIsDisabled = true;
            }
        } else {
            curActiveIsDisabled = true;
            cur.forEach(iItem => iItem.disabled = false);
        }

        this.setState({data:cur});
        if (curActiveIsDisabled) this.chosen = minCanBeActive;
    };

    onItemClick = (iId) => {
        if(this.props.onSelect) {
            this.props.onSelect(iId);
        }
    };

    onItemRef = (c) => {
        if (c && this.items) {this.items.push(c);}
    };

    render() {
        const {data} = this.state;

        return (
            <View style={s.container}>
                {data.map( (item, key) => (
                    <Item key={key} id={key} value={item} onPress={this.onItemClick} isActive={this.curActive === key} ref={ this.onItemRef }/>
                    ) )}
            </View>
        );
    }
}

export default CinemaDate;
