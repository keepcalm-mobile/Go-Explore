import type {Props} from 'react-native/Libraries/Components/View/View';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import PhotoView from '@merryjs/photo-viewer';
import s from './style';

class CinemaGallery extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array,
        showTitle: PropTypes.bool,
    };

    static defaultProps = {
        showTitle: true,
    };

    constructor(props) {
        super(props);

        this._photosArr = [];
        if (this.props.data) {
            for (let i = 0; i < this.props.data.length; i++) {
                const image = this.props.data[i].includes('net//') ? ('https://testgoexplorecity.azurewebsites.net/' + this.props.data[i].split('//')[1]) : this.props.data[i];
                this._photosArr.push({source:{uri: image}});
            }
        }

        this.state = {
            viewerIsVisible: false,
            viewerInitialId: 0,
        };
    }

    onImageClick = (iID) => {
        this.setState({viewerIsVisible: true, viewerInitialId: iID});
    };

    _cinemaItem = (item, index) => {
        return (
            <TouchableOpacity key={index} style={s.cinemaSlide} onPress = { () => { this.onImageClick(index); }} activeOpacity={0.75}>
                <Image {...item} resizeMode={'cover'} style={s.cinemaItemImage} progressiveRenderingEnabled={true}/>
            </TouchableOpacity>
        );
    };

    render() {
        const {data, showTitle} = this.props;
        if (!data) return <View style={s.tabCnt} />;

        return (
            <View style={s.tabCnt}>
                {showTitle ? <Text style={s.cinemaTitle}>Experience</Text> : null}

                <ScrollView horizontal={true}
                            pinchGestureEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={s.cinemaSlider}>

                    {this._photosArr.map( (item, key) => { return this._cinemaItem(item, key); })}
                </ScrollView>

                <PhotoView
                    visible={this.state.viewerIsVisible}
                    data={this._photosArr}
                    hideStatusBar={true}
                    hideShareButton={true}
                    initial={this.state.viewerInitialId}
                    onDismiss={e => {
                        // don't forgot set state back.
                        this.setState({ viewerIsVisible: false });
                    }}
                />
            </View>
        );
    }
}

export default CinemaGallery;
