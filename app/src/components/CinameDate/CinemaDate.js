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
        onChoice: PropTypes.func,
        presets: PropTypes.string,
    };

    static defaultProps = {
        onChoice:() => {},
        presets: '',
    };

    constructor(props) {
        super(props);

        let data = [];
        for (let i = 0; i < 7; i++){
            const showdate = i === 0 ? props.data[i].passingDate.split('-')[0] : props.data[i].showdate;
            const passingDate = props.data[i].passingDate;
            const showDay = i === 0 ? props.data[i].showdate : props.data[i].showDay;
            data.push({showdate,passingDate,showDay});
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

    onItemClick = (iId) => {
        //this.state.data[iId].passingDate
        this.props.onChoice(iId);
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
