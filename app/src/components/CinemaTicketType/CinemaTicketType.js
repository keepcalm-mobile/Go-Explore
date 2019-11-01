import React from 'react';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {View, Text} from 'react-native';
import s from './style';
import PropTypes from 'prop-types';
import Item from './Item';
import Toast from 'react-native-simple-toast';
import {ButtonOrange} from '../index';

class CinemaTicketType extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onConfirmPress: PropTypes.func.isRequired,
        onLayout: PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
        };
        this.ticketsCount = 0;
        this.selectedTickets = {};
    }

    get tickets():String {
        let items = '';
        for (let prop in this.selectedTickets) {
            if (this.selectedTickets[prop] !== 0) {
                items = items + prop + 'x' + this.selectedTickets[prop] + ',';
            }
        }
        return items;
    }

    onConfirmPress = () => {
        this.props.onConfirmPress(this.tickets);
    };

    onPlusPress = (iItem) => {
        if (this.props.data.maxTickets === this.ticketsCount){
            Toast.showWithGravity("You can't select more than " + this.props.data.maxTickets + " tickets", Toast.SHORT, Toast.CENTER);
        } else {
            this.ticketsCount++;
            iItem.count++;
            this.selectedTickets[iItem.code] = iItem.count;
            this.setState({amount:this.state.amount + iItem.price});
        }
    };

    onMinusPress = (iItem) => {
        if (iItem.count) {
            this.ticketsCount--;
            iItem.count--;
            this.selectedTickets[iItem.code] = iItem.count;
            this.setState({amount:this.state.amount - iItem.price});
        }
    };

    get itemsRender() {
        let items = [];
        const list = this.props.data.ticketlist;
        let idx = 0;
        for (let item of list) {
            items.push( <Item key={idx + 'Key'} data={item} onPlusPress={this.onPlusPress} onMinusPress={this.onMinusPress}/> );
            idx++;
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
                <Text style={s.footerText}>AMOUNT</Text>
                <Text style={[s.footerText, s.footerMargin]}>{'QAR ' + this.state.amount / 100}</Text>
                <ButtonOrange onPress={this.onConfirmPress} title={'COMING SOON (CONFIRM TICKET)'} style={s.confirmBtn}/>
                <Text style={s.warningText}>{'Maximum of ' + this.props.data.maxTickets + ' tickets per transaction'}</Text>
            </View>
        );
    }
}

export default CinemaTicketType;
