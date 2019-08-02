import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import s from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';
import  Rating from '../Rating';
import {windowW, colors, headerH} from '../../styles';
import {scale} from '../../utils/resize';
import ButtonBlack from '../ButtonBlack';



class Header extends React.Component<Props> {
    static propTypes = {
        onItemClick: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 0,
        };
    }

    _renderItem = ({item, index}) => {
        const {id, type, image, title, subTitle, rating} = item;
        return (
            <View key={id} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} />
                <LinearGradient colors={['#00000000', '#000000CC', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.linearGradient} />
                <Text style={s.title}>{title}</Text>
                <Text style={s.subTitle}>{subTitle}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:scale(7)}}>
                    <Rating editable={false} max={5} rating={rating} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                    <ButtonBlack onPress = { () => { this.props.onItemClick(id, type); }} title={'View detail'}/>
                </View>
            </View>
        );
    };

    render = () => {
        const { items, onPress, onLayout } = this.props;
        return (
            <View style={s.container}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={items}
                    renderItem={this._renderItem}
                    sliderWidth={windowW}
                    sliderHeight={headerH}
                    itemWidth={windowW}
                    itemHeight={headerH}
                    // loop={true}
                    inactiveSlideScale={1}
                    autoplay={true}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                    // shouldOptimizeUpdates={false}
                    // containerCustomStyle={{marginTop:-20, alignContent:'flex-start', alignSelf:'flex-start'}}
                    // contentContainerCustomStyle={{justifyContent:'flex-start', alignContent:'flex-start'}}
                />
                <Pagination
                    dotsLength={items.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={s.paginationContainer}
                    dotColor={colors.darkMain}
                    dotStyle={s.paginationDot}
                    dotContainerStyle={s.paginationDotContainer}
                    inactiveDotColor={colors.white}
                    inactiveDotOpacity={0.5}
                    inactiveDotScale={1}
                    carouselRef={this._carousel}
                    tappableDots={!!this._carousel}
                />
            </View>
        );
    }
}


export default Header;
