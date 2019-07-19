import React from 'react';
import {TouchableOpacity, View, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from '../../../utils/resize';
import IconClose from '../../../../assets/topIcons/closeIcon.svg';
import IconBack from '../../../../assets/topIcons/backIcon.svg';
import {colors, doubleIndent, indent, startY, windowH, windowW} from '../../../styles';
import s from './style';
import {screens} from '../../../constants';

const iconSize = scale(22);

const icon = (Icon) => {
    if (Icon) {
        return (<Icon style={{marginRight:scale(8), marginTop: scale(8)}}/>);
    } else {
        return null;
    }
};

const button = (iTitle, iPress, iId, iCur, Icon = null) => {
    let _disabled = iCur===iId ? true : false;
    return (
        <TouchableOpacity onPress = {() => iPress(iId)} activeOpacity={0.5} disabled={_disabled} style={{flexDirection:'row', width: '100%', height: scale(40), marginTop: scale(Icon?50:10), marginLeft: indent, marginRight: indent}}>
            {icon(Icon)}
            <Text style={[s.textBtn, {color: _disabled ? colors.darkMain : colors.white}]}>
                {iTitle}
            </Text>
        </TouchableOpacity>
    );
};

class Drawer extends React.Component<Props> {
    static propTypes = {
        onChoiceCategory: PropTypes.func.isRequired,
        onChoiceSection: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.Value(1),
            subMenuWidth: 20,
            pointerEvents: 'auto',
            showSubMenu: true,
            parentPage:screens.DataPages,
            curPage:screens.HotPicks,
        };
    }

    show = () => {
        this.setState({pointerEvents:'auto'});
    };

    hide = () => {
        this.setState({pointerEvents:'none'});
        this._onBackClick();
    };

    setCurPage = (iId) => {
        if (screens.Sections[iId]){
            this.setState({parentPage:screens.DataPages, curPage:iId});
        } else {
            this.setState({parentPage:iId, curPage:''});
        }
    };

    _onBackClick = () => {
        if (this.state.showSubMenu){
            Animated.spring(this.state.pan, {
                toValue: 0,
                friction: 9,
                useNativeDriver: true,
            }).start( () => {this.setState({showSubMenu:false})});
            this.setState({pointerEvents:'auto'});
        }
    };

    _onCategoryClick = (iId) => {
        if (iId === screens.SubMenu){
            Animated.spring(this.state.pan, {
                toValue: this.state.subMenuWidth,
                friction: 9,
                useNativeDriver: true,
            }).start();
            this.setState({showSubMenu:true, pointerEvents:'none'});
        } else {
            this.props.onChoiceCategory(iId);
        }
    };

    _onSectionClick = (iId) => {
        this.props.onChoiceSection(iId);
    };


    _getSubMenuWidth = (event) => {
        if (event.nativeEvent.layout.width > this.state.subMenuWidth) {
            this.setState({subMenuWidth: event.nativeEvent.layout.width});
        }

    };

    _subMenuArea = () => {
        const rotate = '0deg';
        const scale = 1;
        const translateX = this.state.pan;
        const translateY = 0;

        const animStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

        if (this.state.showSubMenu) {
            return (
                <Animated.View style={[animStyle, s.subMenu, {marginLeft:-(this.state.subMenuWidth)}]} onLayout={this._getSubMenuWidth}>
                    <TouchableOpacity onPress = {this._onBackClick} activeOpacity={0.5} style={[s.closeBtn, {width: iconSize + doubleIndent, height: iconSize + doubleIndent}]}>
                        <IconBack width={iconSize}/>
                    </TouchableOpacity>

                    <Text style={[s.textBtn, {color: colors.titleMenu, marginRight: indent, marginLeft: indent}]}>{screens.Drawer[screens.SubMenu].title}</Text>

                    {button(screens.Sections[screens.HotPicks].title, this._onSectionClick, screens.HotPicks, this.state.curPage)}
                    {button(screens.Sections[screens.Cinema].title, this._onSectionClick, screens.Cinema, this.state.curPage)}
                    {button(screens.Sections[screens.Attraction].title, this._onSectionClick, screens.Attraction, this.state.curPage)}
                    {button(screens.Sections[screens.Travel].title, this._onSectionClick, screens.Travel, this.state.curPage)}
                    {button(screens.Sections[screens.Shopping].title, this._onSectionClick, screens.Shopping, this.state.curPage)}
                    {button(screens.Sections[screens.Dining].title, this._onSectionClick, screens.Dining, this.state.curPage)}
                    {button(screens.Sections[screens.HealthBeauty].title, this._onSectionClick, screens.HealthBeauty, this.state.curPage)}
                </Animated.View>);
        } else {
            return null;
        }
    };



    render() {
        const { close } = this.props;

        return (
            <View style={s.container}>
                <View pointerEvents={this.state.pointerEvents}>
                    <TouchableOpacity onPress = {close} activeOpacity={0.5} style={[s.closeBtn, {width: iconSize + doubleIndent, height: iconSize + doubleIndent}]}>
                        <IconClose width={iconSize}/>
                    </TouchableOpacity>

                    {button(screens.Drawer[screens.DataPages].title, this._onCategoryClick, screens.DataPages, this.state.parentPage)}
                    {button(screens.Drawer[screens.UserProfile].title, this._onCategoryClick, screens.UserProfile, this.state.parentPage)}
                    {button(screens.Drawer[screens.Notifications].title, this._onCategoryClick, screens.Notifications, this.state.parentPage)}
                    {button(screens.Drawer[screens.Calendar].title, this._onCategoryClick, screens.Calendar, this.state.parentPage)}
                    {button(screens.Drawer[screens.VirtualReality].title, this._onCategoryClick, screens.VirtualReality, this.state.parentPage)}
                    {button(screens.Drawer[screens.Bookmarks].title, this._onCategoryClick, screens.Bookmarks, this.state.parentPage)}
                    {button(screens.Drawer[screens.SubMenu].title, this._onCategoryClick, screens.SubMenu, '')}
                    {button(screens.Drawer[screens.Settings].title, this._onCategoryClick, screens.Settings, this.state.parentPage, screens.Drawer[screens.Settings].icon)}
                </View>
                {this._subMenuArea()}
            </View>
        );
    }
}

export default Drawer;
