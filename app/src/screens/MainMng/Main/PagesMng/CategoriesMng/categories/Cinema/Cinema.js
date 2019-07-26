import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import s from './style';
import ButtonOrange from '../../../../../../../components/ButtonOrange';
import {Auth, logOut} from '../../../../../../../api/Auth';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../../../../../../utils/resize';
import Rating from '../../../../../../../components/Rating';
import ButtonBlack from '../../../../../../../components/ButtonBlack';
const tempData = {
    type:'cinema',
    header:
        {
            image : 'https://naxlabel.mobi/img/portfolio/cabin.png',
            title : 'Avengers: Endgame',
            rating : {value:3.5, count:21},
            tags : ['PG 13', 'Action', '3 h 2 m'],
            url : 'https://youtu.be/TcMBFSGVi1c',
        },
    overview:
        {
            description : 'After the devastating events of Avengers:\nInfinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos\' actions and restore order to the universe.',
            info : [{value:'55K', title:'Watcher'}, {value:'25K', title:'Collected'}, {value:'58%', title:'Thoughts'}, {value:'107k', title:'Hoys'}],
            cast : [{title:'Robert Douney Jr.', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Chris Hemsworth', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Chris Evans', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Brie Larson', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Scarlett Johansson', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'}],
            crew : [{title:'Anthoney Russo', subTitle:'Director', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Joe Russo', subTitle:'Director', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Kevin Fegie', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'San Lee', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
                {title:'Scarlett Johansson', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'}],
            rating : [{title:'Metoscore', value:'Filmrating.com'}, {title:'Reviews', value:'734 user'}, {title:'Popularity', value:'26 | 5'}],
            tags : ['SPA', 'Health', 'Luxury'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'health',
        },
    cinema:
        [
            {image : 'https://naxlabel.mobi/img/portfolio/submarine.png'},//....
            {image : 'https://naxlabel.mobi/img/portfolio/submarine.png'},
            {image : 'https://naxlabel.mobi/img/portfolio/submarine.png'},
            {image : 'https://naxlabel.mobi/img/portfolio/submarine.png'},
            {image : 'https://naxlabel.mobi/img/portfolio/submarine.png'},
            {image : 'https://naxlabel.mobi/img/portfolio/submarine.png'},
        ],
    comments: [
        {
            user : {name:'Vannessa Wu', image:'https://naxlabel.mobi/img/portfolio/submarine.png'},
            date : '3 May  2019',
            rating: 3.5,
            text: 'The firs movie, I’dwatched when I was about 8 years old and fell in love whitj the characters and the world behind Vikings and dragons. It was a movie in my childhood that Iadmired and loved, as wellas the rest of my family.',
        },
        {
            user : {name:'Vannessa Wu', image:'https://naxlabel.mobi/img/portfolio/submarine.png'},
            date : '4 May  2019',
            rating: 5,
            text: 'The firs movie, I’dwatched when I was about 8 years old and fell in love whitj the characters and the world behind Vikings and dragons. It was a movie in my childhood that Iadmired and loved, as wellas the rest of my family.',
        }],
    explore:
        {
            image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
            text:'Tickets for live stage shows Cirque du Soleil \n' +
                'and go on sale starting today, Qatar National Tourism Council (QNTC) announced.\n' +
                '\n' +
                'The beloved characters are landing at Qatar National Convention Centre (QNCC) for a series of shows as part of the vibrant Summer in Qatar (SIQ) programme.\n' +
                '\n' +
                'Everyone’s favourite blue creatures, the ‘Smurfs’ Live on Stage – The Smurfs Save Spring’ will be on show from July 18 to 20, while Hello Kitty Live Fashion & Friends’ will delight children from July 25 to 27, both at Al Mayassa Theatre.\n' +
                '\n' +
                'Tickets for the two shows presented by QNTC in partnership with Alchemy Project are now on sale through tixbox.com with prices ranging from QR75 to QR275.',
        },
};

class Cinema extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    header = (iType, iData) => {
        console.log(">>>>>>>>>>>>>>>>>>>. : " + JSON.stringify(iData));
        const {image, title, rating, tags, url} = iData;
        return (
            <View key={iType+'HeaderKey'} style={s.header}>
                <Image resizeMode={'cover'} style={s.image} source={{uri: image}} />
                <LinearGradient colors={['#00000000', '#000000CC', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={s.linearGradient} />
                <Text style={s.title}>{title}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:scale(7)}}>
                    <Rating editable={false} max={5} rating={rating.value} iconWidth={scale(16.5)} iconHeight={scale(16.5)}/>
                    {/*<ButtonBlack onPress = { () => { this.props.onItemClick(id, type); }} title={'View detail'}/>*/}
                </View>
            </View>
        );
    };


    render() {
        const {type, header, overview, cinema, comments, explore} = this.props.data;

        return (
            <ScrollView contentContainerStyle={s.container} >
                {this.header(type, header)}
                <ButtonOrange onPress={this._logOut} title={'BOOK TICKET'}/>
                {/*<Text style={s.welcome}>Cinema coming soon</Text>*/}

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
