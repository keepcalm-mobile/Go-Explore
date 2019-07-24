import React from 'react';
import {Text, View, TextInput, Image, Picker, TouchableOpacity, ScrollView} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import LinearGradient from 'react-native-linear-gradient';
import RangeSlider from 'rn-range-slider';

//TODO: load image from server?
import MoviePlaceholder from '../../../../../../../../assets/cinema/avengers.png';
import IconClose from '../../../../../../../../assets/topIcons/closeIcon.svg';
import DropdownArrow from '../../../../../../../../assets/dropdownArrow.svg';
import {scale} from "../../../../../../../utils/resize";

import CircleValues from '../../../../../../../components/CircleValues/CircleValues';
import HorizontalLine from '../../../../../../../components/HorizontalLine/HorizontalLine';
import Keyword from '../../../../../../../components/Keyword/Keyword';
import RatingStars from '../../../../../../../components/Rating/RatingStars';
import defaultStyle, { colors, fontNames, fontSizes, indent} from '../../../../../../../styles';

class Cinema extends React.Component<Props> {
    state = {
        keywordText: '',

        //TODO: user entered keywords:
        keywordsList: [
            'Superhero',
            'Thor'
        ],
        //userKeywords: null,
        location: 'Mall of Qatar - Doha',
        genres: [
            { text: 'Action', active: false },
            { text: 'Adult', active: false },
            { text: 'Adventure', active: false },
            { text: 'Avant-garde/Experimental', active: false },
            { text: 'Comedy', active: true },
            { text: 'Children\'s/Family', active: false },
            { text: 'Comedy Drama', active: false },
            { text: 'Crime', active: false },
            { text: 'Drama', active: false },
            { text: 'Epic', active: true },
            { text: 'Fantasy', active: false },
            { text: 'Historical Film', active: false },
            { text: 'Horror', active: false },
            { text: 'Musical', active: false },
            { text: 'Mystery', active: false },
            { text: 'Romance', active: false },
            { text: 'Science Fiction', active: false },
            { text: 'Spy Film', active: false },
            { text: 'War', active: false },
            { text: 'Western', active: false }
        ],
        experience: [
            { text: 'All Experience', active: true },
            { text: '2D', active: false },
            { text: '2D IMAX', active: false },
            { text: '3D', active: false },
            { text: '3D IMAX', active: false }
        ],
        languages: [
            'English',
            'Arabian'
        ],
        ages: [
            { text: '+0', active: false },
            { text: '+6', active: true },
            { text: '+12', active: false },
            { text: '+16', active: false },
            { text: '+18', active: false },
        ]
    };

    constructor(props) {
        super(props);

        // this.state.userKeywords = this.state.keywordsList.map(info => (
        //     <Keyword key={info.id} title={info.text} />
        // ));
    }

    render() {

        let keywords = []
        for (let i = 0; i < this.state.keywordsList.length; i++)
        {
            keywords.push(<Keyword title={this.state.keywordsList[i]} editable={true} />);
        }

        let genres = []
        for (let i = 0; i < this.state.genres.length; i++)
        {
            genres.push(<Keyword title={this.state.genres[i].text} editable={false} fontSize={fontSizes.big} active={this.state.genres[i].active} />);
        }

        let experience = []
        for (let i = 0; i < this.state.experience.length; i++)
        {
            experience.push(<Keyword title={this.state.experience[i].text} editable={false} fontSize={fontSizes.big} active={this.state.experience[i].active} />);
        }

        let languages = []
        for (let i = 0; i < this.state.languages.length; i++)
        {
            languages.push(<Keyword title={this.state.languages[i]} editable={true} />);
        }

        return (
            <View style={s.container}>
                <ScrollView style={s.mainScroll} contentContainerStyle={s.mainScrollContainer}>
                    <Image source={MoviePlaceholder} style={s.poster} />
                    <LinearGradient style={s.filtersContainer} colors={['#000000', '#3a3a3a']} useAngle={true} angle={95} angleCenter={{ x: 0.3, y: 0.8}}>
                        <Text style={s.filtersHeader}>Filters</Text>
                        <Text style={s.filtersCategoryHeader}>Keywords</Text>

                        <View style={s.keywordsContainer}>
                            {keywords}
                            <TextInput
                               style={s.keywordsInput}
                               value={this.state.keywordText}
                               placeholder={'Type a keyword here...'}
                               placeholderTextColor={'#ffffff'}
                               onChangeText={(keywordText) => this.setState({keywordText})}
                               value={this.state.keywordText}
                               onEndEditing={(text) => {

                                   // let list = [...this.state.keywordsList];
                                   // list = list.concat({id: this.state.keywordsList.length, text: text});
                                   //
                                   // this.setState({
                                   //     keywordsList: list
                                   // });
                               }}
                            />
                        </View>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Location</Text>
                        <LinearGradient style={s.locationPickerContainer} colors={['#000000', '#3a3a3a']} useAngle={true} angle={90} angleCenter={{ x: 0.5, y: 0.3}}>
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
                        </LinearGradient>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Rating</Text>
                        <View style={{alignSelf: 'flex-start', marginLeft: indent}}>
                            <RatingStars rating={3} ratingStyle={'circle'} style={{alignSelf: 'flex-start'}} />
                        </View>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Genre</Text>
                        <View style={s.baseKeywordsView}>
                            {genres}
                        </View>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Experience</Text>
                        <View style={s.baseKeywordsView}>
                            {experience}
                        </View>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Languages</Text>
                        <View style={{paddingLeft: indent, paddingRight: indent, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <View style={s.languagesContainer}>
                                {languages}
                                <View style={s.dropdownTouchArea}>
                                    <DropdownArrow />
                                </View>
                            </View>
                        </View>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Age</Text>
                        <CircleValues values={this.state.ages} />

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Price</Text>
                        <View style={{flexDirection: 'row', paddingLeft: indent, paddingRight: 15, width: '100%'}}>
                            <RangeSlider
                                style={{width: '100%', height: 80}}
                                gravity={'center'}
                                min={200}
                                max={1000}
                                step={20}
                                selectionColor="#3df"
                                blankColor="#f618"
                                onValueChanged={(low, high, fromUser) => {
                                    //this.setState({rangeLow: low, rangeHigh: high})
                                }}
                            />
                        </View>

                        <View style={{flexDirection: 'row', width: '100%', height: 56, paddingLeft: indent, paddingRight: indent, marginTop: 65}}>
                            <TouchableOpacity style={s.applyButton}>
                                <LinearGradient style={{width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}} colors={['#ff9e18', '#f8df8d']}>
                                    <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>APPLY FILTERS</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
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
