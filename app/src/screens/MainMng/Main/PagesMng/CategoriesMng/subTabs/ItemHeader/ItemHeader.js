import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import IconPlay from '../../../../../../../../assets/serviceIcons/playIcon.svg';
import IconNavi from '../../../../../../../../assets/serviceIcons/navigateIcon.svg';
import {scale} from '../../../../../../../utils/resize';
import Rating from '../../../../../../../components/Rating';

class ItemHeader extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        hasDirection: PropTypes.bool,
    };

    static defaultProps = {
        hasDirection: true,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {image, title, tags, videoUrl} = this.props.data;
        const rating = this.props.data.rating[0] ? this.props.data.rating[0].split('/')[0] / 2 : 0;
        const reviews = this.props.data.rating[1] ? this.props.data.rating[1].split(',')[0] : 0;
        const BtnIco = videoUrl === 'N/A' ? (this.props.hasDirection ? IconNavi : null) : IconPlay;
        return (
            <View key={this.props.type + 'HeaderKey'} style={s.header}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} progressiveRenderingEnabled={true}/>
                <LinearGradient colors={['#00000000', '#000000CC', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.linearGradient} />

                <View style={s.titleCnt}>
                    <Text style={s.title}>{title}</Text>
                    {BtnIco ?
                        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.5} style={s.rightBtn}>
                            <BtnIco width={scale(40)} height={scale(40)}/>
                        </TouchableOpacity>
                        : null
                    }
                </View>
                <View style={s.ratingCnt}>
                    <Rating editable={false} max={5} rating={rating} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                    <Text style={s.ratingInfo}>{reviews.toString() + ' Reviews'}</Text>
                </View>
                <View style={s.tagsCnt}>
                    {tags.map( (item, key) => { return (
                        <View key={key} style={s.tagCnt}>
                            <Text style={s.tagTxt}> {tags[key].toString()} </Text>
                        </View>
                    ); })}
                </View>
            </View>
        );
    }
}

export default ItemHeader;
