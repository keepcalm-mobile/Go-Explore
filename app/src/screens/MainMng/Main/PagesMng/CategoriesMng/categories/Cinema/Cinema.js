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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {indent, windowW} from '../../../../../../../styles';
import colors from '../../../../../../../styles/colors';
import CarouselPersons from '../../../../../../../components/CarouselPersons';
import Separator from '../../../../../../../../assets/serviceIcons/separator.svg';
import {TextInput} from "react-native-gesture-handler";

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

    onPlayBtnClick = () => {

    };


    header = (iType, iData) => {
        const {image, title, rating, tags, url} = iData;
        return (
            <View key={iType + 'HeaderKey'} style={s.header}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} progressiveRenderingEnabled={true}/>
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
    );

    overview = (iData) => (
        <View style={s.tabCnt}>
            <Text style={s.overviewDesc}> {iData.description} </Text>
            {this._infoCnt(iData.info)}
            <CarouselPersons items={iData.cast} title="CAST"/>
            <CarouselPersons items={iData.crew} title="CREW"/>
            {this._infoCnt(iData.rating)}
        </View>
    );



    _cinemaItem = (item, index) => {
        const {image} = item;
        return (
            <View key={index} style={s.cinemaSlide}>
                <Image resizeMode={'cover'} style={s.cinemaItemImage} source={{uri: image}} progressiveRenderingEnabled={true}/>
            </View>
        );
    };


    cinema = (iData) => (
        <View style={s.tabCnt}>
            <Text style={s.cinemaTitle}>Experience</Text>

            <ScrollView horizontal={true}
                        pinchGestureEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={s.cinemaSlider}>

                {iData.map( (item, key) => { return this._cinemaItem(item, key); })}
            </ScrollView>
        </View>
    );

    // _commentItem = (item, index) => {
    //     const {user, date, rating, text} = item;
    //     return (
    //         <View key={index} style={s.commentItem}>
    //             <View style={s.commentItemTop}>
    //                 <Image resizeMode={'cover'} style={s.commentImage} source={{uri: user.image}} progressiveRenderingEnabled={true}/>
    //                 <View>
    //                     <Text style={s.commentName}>{user.name}</Text>
    //                     <Rating editable={false} max={5} rating={rating} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
    //                 </View>
    //                 <Text style={s.commentDate}>{date}</Text>
    //             </View>
    //             <Text style={s.commentText}>{text}</Text>
    //         </View>
    //     );
    // };

    _showAllComments() {
        console.log(">>>>> SHOW ALL COMMENTS");
    }

    _commentItem = (iData, iId) => {
        let list = [];
        const length = iData.length > 2 ? 2 : iData.length;

        for (let i = 0; i < length; i++){
            const {user, date, rating, text} = iData[i];
            list.push(
                <View key={iId + i.toString()} style={s.commentItem}>
                    <View style={s.commentItemTop}>
                        <Image resizeMode={'cover'} style={s.commentImage} source={{uri: user.image}} progressiveRenderingEnabled={true}/>
                        <View>
                            <Text style={s.commentName}>{user.name}</Text>
                            <Rating editable={false} max={5} rating={rating} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                        </View>
                        <Text style={s.commentDate}>{date}</Text>
                    </View>
                    <Text style={s.commentText}>{text}</Text>
                </View>
            );
            if (i !== length - 1){
                list.push(<Separator width={windowW} style={s.separator} key={iId + i.toString() + 'SeparatorKey'}/>);
            }
        }

        if (iData.length > 2){
            list.push(<ButtonBlack key={iId} onPress={this._showAllComments} title={'VIEW ALL REVIEWS'} titleStyle={s.blackButtonTitle}/>);
        }
        return list;
    };

    _showAllComments = () => {
        console.log(">>>>> SHOW ALL COMMENTS");
    };

    _inputArea = () => {
        return (
           <View style={s.inputArea}>
               <View style={s.commentItemTop}>
                   <Image resizeMode={'cover'} style={s.commentImage} source={{uri: 'https://naxlabel.mobi/img/portfolio/cabin.png'}} progressiveRenderingEnabled={true}/>
                   <View>
                       <Text style={s.commentName}>{'Richard'}</Text>
                       <Rating editable={true} max={5} rating={this.state.rateValue} onRate={(rateValue)=>this.setState({rateValue})} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                   </View>
               </View>
               <View style={s.inputTextCnt} >
                   <TextInput
                       ref={(input) => { this.messageField = input; }}
                       style={s.inputText}
                       placeholder="Write a comment..."
                       placeholderTextColor={'#B7B7B7'}
                       onChangeText={(comment2) => this.setState({comment2})}
                       multiline={true}
                       numberOfLines={4}
                       maxLength={174}
                       value={this.state.comment2}
                   />
               </View>
               <ButtonOrange onPress={this._showAllComments} title={'SUBMIT'} style={{marginHorizontal:0}}/>
           </View>
        );
    };

    comments = (iData) => (
        <View style={s.tabCnt}>
            {/*{iData.map( (item, key) => { return this._commentItem(item, key); })}*/}
            {this._commentItem(iData, 'commentItem')}
            {this._inputArea()}
        </View>
    );

    explore = (iData) => (
        <View style={s.tabCnt} />
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
