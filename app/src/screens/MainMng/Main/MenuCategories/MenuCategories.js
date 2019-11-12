import React from 'react';
import {Animated, PanResponder, Text, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../utils/resize';
import LinearGradient from 'react-native-linear-gradient';
import s, {iconSize, ellipseSize} from './style';
import {barH, bottomIndent, windowH} from '../../../../styles';
import PropTypes from 'prop-types';
import {screens} from '../../../../constants';
import IconClose from '../../../../../assets/categoriesIcons/iconClose.svg';
import IconsEllipse from '../../../../../assets/categoriesIcons/iconEllipse.svg';

const button = (Icon, onPress, iId, iTitle) => {
    return (
        <TouchableOpacity onPress = {() => onPress(iId)} activeOpacity={0.5} style={s.btn}>
            <View style={s.iconsCnt}>
                <Icon width={iconSize} height={iconSize} style={s.btnIcon}/>
                <IconsEllipse width={ellipseSize} height={ellipseSize} style={s.btnEllipse} />
            </View>
            <Text style={s.btnTitle} numberOfLines={1}>{iTitle}</Text>
        </TouchableOpacity>
    );
};

class MenuCategories extends React.Component<Props> {
    static propTypes = {
        onButtonPress: PropTypes.func.isRequired,
    };

    state = {
        areaMargin: new Animated.ValueXY({x:0,y:windowH + bottomIndent + barH}),
    };

    constructor(props) {
        super(props);

        this.isOpen = false;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (evt, gestureState) => {
                this.state.areaMargin.setOffset({x: 0, y: gestureState.dy > 0 ? gestureState.dy : 0});
                // Animated.event([ null, { dy: this.state.areaMargin.y } ]);
            },
            onPanResponderRelease: (e, gesture) => {
                this.state.areaMargin.flattenOffset();

                let toAction = this.isOpen;
                if (Math.abs(gesture.dy) > 100){
                    toAction = gesture.dy < 0;
                }

                this.startAnimation(toAction);
            },
        });
    }

    hide = () => {
        this.startAnimation(false);
    };

    show = () => {
        this.startAnimation(true);
    };

    startAnimation = (iValue) => {
        Animated.spring(this.state.areaMargin, {
            toValue: { x: 0, y: iValue ? 0 : windowH + bottomIndent + barH},
            friction: 10,
            useNativeDriver: true,
        }).start();

        this.isOpen = iValue;
    };

    render() {
        const { onButtonPress } = this.props;
        const { areaMargin } = this.state;
        const transformStyle = { transform: areaMargin.getTranslateTransform() };

        return (
            <Animated.View style={[transformStyle, s.container]}>
                <View style={s.containerBg}>
                    <LinearGradient {...this.panResponder.panHandlers} colors={['#00000000', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.bgGradient} />
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
