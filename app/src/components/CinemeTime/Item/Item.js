import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import {colors, indent} from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';

class Item extends React.Component<Props> {
    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.shape({
            cinemaId: PropTypes.string.isRequired,
            movieId: PropTypes.string.isRequired,
            showtime:PropTypes.string.isRequired,
            sessionId:PropTypes.string.isRequired,
            experience:PropTypes.string.isRequired,
            isSeatAvailable:PropTypes.number.isRequired,
        }).isRequired,//PropTypes.objectOf(
        onPress: PropTypes.func.isRequired,
    };
// {
//     'cinemaId': '0033',
//     'movieId': 'HO00005029',
//     'sessionDateTime': '2019-09-13T00:40:00',
//     'showdate': '13-09-2019',
//     'showtime': '12:40 AM',
//     'seatAvailable': '43',
//     'sessionId': '17892',
//     'screenName': 'SCREEN 7 STAR',
//     'language': 'English',
//     'experience': '7 STAR 2D',
//     'isSeatAvailable': 1,
// },
    static defaultProps = {
    };

    get value() {
        return this.props.data;
    }

    constructor(props) {
        super(props);

        this.state = {
            isActive: props.isActive,
        };
    }

    deselect = () => {
        if (this.state.isActive){
            this.setState({isActive : false});
        }
    };

    select = () => {
        if (!this.state.isActive){
            this.setState({isActive : true});
        }
    };

    activeView = (iValue) => (
        iValue ? <LinearGradient
            useAngle={true} angle={90}
            colors={[colors.darkMain, colors.lightMain]}
            style={s.activeBg}
        /> : null
    );

    onPress = () => {
        this.props.onPress(this);
    };

    render() {
        const {showtime, experience, isSeatAvailable} = this.props.data;
        let styleItem, styleTxtSt, styleLineSt;
        if (this.state.isActive) {
            styleItem = s.itemActive;
            styleTxtSt = s.itemTextActive;
            styleLineSt = s.itemLineActive;
        } else if (!isSeatAvailable) {
            styleItem = s.itemDisabled;
            styleTxtSt = s.itemTextDisabled;
            styleLineSt = s.itemLineDisabled;
        }

        return (
            <TouchableOpacity style={[s.item, styleItem, this.props.style]} onPress={this.onPress} disabled={this.state.isActive || !isSeatAvailable}>
                {this.activeView(this.state.isActive)}
                <Text style={[s.itemText, styleTxtSt]}>{experience}</Text>
                <View style={[s.line, styleLineSt]} />
                <Text style={[s.itemText, styleTxtSt]}>{showtime}</Text>
            </TouchableOpacity>
        );
    }
}

export default Item;
