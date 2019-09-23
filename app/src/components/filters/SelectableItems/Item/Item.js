import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../../styles';

class Item extends React.Component<Props> {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
        data: PropTypes.shape({
                label: PropTypes.string.isRequired,
                active: PropTypes.bool.isRequired,
            }).isRequired,
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.view = props.data.active ? this.viewActive : this.viewCommon;
        this.state = {
            isActive : props.data.active,
        };
    }

    set isActive(iValue){
        if (this.state.isActive !== iValue){
            this._setActivate(iValue);
        }
    }
    get isActive() { return this.view === this.viewActive; } /** FASTER THEN AFTER "setState" (this.state.isActive) **/
    get label() { return this.props.data.label; }

    onItemPress = () => {
        this._setActivate(!this.state.isActive);
        this.props.onPress(this.props.id);
    };

    _setActivate = (iValue) => {
        this.view = iValue ? this.viewActive : this.viewCommon;
        this.setState({isActive : iValue});
    };

    viewCommon = (iLabel) => (
        <LinearGradient style={s.cntBorder} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={158} angleCenter={{ x: 0.5, y: 0.5}}>
            <LinearGradient style={s.container} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={8} angleCenter={{ x: 0.7, y: 0.5}}>
                <Text style={s.title}>{iLabel}</Text>
            </LinearGradient>
        </LinearGradient>
    );

    viewActive = (iLabel) => (
        <LinearGradient style={s.containerActive} colors={[colors.darkMain, colors.lightMain]} useAngle={true} angle={8} angleCenter={{ x: 0.7, y: 0.5}}>
            <Text style={[s.title, s.titleActive]}>{iLabel}</Text>
        </LinearGradient>
    );


    render() {
        const {label} = this.props.data;

        return (
            <TouchableOpacity style={[s.touchableArea, this.props.style]} onPress={ this.onItemPress } disabled={this.state.isActive && this.props.id === -1}>
                {this.view(label)}
            </TouchableOpacity>
        );
    }
}

export default Item;
