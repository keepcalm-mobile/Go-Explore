import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import CarouselPersons from '../../../../../../../components/CarouselPersons';
import s from './style';

class CinemaOverview extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    _infoCnt = (iData) => (
        <View style={s.overviewInfoCnt}>
            {iData.map( (item, key) => { return (
                <View key={key} style={s.overviewInfoItem}>
                    <Text style={s.overviewInfoTitle}> {iData[key].value.toString()} </Text>
                    <Text style={s.overviewInfoSubtitle}> {iData[key].title.toString()} </Text>
                </View>
            );})}
        </View>
    );

    render() {
        const {data} = this.props;
        return (
            <View style={s.tabCnt}>
                <Text style={s.overviewDesc}> {data.description} </Text>
                {this._infoCnt(data.info)}
                <CarouselPersons items={data.cast} title="CAST"/>
                <CarouselPersons items={data.crew} title="CREW"/>
                {this._infoCnt(data.rating)}
            </View>
        );
    }
}

export default CinemaOverview;
