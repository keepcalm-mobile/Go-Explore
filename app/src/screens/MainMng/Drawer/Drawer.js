import React from 'react';
import {TouchableOpacity, View, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from '../../../utils/resize';
import IconClose from '../../../../assets/topIcons/closeIcon.svg';
import IconBack from '../../../../assets/topIcons/backIcon.svg';
import {colors, doubleIndent, indent, startY, windowH, windowW} from '../../../styles';
import s from './style';
import {screens} from "../../../constants";

const iconSize = scale(22);

const icon = (Icon) => {
    if (Icon) {
        return (<Icon style={{marginRight:scale(8), marginTop: scale(8)}}/>);
    } else {
        return null;
    }
};

const button = (iTitle, iPress, iId, Icon = null) => {
    return (
        <TouchableOpacity onPress = {() => iPress(iId)} activeOpacity={0.5} style={{flexDirection:'row', width: '100%', height: scale(40), marginTop: scale(Icon?50:10), marginLeft: indent, marginRight: indent}}>
            {icon(Icon)}
            <Text style={s.textBtn}>
                {iTitle}
            </Text>
        </TouchableOpacity>
    );
};

class Drawer extends React.Component<Props> {
    static propTypes = {
        onButtonPress: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.Value(1),
            subMenuWidth: 20,
            pointerEvents: 'auto',
            showSubMenu: true,
        };
    }

    show = () => {

    };

    hide = () => {

    };

    _onBackClick = () => {
        Animated.spring(this.state.pan, {
            toValue: 0,
            friction: 9,
            useNativeDriver: true,
        }).start( () => {this.setState({showSubMenu:false})});
        this.setState({pointerEvents:'auto'});
    };

    _onBtnClick = (iId) => {
        if (iId === screens.DataPages){

            Animated.spring(this.state.pan, {
                toValue: this.state.subMenuWidth,
                friction: 9,
                useNativeDriver: true,
            }).start();
            this.setState({showSubMenu:true, pointerEvents:'none'});
        } else {
            this.props.onButtonPress(iId);
        }
    };


    _getSubMenuWidth = (event) => {
        if(event.nativeEvent.layout.width > this.state.subMenuWidth) {
            this.setState({subMenuWidth: event.nativeEvent.layout.width});
        }
    };

    _subMenuArea = () => {
        const animStyle = {translateX: this.state.pan};

        if (this.state.showSubMenu) {
            return (
                <Animated.View style={[animStyle, s.subMenu, {marginLeft:-this.state.subMenuWidth}]} onLayout={this._getSubMenuWidth}>
                    <TouchableOpacity onPress = {this._onBackClick} activeOpacity={0.5} style={[s.closeBtn, {width: iconSize + doubleIndent, height: iconSize + doubleIndent}]}>
                        <IconBack width={iconSize}/>
                    </TouchableOpacity>

                    <Text style={[s.textBtn, {color: colors.titleMenu, marginRight: indent, marginLeft: indent}]}>{screens.Drawer[screens.DataPages].title}</Text>

                    {button(screens.Sections[screens.HotPicks].title, this._onBtnClick, screens.HotPicks)}
                    {button(screens.Sections[screens.Cinema].title, this._onBtnClick, screens.Cinema)}
                    {button(screens.Sections[screens.Attraction].title, this._onBtnClick, screens.Attraction)}
                    {button(screens.Sections[screens.Travel].title, this._onBtnClick, screens.Travel)}
                    {button(screens.Sections[screens.Shopping].title, this._onBtnClick, screens.Shopping)}
                    {button(screens.Sections[screens.Dining].title, this._onBtnClick, screens.Dining)}
                    {button(screens.Sections[screens.HealthBeauty].title, this._onBtnClick, screens.HealthBeauty)}
                </Animated.View>);
        } else {
            return null;
        }
    };



    render() {
        const { onButtonPress, close } = this.props;

        return (
            <View style={s.container}>
                <View pointerEvents={this.state.pointerEvents}>
                    <TouchableOpacity onPress = {close} activeOpacity={0.5} style={[s.closeBtn, {width: iconSize + doubleIndent, height: iconSize + doubleIndent}]}>
                        <IconClose width={iconSize}/>
                    </TouchableOpacity>

                    {button(screens.Drawer[screens.HotPicks].title, this._onBtnClick, screens.HotPicks)}
                    {button(screens.Drawer[screens.UserProfile].title, this._onBtnClick, screens.UserProfile)}
                    {button(screens.Drawer[screens.Notifications].title, this._onBtnClick, screens.Notifications)}
                    {button(screens.Drawer[screens.Calendar].title, this._onBtnClick, screens.Calendar)}
                    {button(screens.Drawer[screens.VirtualReality].title, this._onBtnClick, screens.VirtualReality)}
                    {button(screens.Drawer[screens.Bookmarks].title, this._onBtnClick, screens.Bookmarks)}
                    {button(screens.Drawer[screens.DataPages].title, this._onBtnClick, screens.DataPages)}
                    {button(screens.Drawer[screens.Settings].title, this._onBtnClick, screens.Settings, screens.Drawer[screens.Settings].icon)}
                </View>
                {this._subMenuArea()}
            </View>
        );
    }
}

export default Drawer;
