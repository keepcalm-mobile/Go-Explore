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
            {iData.map( (item, key) => {
                const {title, value, source, review} = item;
                return(
                    <View key={key} style={s.overviewInfoItem}>
                        <Text style={s.overviewInfoTitle}> {title ? title : review} </Text>
                        <Text style={s.overviewInfoSubtitle}> {value ? value : source} </Text>
                    </View>
                );
            })}
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
                {this._infoCnt(data.review)}
            </View>
        );
    }
}

export default CinemaOverview;
