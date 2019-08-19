import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../../../../../../utils/resize';
import Rating from '../../../../../../../components/Rating';
import ButtonBlack from '../../../../../../../components/ButtonBlack';
import IconFilter from '../../../../../../../../assets/serviceIcons/playIcon.svg';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {indent, windowW} from '../../../../../../../styles';
import colors from '../../../../../../../styles/colors';
import CarouselPersons from '../../../../../../../components/CarouselPersons';
import Separator from '../../../../../../../../assets/serviceIcons/separator.svg';
import {TextInput} from "react-native-gesture-handler";
import {CinemaOverview, CinemaGallery, Comments, Explore} from '../../subTabs';

class Cinema extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'overview', title: 'OVERVIEW' },
                { key: 'cinema', title: 'CINEMA' },
                { key: 'comments', title: 'COMMENTS'},
                { key: 'explore', title: 'EXPLORE'},
            ],
            comment: '',
            comment2: '',
            rateValue: 0.0,
        };
    }

    onPlayBtnPress = () => {

    };

    onBookTicketPress = () => {

    };


    header = (iType, iData) => {
        const {image, title, rating, tags, url} = iData;
        return (
            <View key={iType + 'HeaderKey'} style={s.header}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} progressiveRenderingEnabled={true}/>
                <LinearGradient colors={['#00000000', '#000000CC', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.linearGradient} />

                <View style={s.titleCnt}>
                    <Text style={s.title}>{title}</Text>
                    <TouchableOpacity onPress = {this.onPlayBtnPress} activeOpacity={0.5} style={s.rightBtn}>
                        <IconFilter width={scale(40)} height={scale(40)}/>
                    </TouchableOpacity>
                </View>
                <View style={s.ratingCnt}>
                    <Rating editable={false} max={5} rating={rating.value} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                    <Text style={s.ratingInfo}>{rating.count.toString() + ' Reviews'}</Text>
                </View>
                <View style={s.tagsCnt}>
                    {tags.map( (item, key) => { return (
                        <View key={key} style={s.tagCnt}>
                            <Text style={s.tagTxt}> {tags[key].toString()} </Text>
                        </View>
                    ); })}
                </View>
            </View>
        );
    };


    renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return <CinemaOverview data={this.props.data.overview}/>;
            case 'cinema':
                return <CinemaGallery data={this.props.data.cinema}/>;
            case 'comments':
                return <Comments data={this.props.data.comments}/>;
            case 'explore':
                return <Explore data={this.props.data.explore}/>;
            default:
                return null;
        }
    };

    render() {
        const {type, header, overview, cinema, comments, explore} = this.props.data;

        return (
            <ScrollView contentContainerStyle={s.container} >
                {this.header(type, header)}
                <ButtonOrange onPress={this.onBookTicketPress} title={'BOOK TICKET'}/>
                <TabView
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: windowW }}
                    renderTabBar = {props =>
                        <TabBar
                            {...props}
                            style={{ backgroundColor: 'transparent' }}
                            labelStyle = {s.tabLabel}
                            // renderLabel={({ route, focused, color }) => (
                            //     <Text style={s.tabLabel}> {route.title} </Text>
                            // )}
                            indicatorStyle={{ backgroundColor: colors.darkMain, paddingHorizontal:indent}}
                            // renderIndicator = {props => (<Animated.View {...props}> <TabIndicator width={scale(70)} height={scale(2)}/> </Animated.View>) }
                        />
                    }
                />
            </ScrollView>
        );
    }
}

export default Cinema;

{/*    {SceneMap({*/}
{/*    overview: () => this.overview(overview),*/}
{/*    cinema: () => this.cinema(cinema),*/}
{/*    comments: () => this.comments(comments),*/}
{/*    explore: () => this.explore(explore),*/}
{/*})}*/}

{/*<ScrollView contentContainerStyle={s.container} >*/}
{/*    {this.header(type, header)}*/}
{/*    <ButtonOrange onPress={this._logOut} title={'BOOK TICKET'}/>*/}
{/*</ScrollView>*/}
