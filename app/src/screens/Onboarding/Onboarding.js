import React from 'react';
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import type {Props} from 'react-native/Libraries/Components/View/View';
import s from './style';
import {MEDIA_PREF, screens} from '../../constants';
import {doubleIndent, fontSizes, headerH, indent, windowW} from '../../styles';
import {TabBar, TabView} from 'react-native-tab-view';
import colors from '../../styles/colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../utils/resize';
import Rating from '../../components/Rating';
import ButtonBlack from '../../components/ButtonBlack';
import {TextGradient} from "../../components";

const items = [
    {
        icon: screens.Categories[screens.HotPicks].icon,
        title: screens.Categories[screens.HotPicks].title,
        text: 'We have already selected the best for you. Enjoy the most popular and trending content.',
        image: require('../../../assets/onboarding/001.jpg'),
    },
    {
        icon: screens.Categories[screens.Attraction].icon,
        title: screens.Categories[screens.Attraction].title,
        text: 'Stay up to date with the best events, concerts and entertainment.',
        image: require('../../../assets/onboarding/002.jpg'),
    },
    {
        icon: screens.Categories[screens.Cinema].icon,
        title: screens.Categories[screens.Cinema].title,
        text: 'Don’t miss a movie premiere, read the reviews and watch the previews before buying a ticket without having to leave home.',
        image: require('../../../assets/onboarding/003.jpg'),
    },
    {
        icon: screens.Categories[screens.HealthBeauty].icon,
        title: screens.Categories[screens.HealthBeauty].title,
        text: 'Large selection of spa salons, gyms and everything you need for your healthy lifestyle.',
        image: require('../../../assets/onboarding/004.jpg'),
    },
    {
        icon: screens.Categories[screens.Dining].icon,
        title: screens.Categories[screens.Dining].title,
        text: 'Restaurants and cafes for every taste and budget in the palm of your hand.',
        image: require('../../../assets/onboarding/005.jpg'),
    },
    {
        icon: screens.Categories[screens.Travel].icon,
        title: screens.Categories[screens.Travel].title,
        text: 'Traveling is easy now, buy plane tickets, make a hotel reservation or book a local ride.',
        image: require('../../../assets/onboarding/006.jpg'),
    },
    {
        icon: screens.Categories[screens.Shopping].icon,
        title: screens.Categories[screens.Shopping].title,
        text: 'Now you don’t have to go to the store, choose and order a selection of quality products direct from your mobile phone.',
        image: require('../../../assets/onboarding/007.jpg'),
    },
    {
        icon: screens.AppPages[screens.VirtualReality].iconC,
        title: 'AR Maps',
        text: 'GoExplore provides an augmented reality (AR) experience. Let us guide you on your journey providing local information and exclusive offers along the way.',
        image: require('../../../assets/onboarding/008.jpg'),
    },
];

class Onboarding extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            curIdx: 0,
            btnTitle: 'NEXT',
            visible: props.visible,
        };
    }

    onNextClick = () => {
        if (this.state.curIdx === items.length - 1){
            this.setState({visible:false});
            this.props.finished({email:'', pass:''});
        } else {
            this._carousel.snapToNext();
        }
        // this.setState({curIdx:this.state.curIdx + 1});
    };

    _renderItem = ({item, index}) => {
        const {title, text, image} = item;
        const Icon = item.icon;
        return (
            <View key={index} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={image} progressiveRenderingEnabled={true}/>
                <LinearGradient colors={['#00000000', '#000000DD', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.linearGradient} />
                <View style={s.infoCnt}>
                    <View style={s.titleCnt}>
                        <Icon width={scale(50)} height={scale(50)}/>
                        <Text style={s.title}>{title}</Text>
                    </View>
                    <Text style={s.subTitle} numberOfLines={4}>{text}</Text>
                </View>
            </View>
        );
    };

    _paginationItem = (iCount, iCur) => {
        let _items = [];
        let _width = ( windowW - doubleIndent - ((iCount - 1) * scale(5)) ) / iCount;
        for (let i = 0; i < iCount; i++) {
            _items.push(<View key={'paginationKey' + i} style={[s.pagItem, {width:_width, backgroundColor: i === iCur ? colors.darkMain : colors.lightSecondary}]}/>);
        }
        return _items;
    };

    _setCurIdx = (index) => {
        this.setState({ curIdx: index, btnTitle: index === items.length - 1 ? 'GO EXPLORE' : 'NEXT' });
    };

    render() {
        const {curIdx, btnTitle} = this.state;
        return (
            <Modal
                onRequestClose={() => {}}
                animationType={'fade'}
                transparent={false}
                visible={this.state.visible}
                supportedOrientations={['portrait']}
                onOrientationChange={
                    evt => this.setState({currentOrientation: evt.nativeEvent.orientation})
                }
            >
                <View style={s.container}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={items}
                        renderItem={this._renderItem}
                        sliderWidth={windowW}
                        sliderHeight={headerH}
                        itemWidth={windowW}
                        itemHeight={headerH}
                        loop={false}
                        inactiveSlideScale={1}
                        autoplay={false}
                        scrollEnabled={false}
                        onSnapToItem={ this._setCurIdx }
                        // shouldOptimizeUpdates={false}
                        // containerCustomStyle={{marginTop:-20, alignContent:'flex-start', alignSelf:'flex-start'}}
                        // contentContainerCustomStyle={{justifyContent:'flex-start', alignContent:'flex-start'}}
                    />
                    <View style={s.footer}>
                        <View style={s.pagItemsCnt}>{this._paginationItem(items.length, curIdx)}</View>
                        <TouchableOpacity onPress = {this.onNextClick} activeOpacity={0.5} style={s.button}>
                            <TextGradient text={btnTitle} style={s.buttonTitle} fontSize={fontSizes.description} lineHeight={fontSizes.description}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default Onboarding;

// {/*<Pagination*/}
// {/*    dotsLength={items.length}*/}
// {/*    activeDotIndex={this.state.slider1ActiveSlide}*/}
// {/*    containerStyle={s.paginationContainer}*/}
// {/*    dotColor={colors.darkMain}*/}
// {/*    dotStyle={s.paginationDot}*/}
// {/*    dotContainerStyle={s.paginationDotContainer}*/}
// {/*    inactiveDotColor={colors.white}*/}
// {/*    inactiveDotOpacity={0.5}*/}
// {/*    inactiveDotScale={1}*/}
// {/*    carouselRef={this._carousel}*/}
// {/*    tappableDots={!!this._carousel}*/}
// {/*/>*/}