import React from 'react';
import {Text, View, TextInput, Image, Picker, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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

    constructor(props) {
        super(props);

        this.state = {
            scrollEnabled: true,
            keywordText: '',

            //TODO: user entered keywords:
            keywordsList: [
                'Superhero',
                'Thor'
            ],
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
            ],
            priceMin: 0,
            priceMax: 100,
            priceMinCurrent: 0,
            priceMaxCurrent: 57
        };
    }

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    addKeyword(word) {

        if (word === '')
            return;

        let list = [...this.state.keywordsList];
        list = list.concat(word);

        this.setState({
            keywordsList: list
        });
    }

    removeKeyword(title) {

        // ToastAndroid.showWithGravity(
        //     'title: ' + title + '  keywordsList = ' + this.state.keywordsList,
        //     ToastAndroid.LONG,
        //     ToastAndroid.CENTER,
        // );

        let list = [...this.state.keywordsList];

        for(let i = 0; i < list.length; i++){
            if ( list[i] === title) {
                list.splice(i, 1);
            }
        }

        this.setState({
            keywordsList: list
        });
    }

    toggleGenreItem(title) {

        let list = [...this.state.genres];
        let item = null;

        for(let i = 0; i < list.length; i++){
            if ( list[i].text === title) {
                list[i].active = !list[i].active;
                item = list[i];
            }
        }

        this.setState({
            genres: list
        });

        // ToastAndroid.showWithGravity(
        //     'genre text: ' + item.text + '  active = ' + item.active,
        //     ToastAndroid.LONG,
        //     ToastAndroid.CENTER,
        // );
    }

    toggleExperienceItem(title) {

        let list = [...this.state.experience];
        let item = null;

        for(let i = 0; i < list.length; i++){
            if ( list[i].text === title) {
                list[i].active = !list[i].active;
                item = list[i];
            }
        }

        this.setState({
            experience: list
        });
    }

    render() {

        let keywords = []
        for (let i = 0; i < this.state.keywordsList.length; i++)
        {
            let index = i;
            keywords.push(<Keyword key={this.state.keywordsList[i]} title={this.state.keywordsList[i]} editable={true} onDelete={(title) => {this.removeKeyword(title);}} />);
        }

        let genres = []
        for (let i = 0; i < this.state.genres.length; i++)
        {
            genres.push(<Keyword key={i} title={this.state.genres[i].text} editable={false} toggle={true} onPress={() => {this.toggleGenreItem(this.state.genres[i].text);}} fontSize={fontSizes.big} active={this.state.genres[i].active} />);
        }

        let experience = []
        for (let i = 0; i < this.state.experience.length; i++)
        {
            experience.push(<Keyword key={i} title={this.state.experience[i].text} editable={false} toggle={true} onPress={() => {this.toggleExperienceItem(this.state.genres[i].text);}} fontSize={fontSizes.big} active={this.state.experience[i].active} />);
        }

        let languages = []
        for (let i = 0; i < this.state.languages.length; i++)
        {
            languages.push(<Keyword key={i} title={this.state.languages[i]} editable={true} />);
        }

        return (
            <View style={s.container}>
                <ScrollView style={s.mainScroll} contentContainerStyle={s.mainScrollContainer} scrollEnabled={this.state.scrollEnabled}>
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
                               onEndEditing={(e) => {
                                   this.addKeyword(e.nativeEvent.text);
                                   this.setState({keywordText: ''});
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
                        <View style={{alignSelf: 'flex-start'}}>
                            <RatingStars rating={3} ratingStyle={'circle'} style={{alignSelf: 'flex-start'}} />
                        </View>

                        <HorizontalLine />
                        <Text style={s.filtersCategoryHeader}>Genre</Text>
                        <View style={s.baseKeywordsView}>
                            {genres}
                        </View>

                        <View style={{width: '100%', flexDirection: 'row', marginTop: -15}}>
                            <HorizontalLine />
                        </View>
                        <Text style={s.filtersCategoryHeader}>Experience</Text>
                        <View style={s.baseKeywordsView}>
                            {experience}
                        </View>

                        <View style={{width: '100%', flexDirection: 'row', marginTop: -15}}>
                            <HorizontalLine />
                        </View>
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
                        <CircleValues values={this.state.ages} />

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
                                trackStyle={{backgroundColor: '#ffffff'}}
                                selectedStyle={{backgroundColor: colors.border}}
                                containerStyle={{width: '100%'}}

                                onValuesChange={(values) => {
                                    this.setState({
                                        priceMinCurrent: values[0],
                                        priceMaxCurrent: values[1]
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
                            <Text style={{color: '#ffffff', fontSize: fontSizes.description, position: 'absolute', left: 0}}>${this.state.priceMinCurrent}</Text>
                            <Text style={{color: '#ffffff', fontSize: fontSizes.description, position: 'absolute', right: 0}}>${this.state.priceMaxCurrent}</Text>
                        </View>

                        <View style={{flexDirection: 'row', width: '100%'}}>
                            <ButtonOrange
                                title={'APPLY FILTERS'}
                                style={{flex: 1, marginLeft: -indent, marginRight: -indent}}
                                onPress={() => {

                                }}
                            />
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
