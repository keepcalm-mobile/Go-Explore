import type {Props} from 'react-native/Libraries/Components/View/View';
import {ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Item from '../SelectableItems/Item';

class ExperienceSelector extends React.Component<Props> {
    static propTypes = {
        type: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = { };
        this.items = {};
    }

    componentWillUnmount(): void {
        this.allItem = null;
        for (let prop in this.items) this.items[prop] = null;
        this.items = null;
    }

    get value() {
        let items = [];
        for (let prop in this.items) {
            if (this.items[prop] && this.items[prop].isActive) items.push(this.items[prop].label);
        }
        return {[this.props.type]:items};
    }

    get _activatedNum() : Number{
        let num = 0;
        for (let prop in this.items) {
            if(this.items[prop] && this.items[prop].isActive) num++;
        }
        return num;
    }

    onItemClick = (iId) => {
        if (iId === -1) {
            for (let prop in this.items) if(this.items[prop]) this.items[prop].isActive = false;
        } else if (this.allItem)  {
            this.allItem.isActive = !this._activatedNum;
        }

        if (this.props.onChange) {
            this.props.onChange(this.value[this.props.type]);
        }
    };

    onItemRef = (iItem, iID, iIndex) => {
        if (this.items) {
            this.items[iID] = iItem;
        }
        if (iIndex === this.props.data.length - 1 ) {
            if (this.allItem && !this._activatedNum) this.allItem.isActive = true;
            if (this.props.onChange) this.props.onChange(this.value[this.props.type]);
        }
    };

    render() {
        const {data} = this.props;
        if (!data || data.length <= 1) return null;

        return (
            <ScrollView horizontal={true}
                removeClippedSubviews={false}
                pinchGestureEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.container}>
                <>
                    <Item key={'allExpKey'} id={-1} data={{label:'All Experience', active: true }} onPress={ this.onItemClick } style={s.firstItem} ref={ c => this.allItem = c } />
                    {data.map( (item, key) => (
                        <Item key={item + 'Key'} id={item + 'Key'} data={{label:item, active: false }} onPress={ this.onItemClick } ref={ c => this.onItemRef(c, item + 'Key', key) } />
                    ))}
                </>
            </ScrollView>
        );
    }
}

export default ExperienceSelector;
