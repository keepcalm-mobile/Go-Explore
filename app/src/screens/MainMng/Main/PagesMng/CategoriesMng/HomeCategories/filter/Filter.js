import React from 'react';
import {Text, View, TextInput, Picker} from 'react-native';
import s from './style';
import {colors, doubleIndent} from '../../../../../../../styles';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';
import {ButtonOrange, HorizontalLine} from '../../../../../../../components';

class Filter extends React.Component<Props> {
    static propTypes = {
        onApplyClick: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            item: PropTypes.func.isRequired,
        })).isRequired,
        filters: PropTypes.object.isRequired,
        presets: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    onApplyClick = () => {
        let presets = {};
        this._items.forEach((item, index, array) => {
            presets = {...presets, ...item.value};
        });
        this.props.onApplyClick(presets);
    };

    render() {
        const {items, presets, filters} = this.props;
        this._items = [];

        return (
            <LinearGradient style={s.filtersContainer} colors={[colors.darkSecondary, colors.lightSecondary]} useAngle={true} angle={92} angleCenter={{ x: 0.5, y: 0.5}}>
                <Text style={s.filtersHeader}>Filters</Text>

                {items.map( (item, key) => (
                    <>
                         <Text key={item.id + 'TitleKey'} style={s.filtersCategoryHeader}>{item.id}</Text>
                         <item.item key={item.id + 'ItemKey'} ref={c => this._items.push(c)} type={item.id} presets={presets ? presets[item.id] : null} data={filters[item.id]}/>

                         {key !== items.length - 1 && <HorizontalLine key={item.id + 'LineKey'}/>}
                    </>
                ))}

                <ButtonOrange title={'APPLY FILTERS'} style={s.applyBtn} onPress={this.onApplyClick} />
            </LinearGradient>
        );
    }
}

export default Filter;
