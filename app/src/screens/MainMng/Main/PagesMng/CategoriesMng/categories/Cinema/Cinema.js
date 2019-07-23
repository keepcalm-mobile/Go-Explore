import React from 'react';
import {Text, View, TextInput, Image, Picker, ScrollView} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import LinearGradient from 'react-native-linear-gradient';

//TODO: load image from server?
import MoviePlaceholder from '../../../../../../../../assets/cinema/avengers.png';
import IconClose from '../../../../../../../../assets/topIcons/closeIcon.svg';
import {scale} from "../../../../../../../utils/resize";

import Keyword from './components/keyword';

class Cinema extends React.Component<Props> {
    state = {
        keywordText: '',

        //TODO: user entered keywords:
        keywordsList: [
            {
                id: 0,
                text: 'Superhero'
            },
            {
                id: 1,
                text: 'Thor'
            }
        ],
        userKeywords: null,
        location: 'Mall of Qatar - Doha'
    };

    constructor(props) {
        super(props);

        this.state.userKeywords = this.state.keywordsList.map(info => (
            <Keyword key={info.id} title={info.text} />
        ));
    }

    render() {
        return (
            <View style={s.container}>
                <ScrollView style={s.mainScroll} contentContainerStyle={s.mainScrollContainer}>
                    <Image source={MoviePlaceholder} style={s.poster} />
                    <View style={s.filtersContainer}>
                        <Text style={s.filtersHeader}>Filters</Text>
                        <Text style={s.filtersCategoryHeader}>Keywords</Text>

                        <View style={s.keywordsContainer}>
                            {this.state.userKeywords}
                            <TextInput
                               style={s.keywordsInput}
                               value={this.state.keywordText}
                               placeholder={'Type a keyword here...'}
                               placeholderTextColor={'#ffffff'}
                               onChangeText={(keywordText) => this.setState({keywordText})}
                               value={this.state.keywordText}
                               onEndEditing={(text) => {

                                   let list = [...this.state.keywordsList];
                                   list = list.concat({id: this.state.keywordsList.length, text: text});

                                   this.setState(state => {

                                       // const keywords = list.map(info => (
                                       //     <Keyword key={info.id} title={info.text} />
                                       // ));

                                       return {
                                           keywordsList: list,
                                           //userKeywords: null
                                       }
                                   });
                               }}
                            />
                        </View>

                        <View style={s.line}></View>
                        <Text style={s.filtersCategoryHeader}>Location</Text>
                        <View style={s.locationPickerContainer}>
                            <Picker
                                selectedValue={this.state.location}
                                style={s.locationPicker}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({location: itemValue})
                                }>
                                <Picker.Item label="Mall of Qatar - Doha" value="place0" />
                                <Picker.Item label="Another Place 1" value="place1" />
                                <Picker.Item label="Another Place 2" value="place2" />
                            </Picker>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _logOut = async () => {
        const resp = await logOut();
        if (Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

export default Cinema;
