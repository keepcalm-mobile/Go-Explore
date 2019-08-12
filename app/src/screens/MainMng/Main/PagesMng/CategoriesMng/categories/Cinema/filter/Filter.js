import React from 'react';
import {Text, View, TextInput, Picker} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../../components/ButtonOrange';
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

//TODO: load image from server?
import DropdownArrow from '../../../../../../../../../assets/serviceIcons/dropdownArrow.svg';
import {scale} from '../../../../../../../../utils/resize';

import defaultStyle, {colors, fontNames, fontSizes, indent, windowW} from '../../../../../../../../styles';
import PropTypes from 'prop-types';
import CircleValues from '../../../../../../../../components/filters/CircleValues';
import CircleItem from '../../../../../../../../components/filters/CircleValues/Item';
import HorizontalLine from '../../../../../../../../components/filters/HorizontalLine/HorizontalLine';
import Keyword from '../../../../../../../../components/filters/Keyword/Keyword';
import SelectableItems from '../../../../../../../../components/filters/SelectableItems';
import Keywords from '../../../../../../../../components/filters/Keywords';
import Location from '../../../../../../../../components/filters/Location';

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

class Filter extends React.Component<Props> {
    static propTypes = {
        onApplyClick: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            scrollEnabled: true,

            languages: [
                'English',
                'Arabian',
            ],
            priceMin: 0,
            priceMax: 100,
            priceMinCurrent: 0,
            priceMaxCurrent: 57,
        };
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    render() {

        let languages = [];
        for (let i = 0; i < this.state.languages.length; i++)
        {
            languages.push(<Keyword key={i} title={this.state.languages[i]} editable={true} />);
        }

        return (
            <LinearGradient style={s.filtersContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={92} angleCenter={{ x: 0.5, y: 0.5}}>
                <Text style={s.filtersHeader}>Filters</Text>

                <Text style={s.filtersCategoryHeader}>Keywords</Text>
                <Keywords data={['Superhero','Thor']} ref={c => this._keywords = c}/>

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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <View style={s.languagesContainer}>
                        {languages}
                        <View style={s.dropdownTouchArea}>
                            <DropdownArrow />
                        </View>
                    </View>
                </View>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Age</Text>
                <CircleValues key={CircleItem.TYPE_AGE} type={CircleItem.TYPE_AGE} ref={c => this._ages = c}/>

                <HorizontalLine />

                <Text style={s.filtersCategoryHeader}>Price</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', paddingLeft: indent, paddingRight: indent, width: '100%', height: 20}}>
                    <MultiSlider
                        values={[this.state.priceMinCurrent, this.state.priceMaxCurrent]}
                        min={this.state.priceMin}
                        max={this.state.priceMax}
                        step={1}
                        onValuesChangeStart={this.disableScroll}
                        onValuesChangeFinish={this.enableScroll}
                        isMarkersSeparated={true}
                        trackStyle={{backgroundColor: '#ffffff', width: '100%'}}
                        selectedStyle={{backgroundColor: colors.border}}
                        containerStyle={{width: (windowW - (indent * 4)), marginLeft: -indent, marginRight: -indent, padding: 0}}
                        sliderLength={(windowW - (indent * 4))} //TODO: find out how to make it like 100% for any screen width

                        onValuesChange={(values) => {
                            this.setState({
                                priceMinCurrent: values[0],
                                priceMaxCurrent: values[1],
                            });
                        }}

                        customMarkerLeft={(e) => {
                            return (<LinearGradient
                                colors={['#ff9e18', '#f8df8d']}
                                currentValue={e.currentValue}
                                style={{width: 20, height: 20, borderRadius: 20}}
                            />);
                        }}

                        customMarkerRight={(e) => {
                            return (<LinearGradient
                                colors={['#ff9e18', '#f8df8d']}
                                currentValue={e.currentValue}
                                style={{width: 20, height: 20, borderRadius: 20}}
                            />);
                        }}
                    />
                </View>
                <View style={{width: '100%', flexDirection: 'row', height: 20, marginBottom: 44, marginTop: 25}}>
                    <Text
                        style={{color: '#ffffff', fontSize: fontSizes.description, position: 'absolute',
                            left: (((this.state.priceMinCurrent / this.state.priceMax) * (windowW - (indent * 4))) - 10),
                        }}>
                        ${this.state.priceMinCurrent}
                    </Text>
                    <Text
                        style={{color: '#ffffff', fontSize: fontSizes.description, position: 'absolute',
                            right: ((windowW - (indent * 4)) - ((this.state.priceMaxCurrent / this.state.priceMax) * (windowW - (indent * 4))) - 10),
                        }}>${this.state.priceMaxCurrent}</Text>
                </View>

                <ButtonOrange title={'APPLY FILTERS'} style={{width:'100%'}} onPress={this.props.onApplyClick} />
            </LinearGradient>
        );
    }
}

export default Filter;