import type {Props} from 'react-native/Libraries/Components/View/View';
import {TextInput, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import s from './style';
import Item from './Item';

class Keywords extends React.Component<Props> {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            keywordText:'',
            keywordsList: [...props.data],
        };
    }

    addKeyword(word) {
        if (word === '') {return;}

        let list = [...this.state.keywordsList];
        list = list.concat(word);

        this.setState({keywordsList: list});
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


    render() {
        // const {image, text} = this.props.data;
        return (
            <View style={s.keywordsContainer}>
                {this.keywords()}
                <TextInput
                    style={s.keywordsInput}
                    placeholder={'Type a keyword here...'}
                    placeholderTextColor={'#ffffff'}
                    onChangeText={(keywordText) => this.setState({keywordText})}
                    value={this.state.keywordText}
                    onEndEditing={(e) => {
                        this.addKeyword(e.nativeEvent.text);
                        this.setState({keywordText: ''});
                    }}
                />
            </View>
        );
    }
}

export default Keywords;
