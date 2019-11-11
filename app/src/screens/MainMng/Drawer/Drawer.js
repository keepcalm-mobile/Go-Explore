import React from 'react';
import {TouchableOpacity, View, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from '../../../utils/resize';
import IconClose from '../../../../assets/serviceIcons/closeIcon.svg';
import IconBack from '../../../../assets/serviceIcons/backIconDrawer.svg';
import {colors, doubleIndent, indent} from '../../../styles';
import s from './style';
import {screens} from '../../../constants';
import {LoginManager} from 'react-native-fbsdk';
import {Auth, logOut} from '../../../api/Auth';

const iconSize = scale(22);

const icon = (Icon) => {
    if (Icon) {
        return (<Icon style={{marginRight:scale(8), marginTop: scale(8)}}/>);
    } else {
        return null;
    }
};

const button = (iTitle, iPress, iId, iCur, Icon = null) => {
    let _disabled = iCur === iId;
    return (
        <TouchableOpacity onPress = {() => iPress(iId)} activeOpacity={0.5} disabled={_disabled} style={{flexDirection:'row', width: '100%', height: scale(40), marginTop: scale(Icon ? 50 : 10), marginLeft: indent, marginRight: indent}}>
            {icon(Icon)}
            <Text style={[s.textBtn, {color: _disabled ? colors.darkMain : colors.white}]}>
                {iTitle}
            </Text>
        </TouchableOpacity>
    );
};

class Drawer extends React.Component<Props> {
    static propTypes = {
        onChoicePage: PropTypes.func.isRequired,
        onChoiceCategory: PropTypes.func.isRequired,
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
        if (screens.Categories[iId]) {
            this.setState({parentPage: screens.DataPages, curPage: iId});
        } else if (screens.ItemsActions[iId]) {
            this.setState({parentPage: screens.DataPages, curPage: screens.ItemsActions[iId]});
        } else {
            this.setState({parentPage:iId, curPage:''});
        }
    };

    _logOut = () => {
        logOut().then((iResp) => {
            if (Auth.AUTH_LOGOUT === iResp) {
                this.props.onChoicePage(screens.AuthMng);
                // this.props.navigation.navigate('Auth');
            }
        });
    };

    _onBackClick = () => {
        if (this.state.showSubMenu){
            Animated.spring(this.state.pan, {
                toValue: 0,
                friction: 9,
                useNativeDriver: true,
            }).start( () => {this.setState({showSubMenu:false});});
            this.setState({pointerEvents:'auto'});
        }
    };

    _onPageClick = (iId) => {
        if (iId === screens.Settings){
            LoginManager.logOut();
            this._logOut();
        } else if (iId === screens.SubMenu){
            Animated.spring(this.state.pan, {
                toValue: this.state.subMenuWidth,
                friction: 9,
                useNativeDriver: true,
            }).start();
            this.setState({showSubMenu:true, pointerEvents:'none'});
        } else {
            this.props.onChoicePage(iId);
        }
    };

    _onCategoryClick = (iId) => {
        this.props.onChoiceCategory(iId);
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

                    <Text style={[s.textBtn, s.subMenuTitle]}>{screens.Drawer[screens.SubMenu].title}</Text>

                    {button(screens.Categories[screens.HotPicks].title, this._onCategoryClick, screens.HotPicks, this.state.curPage)}
                    {button(screens.Categories[screens.Cinema].title, this._onCategoryClick, screens.Cinema, this.state.curPage)}
                    {button(screens.Categories[screens.Attraction].title, this._onCategoryClick, screens.Attraction, this.state.curPage)}
                    {button(screens.Categories[screens.Travel].title, this._onCategoryClick, screens.Travel, this.state.curPage)}
                    {button(screens.Categories[screens.Shopping].title, this._onCategoryClick, screens.Shopping, this.state.curPage)}
                    {button(screens.Categories[screens.Dining].title, this._onCategoryClick, screens.Dining, this.state.curPage)}
                    {button(screens.Categories[screens.HealthBeauty].title, this._onCategoryClick, screens.HealthBeauty, this.state.curPage)}
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

                    {button(screens.Drawer[screens.DataPages].title, this._onPageClick, screens.DataPages, this.state.parentPage)}
                    {button(screens.Drawer[screens.UserProfile].title, this._onPageClick, screens.UserProfile, this.state.parentPage)}
                    {button(screens.Drawer[screens.Notifications].title, this._onPageClick, screens.Notifications, this.state.parentPage)}
                    {button(screens.Drawer[screens.Calendar].title, this._onPageClick, screens.Calendar, this.state.parentPage)}
                    {button(screens.Drawer[screens.VirtualReality].title, this._onPageClick, screens.VirtualReality, this.state.parentPage)}
                    {button(screens.Drawer[screens.Bookmarks].title, this._onPageClick, screens.Bookmarks, this.state.parentPage)}
                    {button(screens.Drawer[screens.SubMenu].title, this._onPageClick, screens.SubMenu, '')}
                    {/*{button(screens.Drawer[screens.Settings].title, this._onPageClick, screens.Settings, this.state.parentPage, screens.Drawer[screens.Settings].icon)}*/}
                </View>
                {this._subMenuArea()}
            </View>
        );
    }
}

export default Drawer;