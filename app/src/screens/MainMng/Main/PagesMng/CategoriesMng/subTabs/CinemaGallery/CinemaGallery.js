import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';

class CinemaGallery extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    _cinemaItem = (item, index) => {
        const {image} = item;
        return (
            <View key={index} style={s.cinemaSlide}>
                <Image resizeMode={'cover'} style={s.cinemaItemImage} source={{uri: image}} progressiveRenderingEnabled={true}/>
            </View>
        );
    };

    render() {
        const {data} = this.props;
        return (
            <View style={s.tabCnt}>
                <Text style={s.cinemaTitle}>Experience</Text>

                <ScrollView horizontal={true}
                            pinchGestureEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={s.cinemaSlider}>

                    {data.map( (item, key) => { return this._cinemaItem(item, key); })}
                </ScrollView>
            </View>
        );
    }
}

export default CinemaGallery;
