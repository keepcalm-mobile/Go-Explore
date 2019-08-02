import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';

class Explore extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {image, text} = this.props.data;
        return (
            <View style={s.tabCnt}>
                <Image resizeMode={'cover'} style={s.exploreImage} source={{uri: image}} progressiveRenderingEnabled={true}/>
                <Text style={s.exploreText}>{text}</Text>
            </View>
        );
    }
}

export default Explore;
