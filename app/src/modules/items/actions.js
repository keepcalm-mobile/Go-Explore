import t from './types';
import api, {screens} from '../../constants';
import {isLoading} from '../loading';
import ModMap from '../map';

const tempData = {
    '0001':{
        type:'cinema',
        header:
            {
                image : 'https://naxlabel.mobi/products/goexplore/001.jpg',
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
                rating : [{value:'Metoscore', title:'Filmrating.com'}, {value:'Reviews', title:'734 user'}, {value:'Popularity', title:'26 | 5'}],
            },
        cinema:
            [
                {image : 'https://naxlabel.mobi/products/goexplore/exp_01.png'},
                {image : 'https://naxlabel.mobi/products/goexplore/exp_02.png'},
                {image : 'https://naxlabel.mobi/products/goexplore/exp_03.png'},
                {image : 'https://naxlabel.mobi/products/goexplore/exp_04.png'},
                {image : 'https://naxlabel.mobi/products/goexplore/exp_05.png'},
                {image : 'https://naxlabel.mobi/products/goexplore/exp_06.png'},
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
                rating: 5.0,
                text: 'The firs movie, I’dwatched when I was about 8 years old and fell in love whitj the characters and the world behind Vikings and dragons. It was a movie in my childhood that Iadmired and loved, as wellas the rest of my family.',
            },
            {
                user : {name:'Vannessa Wu', image:'https://naxlabel.mobi/img/portfolio/submarine.png'},
                date : '4 May  2019',
                rating: 5.0,
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
        },
};

function hasErrored(iBool) {
    return {
        type: t.HAS_ERRORED,
        hasErrored: iBool,
    };
}

// function curItem(iValue) {
//     return {
//         type: t.SET_CUR_ITEM,
//         curItem: iValue,
//     };
// }

function updateItemData(iData) {
    return {
        type: t.ITEM_UPDATE_DATA,
        data: iData,
    };
}

function loadItemData(iItemId, iDispatch) {
    fetch(api + '?user')//'?user='+iUser.email+'&pass='+md5(iUser.pass)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            data = tempData[iItemId] ? tempData[iItemId] : tempData['0001'];
            iDispatch(updateItemData({[iItemId]: data}));
            iDispatch(isLoading(false));
        })
        .catch(() => iDispatch(hasErrored(true)));
}

export function getItem(iValue) {
    return (dispatch, getState) => {
        // dispatch(curItem(iValue));

        if (getState()[ModMap.Items][iValue]){
            return Promise.resolve();
        } else {
            dispatch(isLoading(true));
            return loadItemData(iValue, dispatch);
        }
    };
}