import type {Props} from 'react-native/Libraries/Components/View/View';
import {TextInput, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Item from './Item';

class Keywords extends React.Component<Props> {
    static propTypes = {
        type: PropTypes.string.isRequired,
        presets: PropTypes.array,
    };

    static defaultProps = {
        presets: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            keywordText:'',
            keywordsList: props.presets ? [...props.presets] : [],
        };
        console.log('<><><><><><><><><> : ' + props.type);
    }

    get value() {
        return {[this.props.type]:this.state.keywordsList};
    }

    removeKeyword = (iId) => {
        let list = [...this.state.keywordsList];
        list.splice(iId, 1);

        this.setState({ keywordsList: list});
    };


    keywords = () => {
        let keywords = [];
        this.state.keywordsList.forEach((item, index, array) => {
            keywords.push(<Item key={item + 'Key'} id={index}  title={item} onPress={ this.removeKeyword } />);
        });
        return keywords;
    };


    onEndEditing = (e) => {
        if (e.nativeEvent.text === '') {
            this.setState({keywordText: ''});
        } else {
            this.setState({keywordText: '', keywordsList: this.state.keywordsList.concat(e.nativeEvent.text)});
        }
    };


    onChangeText = (keywordText) => {
        this.setState({keywordText});
    };

    render() {

        return (
            <View style={s.keywordsContainer}>
                {this.keywords()}
                <TextInput
                    style={s.keywordsInput}
                    placeholder={'Type a keyword here...'}
                    placeholderTextColor={'#ffffff'}
                    value={this.state.keywordText}
                    onChangeText={this.onChangeText}
                    onEndEditing={this.onEndEditing}
                />
            </View>
        );
    }
}

export default Keywords;
