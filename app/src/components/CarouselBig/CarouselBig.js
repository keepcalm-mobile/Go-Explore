import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import s, {itemH, itemW} from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {scale} from '../../utils/resize';


class CarouselBig extends React.Component<Props> {
    static propTypes = {
        onItemClick: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    _renderItem = (item, index) => {
        const {id, title} = item;//image, type,
        const image = item.url;
        const type = 'cinema';
        return (
            //{/*<View key={item.id} style={s.slide}>*/}
            <TouchableOpacity key={id} onPress = { () => { this.props.onItemClick(id, type); }} activeOpacity={0.75} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} />
                <Text style={s.itemTitle}>{title}</Text>
            </TouchableOpacity>
            // </View>
        );
    };

    render() {
        const { items, title } = this.props;
        return (
            <View style={s.container}>
                <Text style={s.title}>{title}</Text>

                <ScrollView horizontal={true}
                            pinchGestureEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={s.slider}>
                    {items.map( (item, key) => { return this._renderItem(item, key); })}
                </ScrollView>
            </View>
        );
    }
}


export default CarouselBig;
/*
<Carousel
    ref={(c) => { this._carousel = c; }}
    data={items}
    renderItem={this._renderItem}
    sliderWidth={windowW}
    sliderHeight={itemH}
    itemWidth={itemW + doubleIndent}
    itemHeight={itemH}
    inactiveSlideScale={1}
    inactiveSlideOpacity={1}
    shouldOptimizeUpdates={false}
    activeSlideAlignment={'start'}
    // activeSlideOffset={0}
    enableSnap={false}
/>
 */