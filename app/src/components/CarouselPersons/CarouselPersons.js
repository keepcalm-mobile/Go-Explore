import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import s, {itemH, itemW} from './style';
import type {Props} from 'react-native/Libraries/Components/View/View';


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
        const {image, title, subTitle} = item;
        return (
            <View key={index} style={s.slide}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} />
                <Text style={s.itemTitle}>{title}</Text>
                <Text style={s.itemSubtitle}>{subTitle}</Text>
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
