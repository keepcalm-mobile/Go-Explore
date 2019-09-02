import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, Linking} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../../components/ButtonOrange';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../../../../../../../utils/resize';
import Rating from '../../../../../../../../components/Rating';
import IconFilter from '../../../../../../../../../assets/serviceIcons/playIcon.svg';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {indent, windowW} from '../../../../../../../../styles';
import colors from '../../../../../../../../styles/colors';
import {CinemaOverview, CinemaGallery, Comments, Explore} from '../../../subTabs';
import ScrollablePage from '../../../../ScrollablePage';
import {Location} from "../../../../../../../../components/filters";

class BookTicket extends ScrollablePage {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    onPlayBtnPress = () => {
        Linking.canOpenURL(this.props.data.header.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.data.header.url);
            } else {
                console.log("Don't know how to open URI: " + this.props.data.header.url);
            }
        });
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


    // ren

    render() {
        const { type, header } = this.props.data;

        return (
            <ScrollView contentContainerStyle={s.container} onScroll={this.onScroll}>
                {this.header(type, header)}
                <View style={s.firstCnt}>
                    <Location type={'Location'} data={[{label:'Tawar Mall - Doha',value:'pos01'}, {label:'Souq Waqif - Doha',value:'pos02'}]}/>
                </View>
            </ScrollView>
        );
    }
}

export default BookTicket;

// {/*<ButtonOrange onPress={this.onBookTicketPress} title={'BOOK TICKET'}/>*/}
// {/*<TabView*/}
// {/*navigationState={this.state}*/}
// {/*renderScene={this.renderScene}*/}
// {/*onIndexChange={index => this.setState({ index })}*/}
// {/*initialLayout={{ width: windowW }}*/}
// {/*renderTabBar = {props =>*/}
// {/*<TabBar*/}
// {/*    {...props}*/}
// {/*    style={{ backgroundColor: 'transparent' }}*/}
// {/*    labelStyle = {s.tabLabel}*/}
// {/*    // renderLabel={({ route, focused, color }) => (*/}
// {/*    //     <Text style={s.tabLabel}> {route.title} </Text>*/}
// {/*    // )}*/}
// {/*    indicatorStyle={{ backgroundColor: colors.darkMain, paddingHorizontal:indent}}*/}
// {/*    // renderIndicator = {props => (<Animated.View {...props}> <TabIndicator width={scale(70)} height={scale(2)}/> </Animated.View>) }*/}
// {/*/>*/}
// {/*}*/}
// {/*/>*/}