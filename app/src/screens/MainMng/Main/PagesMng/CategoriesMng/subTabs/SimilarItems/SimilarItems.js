import type {Props} from 'react-native/Libraries/Components/View/View';
import {View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Separator from '../../../../../../../../assets/serviceIcons/separator.svg';
import {windowW} from '../../../../../../../styles';
import CarouselSmall from '../../../../../../../components/CarouselSmall';

class SimilarItems extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onItemPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data, title, onItemPress} = this.props;
        return (
            <View style={s.tabCnt}>
                <Separator width={windowW} style={s.separator}/>
                <CarouselSmall onItemClick={onItemPress} items={data} title={title}/>
            </View>
        );
    }
}

export default SimilarItems;
