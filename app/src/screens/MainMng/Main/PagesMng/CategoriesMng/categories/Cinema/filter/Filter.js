import React from 'react';
import {Text, View, TextInput, Picker} from 'react-native';
import s from './style';
import {colors} from '../../../../../../../../styles';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';
import CircleValues from '../../../../../../../../components/filters/CircleValues';
import CircleItem from '../../../../../../../../components/filters/CircleValues/Item';
import HorizontalLine from '../../../../../../../../components/filters/HorizontalLine/HorizontalLine';
import SelectableItems from '../../../../../../../../components/filters/SelectableItems';
import Keywords from '../../../../../../../../components/filters/Keywords';
import Location from '../../../../../../../../components/filters/Location';
import Languages from '../../../../../../../../components/filters/Languages';
import RangeSlider from '../../../../../../../../components/filters/RangeSlider';
import ButtonOrange from '../../../../../../../../components/ButtonOrange';

const keywords = ['Superhero','Thor'];
const locations = [{label:'Mall of Qatar - Doha', value:'place0'}, {label:'Another Place 1', value:'place1'}, {label:'Another Place 2', value:'place2'}, {label:'Another Place 3', value:'place3'}];

const genres = [
    { label: 'Action', active: false },
    { label: 'Adult', active: false },
    { label: 'Adventure', active: true },
    { label: 'Avant-garde/Experimental', active: false },
    { label: 'Comedy', active: true },
    { label: 'Children\'s/Family', active: false },
    { label: 'Comedy Drama', active: false },
    { label: 'Crime', active: false },
    { label: 'Drama', active: false },
    { label: 'Epic', active: true },
    { label: 'Fantasy', active: false },
    { label: 'Historical Film', active: false },
    { label: 'Horror', active: false },
    { label: 'Musical', active: false },
    { label: 'Mystery', active: true },
    { label: 'Romance', active: false },
    { label: 'Science Fiction', active: false },
    { label: 'Spy Film', active: false },
    { label: 'War', active: false },
    { label: 'Western', active: false },
];

const experience = [
    { label: '2D', active: false },
    { label: '2D IMAX', active: true },
    { label: '3D', active: false },
    { label: '3D IMAX', active: true },
];

const languages = [
    { label: 'English', active: false },
    { label: 'Arabian', active: true },
    { label: 'French', active: false },
    { label: 'Italian', active: false },
];

const ranges = {
    valueMin: 40,
    valueMax: 200,
    setMin: 20,
    setMax: 180,
};

class Filter extends React.Component<Props> {
    static propTypes = {
        onApplyClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            scrollEnabled: true,

            priceMin: 0,
            priceMax: 100,
            priceMinCurrent: 0,
            priceMaxCurrent: 57,
        };
    }

    render() {

        return (
            <LinearGradient style={s.filtersContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={92} angleCenter={{ x: 0.5, y: 0.5}}>
                <Text style={s.filtersHeader}>Filters</Text>

                <Text style={s.filtersCategoryHeader}>Keywords</Text>
                <Keywords data={keywords} ref={c => this._keywords = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Location</Text>
                <Location data={locations} ref={c => this._location = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Rating</Text>
                <CircleValues key={CircleItem.TYPE_RATING} type={CircleItem.TYPE_RATING} active={'3'} ref={c => this._rating = c} />

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Genre</Text>
                <SelectableItems key={'SelectableGenre'} data={genres} ref={c => this._genres = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Experience</Text>
                <SelectableItems key={'SelectableExperience'} data={experience} ref={c => this._experience = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Languages</Text>
                <Languages data={languages} ref={c => this._languages = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Age</Text>
                <CircleValues key={CircleItem.TYPE_AGE} type={CircleItem.TYPE_AGE} ref={c => this._ages = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Price</Text>
                <RangeSlider valueMin={ranges.valueMin} valueMax={ranges.valueMax} setMin={ranges.setMin} setMax={ranges.setMax} ref={c => this._rangeSlider = c}/>

                <ButtonOrange title={'APPLY FILTERS'} style={{width:'100%'}} onPress={this.props.onApplyClick} />
            </LinearGradient>
        );
    }
}

export default Filter;