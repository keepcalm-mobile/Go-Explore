import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import {colors, indent} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';

class Item extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.shape({
            description: PropTypes.string.isRequired,
            areaCategoryCode: PropTypes.string.isRequired,
            priceInCents:PropTypes.number.isRequired,
            ticketPrice:PropTypes.string.isRequired,
            ticketTypeCode:PropTypes.string.isRequired,
            ticketTypeDescription:PropTypes.string.isRequired,
            isValidforOffer:PropTypes.number.isRequired,
            currency:PropTypes.string.isRequired,
        }).isRequired,//PropTypes.objectOf(
        onPlusPress: PropTypes.func.isRequired,
        onMinusPress: PropTypes.func.isRequired,
    };
    // 'description': 'COOL 2D Discount 10%',
    // 'areaCategoryCode': '0000000003',
    // 'priceInCents': 3308,
    // 'ticketPrice': '33.08',
    // 'ticketTypeCode': '0459',
    // 'ticketTypeDescription': 'Sun-Tue only, Max 1 per movie session',
    // 'isValidforOffer': 0,
    // 'currency': 'QAR',
    static defaultProps = {
    };


    constructor(props) {
        super(props);

        this.state = {
            count: 0,
        };
        this.itemsCount = 0;
    }

    get code() : String { return this.props.data.ticketTypeCode; }
    get price() : Number { return this.props.data.priceInCents; }

    get count():Number { return this.itemsCount; }
    set count(iValue:Number) {
        this.itemsCount = iValue;
        this.setState({count:iValue});
    }

    onPlusPress = () => {
        this.props.onPlusPress(this);
    };

    onMinusPress = () => {
        this.props.onMinusPress(this);
    };

    render() {
        const {description, ticketPrice, currency, priceInCents} = this.props.data;

        return (
            <View style={s.container} >
                <Text style={s.itemTitle}>
                    <Text style={[s.itemText, s.itemBoldText]}>{'TICKET TYPE: '}</Text>
                    <Text style={s.itemText}>{description}</Text>
                </Text>
                <Text style={[s.itemText, s.itemBoldText]}>QTY / PRICE</Text>
                <View style={s.btnsCnt} >
                    <TouchableOpacity style={s.circle} onPress={this.onMinusPress} disabled={this.state.isActive}>
                        <LinearGradient style={s.circleBg} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={108} angleCenter={{ x: 0.7, y: 0.5}}>
                            <Text style={[s.btnsIcon, s.fixMinus]}> - </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={[s.circle, s.amount]}>
                        <LinearGradient style={s.circleBg} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={108} angleCenter={{ x: 0.7, y: 0.5}}>
                            <Text style={[s.itemText, s.amountText]}>{currency + ' ' + (this.state.count * priceInCents) / 100}</Text>
                        </LinearGradient>
                    </View>
                    <TouchableOpacity style={s.circle} onPress={this.onPlusPress} disabled={this.state.isActive}>
                        <LinearGradient style={s.circleBg} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={108} angleCenter={{ x: 0.7, y: 0.5}}>
                            <Text style={s.btnsIcon}> + </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Text style={s.itemText}>{'PER TICKET ' + currency + ' ' + ticketPrice}</Text>
                <View style={s.line} />
            </View>
        );
    }
}

export default Item;
