import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import s, {itemH, itemW} from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';
import {MEDIA_PREF} from "../../constants";


class CarouselPersons extends React.Component<Props> {
    static propTypes = {
        items: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    _renderItem = (item, index) => {
        const {name, character, job} = item;
        const image = item.profile_path !== 'N/A' ? {uri:(MEDIA_PREF + item.profile_path)} : require('../../../assets/placeholder.jpg');
        return (
            <View key={index} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={image} />
                <Text style={s.itemTitle} numberOfLines={2}>{name}</Text>
                <Text style={s.itemSubtitle} numberOfLines={2}>{character ? character : job}</Text>
            </View>
        );
    };

    render() {
        const { items, title } = this.props;
        return (
            <View style={s.container}>
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

export default CarouselPersons;
