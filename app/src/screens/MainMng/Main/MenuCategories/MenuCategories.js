import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../utils/resize';
import LinearGradient from 'react-native-linear-gradient';
import s, {iconSize, ellipseSize} from './style';
import {bottomIndent, windowH} from '../../../../styles';
import PropTypes from 'prop-types';
import {screens} from '../../../../constants';
import IconClose from '../../../../../assets/categoriesIcons/iconClose.svg';
import IconsEllipse from '../../../../../assets/categoriesIcons/iconEllipse.svg';

const button = (Icon, onPress, iId, iTitle) => {
    return (
        <TouchableOpacity onPress = {() => onPress(iId)} activeOpacity={0.5} style={s.btn}>
            <Icon width={iconSize} height={iconSize}/>
            <IconsEllipse width={ellipseSize} height={ellipseSize} style={s.btnEllipse} />
            <Text style={s.btnTitle}>{iTitle}</Text>
        </TouchableOpacity>
    );
};

class MenuCategories extends React.Component<Props> {
    static propTypes = {
        onButtonPress: PropTypes.func.isRequired,
    };

    state = {
        areaMargin: new Animated.ValueXY({x:0,y:windowH + bottomIndent}),
    };

    constructor(props) {
        super(props);
    }

    hide = () => {
        Animated.spring(this.state.areaMargin, {
            toValue: { x: 0, y: windowH + bottomIndent },
            friction: 10,
            useNativeDriver: true,
        }).start();
    };

    show = () => {
        Animated.spring(this.state.areaMargin, {
            toValue: { x: 0, y: (windowH + bottomIndent) * 0.2 },
            friction: 10,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const { onButtonPress } = this.props;
        const { areaMargin } = this.state;
        const transformStyle = { transform: areaMargin.getTranslateTransform() };

        return (
            <Animated.View style={[transformStyle, s.container]}>
                <View style={s.containerBg}>
                    <LinearGradient colors={['#00000000', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.bgGradient} />
                    <View  style={s.bgBlack}/>
                </View>
                <View style={s.btnsArea}>

                    <View style={s.btnsRow}>
                        {button(screens.Categories[screens.Attraction].icon, onButtonPress, screens.Attraction, screens.Categories[screens.Attraction].title)}
                        {button(screens.Categories[screens.Cinema].icon, onButtonPress, screens.Cinema, screens.Categories[screens.Cinema].title)}
                        {button(screens.Categories[screens.Dining].icon, onButtonPress, screens.Dining, screens.Categories[screens.Dining].title)}
                    </View>
                    <View style={s.btnsRow}>
                        {button(screens.Categories[screens.HealthBeauty].icon, onButtonPress, screens.HealthBeauty, screens.Categories[screens.HealthBeauty].title)}
                        {button(screens.Categories[screens.Shopping].icon, onButtonPress, screens.Shopping, screens.Categories[screens.Shopping].title)}
                        {button(screens.Categories[screens.Travel].icon, onButtonPress, screens.Travel, screens.Categories[screens.Travel].title)}
                    </View>
                    <View style={s.btnsRow}>
                        {button(screens.Categories[screens.HotPicks].icon, onButtonPress, screens.HotPicks, screens.Categories[screens.HotPicks].title)}
                    </View>
                    <TouchableOpacity onPress = {this.hide} activeOpacity={0.5} style={s.closeBtn}>
                        <IconClose width={scale(77)}/>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

export default MenuCategories;
