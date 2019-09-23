import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, Linking} from 'react-native';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {scale} from '../../../../../../../../utils/resize';
import Rating from '../../../../../../../../components/Rating';
import IconFilter from '../../../../../../../../../assets/serviceIcons/playIcon.svg';
import ScrollablePage from '../../../../ScrollablePage';
import {HorizontalLine, Location, ExperienceSelector, CinemaDate, CinemaTime, CinemaTicketType} from '../../../../../../../../components';

class BookingTicket extends ScrollablePage {
    constructor(props) {
        const itemId = props.navigation.state.params.itemId;
        props.getCinemasData(itemId);

        super(props);

        this.state = {
            curId: itemId,
            possibleExperience:[],
            cinemaIndex:-1,
            dateIndex:-1,
            sessionId:-1,
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

    onLocationSelect = (iValue) => {
        let index = -1;
        if (iValue === '') {
            this._date.update(null);
        } else {
            index = this.props.data.findIndex(iItem => iItem.value === iValue);
            this._date.update(this.props.data[index].times);
        }
        this.generatePossibleValues(index, this._date.value);
    };

    onDateSelect = (iValue) => {
        if (this.state.cinemaIndex === -1){
            Toast.showWithGravity('SELECT LOCATION AT FIRST', Toast.SHORT, Toast.CENTER);
        } else {
            this._date.chosen = iValue;
            this.generatePossibleValues(this.state.cinemaIndex, this._date.value);
        }
    };

    generatePossibleValues = (iCinema, iDate) => {
        const dateIndex = iCinema === -1 ? iCinema : this.props.data[iCinema].times.findIndex(iItem => iItem.passingDate === iDate);
        let sortExperiences = {};
        let possExperiences = [];

        if (dateIndex !== -1) {
            this.props.data[iCinema].times[dateIndex].items.forEach(iItem => {
                sortExperiences[iItem.experience] = true;
            });

            for (let prop in sortExperiences) possExperiences.push(prop);
        }

        this.setState({cinemaIndex:iCinema, dateIndex:dateIndex, possibleExperience:possExperiences, sessionId : -1});
    };

    onExperienceChoose = (iValue) => {
        if (this._time) {
            this._time.filter = iValue;
        }
    };

    onTimeSelect = (iValue) => {
        console.log('> > T I M E  S E L E C T : ' + JSON.stringify(iValue));
        this.setState({sessionId : iValue.sessionId});
        // "cinemaId":"0033","movieId":"HO00005022","sessionDateTime":"2019-09-22T19:55:00","showdate":"22-09-2019","showtime":"07:55 PM","seatAvailable":"120","sessionId":"18130","screenName":"SCREEN 2","language":"English","experience":"IMAX 2D","isSeatAvailable":1
    };

    onConfirmTicketPress = (iValue) => {
        console.log('> > T I C K E T S : ' + iValue);
        if (iValue === ''){
            Toast.showWithGravity('CHOOSE YOUR SEAT TYPE', Toast.SHORT, Toast.CENTER);
        } else {
            console.log('C O N F I R M');
            // this.props.navigation.navigate({ routeName: screens.BookingTickets, params:{itemId:this.state.curId}, key:screens.BookingTickets + this.state.curId + 'Key'});
        }
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

    sessionsRender = () => {
        if (this.state.dateIndex !== -1){
            return (
                <>
                    <ExperienceSelector type={'experience'} data={this.state.possibleExperience} onChange={this.onExperienceChoose}/>
                    <CinemaTime data={this.props.data[this.state.cinemaIndex].times[this.state.dateIndex].items} onSelect={this.onTimeSelect} ref={c => this._time = c}/>
                </>
            );
        } else {
            return null;
        }
    };

    ticketTypeRender = () => {
        if (this.state.sessionId !== -1 && this.props.ticketTypes) {
            return (
                <CinemaTicketType data={this.props.ticketTypes} onConfirmPress={this.onConfirmTicketPress}/>
            );
        } else {
            return null;
        }
    };

    render() {
        const { header, data } = this.props;

        return (
            <ScrollView contentContainerStyle={s.container} onScroll={this.onScroll}>
                {this.header('Cinema', header)}
                {data.length ?
                    <>
                    <Location type={'Location'} data={data} onSelect={this.onLocationSelect} style={s.locationCnt} ref={c => this._location = c}/>
                    <CinemaDate data={data[0].times} onSelect={this.onDateSelect} ref={c => this._date = c}/>
                    <HorizontalLine/>
                    </>
                : null
                }
                {this.sessionsRender()}
                {this.ticketTypeRender()}
            </ScrollView>
        );
    }
}

export default BookingTicket;

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