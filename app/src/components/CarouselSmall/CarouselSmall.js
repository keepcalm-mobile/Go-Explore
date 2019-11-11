import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import s, {itemH, itemW} from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {MEDIA_PREF} from "../../constants";


class CarouselSmall extends React.Component<Props> {
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
        const {id, title, type} = item;//image, type,
        const image = (item.image && item.image.includes('https')) ? {uri:(MEDIA_PREF + item.image)} : require('../../../assets/placeholder.jpg');
        return (
            <TouchableOpacity key={id} onPress = { () => { this.props.onItemClick(id, type); }} activeOpacity={0.75} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={image} defaultSource={require('../../../assets/placeholder.jpg')} progressiveRenderingEnabled={true}/>
                <Text style={s.itemTitle} numberOfLines={3}>{title}</Text>
            </TouchableOpacity>
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

export default CarouselSmall;

/*
<Carousel
    ref={(c) => { this._carousel = c; }}
    data={items}
    renderItem={this._renderItem}
    sliderWidth={windowW}
    sliderHeight={itemH}
    itemWidth={itemW + indent}
    itemHeight={itemH}
    inactiveSlideScale={1}
    inactiveSlideOpacity={1}
    shouldOptimizeUpdates={false}
    activeSlideAlignment={'start'}
    // activeSlideOffset={0}
    enableSnap={false}
/>
 */