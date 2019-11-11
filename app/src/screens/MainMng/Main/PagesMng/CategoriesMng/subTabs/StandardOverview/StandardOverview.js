import type {Props} from 'react-native/Libraries/Components/View/View';
import {Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import {ButtonBlack} from '../../../../../../../components';

class StandardOverview extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onDirectionPress: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data} = this.props;
        return (
            <View style={s.tabCnt}>
                <Text style={s.overviewDesc}> {data.description} </Text>
                <ButtonBlack title={'GET DIRECTION'} onPress={this.props.onDirectionPress} titleStyle={s.directionBtnText}/>
            </View>
        );
    }
}

export default StandardOverview;
