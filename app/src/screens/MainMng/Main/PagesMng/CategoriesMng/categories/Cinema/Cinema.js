import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, Linking, Platform} from 'react-native';
import s from './style';
import YouTube, { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {indent, windowW} from '../../../../../../../styles';
import colors from '../../../../../../../styles/colors';
import {CinemaOverview, CinemaGallery, Comments, Explore} from '../../subTabs';
import ScrollablePage from '../../../ScrollablePage';
import {screens} from '../../../../../../../constants';
import ItemHeader from '../../subTabs/ItemHeader';
import {OverlayLoader} from '../../../../../../../components';

class Cinema extends ScrollablePage {
    constructor(props) {
        const itemId = props.navigation.state.params.itemId;
        props.getItem(itemId, screens.Cinema);

        super(props);

        this.state = {
            curId: itemId,
            index: 0,
            isPlayerOpen: false,
            videoID: '',
            routes: [
                { key: 'overview', title: 'OVERVIEW' },
                { key: 'cinema', title: 'CINEMA' },
                { key: 'comments', title: 'COMMENTS'},
                { key: 'explore', title: 'EXPLORE'},
            ],
        };
    }

    getYouTubeVideoId = (url) => {
        const regExp = /^.*((www.youtube.com\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\??v?=?))([^#&\?]*).*/

        const match = url.match(regExp);

        if (match && match[7].length === 11) {
            return match[7];
        }
        return false;
    };

    onPlayBtnPress = () => {
        // Linking.canOpenURL(this.props.data.header.videoUrl).then(supported => {
        //     if (supported) {
        //         Linking.openURL(this.props.data.header.videoUrl);
        //     } else {
        //         console.log("Don't know how to open URI: " + this.props.data.header.videoUrl);
        //     }
        // });
        const videoID = this.getYouTubeVideoId(this.props.data.header.videoUrl);
        if (videoID){
            if (Platform.OS === 'android') {
                YouTubeStandaloneAndroid.playVideo({
                    apiKey: 'AIzaSyD8hmW3E184MjjKIdhdKK1IWiClEdl5iWw',
                    videoId: videoID,
                    autoplay: true,
                })
                    .then(() => console.log('Standalone Player Exited'))
                    .catch(errorMessage => console.error(errorMessage));
            } else {
                YouTubeStandaloneIOS.playVideo(videoID)
                    .then(message => console.log(message))
                    .catch(errorMessage => console.error(errorMessage));
            }
        }
    };

    onBookTicketPress = () => {
        // this.props.navigation.navigate({ routeName: screens.BookingTickets, params:{itemId:'HO00005022'}, key:screens.BookingTickets + '0003' + 'Key'});
        const movie_ID = this.props.data.movieId ? this.props.data.movieId : this.state.curId;
        this.props.navigation.navigate({ routeName: screens.BookingTickets, params:{itemId:movie_ID, tempHeader:this.props.data.header}, key:screens.BookingTickets + this.state.curId + 'Key'});
    };


    renderScene = ({ route }) => {
        switch (route.key) {
            case 'overview':
                return <CinemaOverview data={this.props.data.overview}/>;
            case 'cinema':
                return <CinemaGallery data={this.props.data.cinema.image}/>;
            case 'comments':
                return <Comments data={this.props.data.comments}/>;
            case 'explore':
                return <Explore data={this.props.data.explore}/>;
            default:
                return null;
        }
    };

    render() {
        if (!this.props.data) {
            return ( <View style={s.containerEmpty} /> );
        }

        const { type, header, movieId} = this.props.data;

        return (
            <ScrollView contentContainerStyle={s.container} onScroll={this.onScroll}>
                <ItemHeader type={type} data={header} onPress={this.onPlayBtnPress}/>
                {movieId ? <ButtonOrange onPress={this.onBookTicketPress} title={'COMING SOON (BOOK TICKET)'}/> : null}
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
