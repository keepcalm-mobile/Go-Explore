import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import s, {itemH, itemW} from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {windowW, colors, doubleIndent, indent} from '../../styles';
import Separator from '../../../assets/topIcons/separator.svg';


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
        return (
            <View key={item.id} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: item.image}} />
                <Text style={s.itemTitle}>{item.title}</Text>
            </View>
        );
    };

    render = () => {
        const { items, onPress, title } = this.props;
        return (
            <View style={s.container}>
                <Separator width={windowW} style={s.separator}/>
                <Text style={s.title}>{title}</Text>

                <ScrollView horizontal={true}
                            removeClippedSubviews={false}
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