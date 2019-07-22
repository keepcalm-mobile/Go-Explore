import React from 'react';
import {LayoutAnimation, Text, TouchableOpacity, View} from 'react-native';
import {scale} from '../../../../utils/resize';
import LinearGradient from 'react-native-linear-gradient';
import s from './style';
import {bottomIndent, windowH} from '../../../../styles';
import PropTypes from 'prop-types';
import {screens} from '../../../../constants';
import IconClose from '../../../../../assets/categoriesIcons/iconClose.svg';


const button = (Icon, onPress, iId = null) => {
    return (
        <TouchableOpacity onPress = {() => onPress(iId)} activeOpacity={0.5} style={{width: scale(96), height: scale(96), alignItems:'center', justifyContent:'center'}}>
            <Icon width={scale(76)}/>
            <Text style={s.btnTitle}>{iId}</Text>
        </TouchableOpacity>
    );
};

class SectionsMenu extends React.Component<Props> {
    static propTypes = {
        onButtonPress: PropTypes.func.isRequired,
    };

    state = {
        areaMargin:windowH+bottomIndent,
    };

    constructor(props) {
        super(props);
    }

    hide = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({areaMargin:windowH+bottomIndent});
    };

    show = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({areaMargin:((windowH+bottomIndent) * 0.2)});
    };

//, alignItems: 'center', justifyContent: 'center'
    render() {
        const { onButtonPress } = this.props;
        return (
            <View style={{position:'absolute', flex:1, width:'100%', height:(windowH * 0.8), marginTop:this.state.areaMargin, justifyContent:'flex-end', alignContent:'flex-end', flexDirection:'column'}}>
                <View style={{position:'absolute', width:'100%', height:'100%'}}>
                    <LinearGradient colors={['#00000000', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{width:'100%', height:'30%'}} />
                    <View  style={{width:'100%', height:'72%', backgroundColor:'#000000'}}/>
                </View>
                <View style={{height:'80%'}}>

                    <View style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
                        {button(screens.Sections[screens.Attraction].icon, onButtonPress, screens.Attraction)}
                        {button(screens.Sections[screens.Cinema].icon, onButtonPress, screens.Cinema)}
                        {button(screens.Sections[screens.Dining].icon, onButtonPress, screens.Dining)}
                    </View>
                    <View style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
                        {button(screens.Sections[screens.HealthBeauty].icon, onButtonPress, screens.HealthBeauty)}
                        {button(screens.Sections[screens.Shopping].icon, onButtonPress, screens.Shopping)}
                        {button(screens.Sections[screens.Travel].icon, onButtonPress, screens.Travel)}
                    </View>
                    <View style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>
                        {button(screens.Sections[screens.HotPicks].icon, onButtonPress, screens.HotPicks)}
                    </View>
                    {/*<View style={{flex:1, justifyContent:'space-around', flexDirection:'row', alignItems:'center'}}>*/}
                        <TouchableOpacity onPress = {this.hide} activeOpacity={0.5} style={{width: '100%', height: scale(40), alignItems:'center', justifyContent:'center'}}>
                            <IconClose width={scale(77)}/>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default SectionsMenu;
