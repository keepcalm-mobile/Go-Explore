import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../../../../../../utils/resize';
import Rating from '../../../../../../../components/Rating';
import ButtonBlack from '../../../../../../../components/ButtonBlack';
import IconFilter from '../../../../../../../../assets/serviceIcons/playIcon.svg';
import TabIndicator from '../../../../../../../../assets/serviceIcons/tabIndicator.svg';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {indent, windowW} from '../../../../../../../styles';
import colors from '../../../../../../../styles/colors';
import CarouselPersons from "../../../../../../../components/CarouselPersons";

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
        };
    }

    onPlayBtnClick = () => {

    };


    header = (iType, iData) => {
        const {image, title, rating, tags, url} = iData;
        return (
            <View key={iType + 'HeaderKey'} style={s.header}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} />
                <LinearGradient colors={['#00000000', '#000000CC', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.linearGradient} />

                <View style={s.titleCnt}>
                    <Text style={s.title}>{title}</Text>
                    <TouchableOpacity onPress = {this.onPlayBtnClick} activeOpacity={0.5} style={s.rightBtn}>
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


    _infoCnt = (iData) => (
        <View style={s.overviewInfoCnt}>
            {iData.map( (item, key) => { return (
                <View key={key} style={s.overviewInfoItem}>
                    <Text style={s.overviewInfoTitle}> {iData[key].value.toString()} </Text>
                    <Text style={s.overviewInfoSubtitle}> {iData[key].title.toString()} </Text>
                </View>
            );})}
        </View>
    )


    overview = (iData) => (
        <View style={s.tabCnt}>
            <Text style={s.overviewDesc}> {iData.description} </Text>
            {this._infoCnt(iData.info)}
            <CarouselPersons items={iData.cast} title="CAST"/>
            <CarouselPersons items={iData.crew} title="CREW"/>
            {this._infoCnt(iData.rating)}
        </View>
    );

    cinema = (iData) => (
        <View style={s.tabCnt}>
        </View>
    );

    comments = (iData) => (
        <View style={s.tabCnt}>
        </View>
    );

    explore = (iData) => (
        <View style={s.tabCnt}>
        </View>
    );


    render() {
        const {type, header, overview, cinema, comments, explore} = this.props.data;

        return (
            <ScrollView contentContainerStyle={s.container} >
                {this.header(type, header)}
                <ButtonOrange onPress={this._logOut} title={'BOOK TICKET'}/>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        overview: () => this.overview(overview),
                        cinema: () => this.cinema(cinema),
                        comments: () => this.comments(comments),
                        explore: () => this.explore(explore),
                    })}
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

    _logOut = async () => {
        const resp = await logOut();
        if (Auth.AUTH_LOGOUT === resp) {
            this.props.navigation.navigate('Auth');
        }
        // await AsyncStorage.clear();
    };
}

export default Cinema;

{/*<ScrollView contentContainerStyle={s.container} >*/}
{/*    {this.header(type, header)}*/}
{/*    <ButtonOrange onPress={this._logOut} title={'BOOK TICKET'}/>*/}
{/*</ScrollView>*/}
