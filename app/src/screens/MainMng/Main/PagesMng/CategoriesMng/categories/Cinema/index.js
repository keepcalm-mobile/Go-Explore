import {connect} from 'react-redux';
import ModMap from '../../../../../../../modules/map';
import Cinema from './Cinema';
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {getItem, setScrollOffset} from '../../../../../../../modules';

// const tempData = {
//     type:'cinema',
//     header:
//         {
//             image : 'https://naxlabel.mobi/products/goexplore/001.jpg',
//             title : 'Avengers: Endgame',
//             rating : {value:3.5, count:21},
//             tags : ['PG 13', 'Action', '3 h 2 m'],
//             url : 'https://youtu.be/TcMBFSGVi1c',
//         },
//     overview:
//         {
//             description : 'After the devastating events of Avengers:\nInfinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos\' actions and restore order to the universe.',
//             info : [{value:'55K', title:'Watcher'}, {value:'25K', title:'Collected'}, {value:'58%', title:'Thoughts'}, {value:'107k', title:'Hoys'}],
//             cast : [{title:'Robert Douney Jr.', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Chris Hemsworth', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Chris Evans', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Brie Larson', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Scarlett Johansson', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'}],
//             crew : [{title:'Anthoney Russo', subTitle:'Director', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Joe Russo', subTitle:'Director', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Kevin Fegie', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'San Lee', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'},
//                 {title:'Scarlett Johansson', subTitle:'Actor', image:'https://naxlabel.mobi/img/portfolio/cabin.png'}],
//             rating : [{value:'Metoscore', title:'Filmrating.com'}, {value:'Reviews', title:'734 user'}, {value:'Popularity', title:'26 | 5'}],
//         },
//     cinema:
//         [
//             {image : 'https://naxlabel.mobi/products/goexplore/exp_01.png'},
//             {image : 'https://naxlabel.mobi/products/goexplore/exp_02.png'},
//             {image : 'https://naxlabel.mobi/products/goexplore/exp_03.png'},
//             {image : 'https://naxlabel.mobi/products/goexplore/exp_04.png'},
//             {image : 'https://naxlabel.mobi/products/goexplore/exp_05.png'},
//             {image : 'https://naxlabel.mobi/products/goexplore/exp_06.png'},
//         ],
//     comments: [
//         {
//             user : {name:'Vannessa Wu', image:'https://naxlabel.mobi/img/portfolio/submarine.png'},
//             date : '3 May  2019',
//             rating: 3.5,
//             text: 'The firs movie, I’dwatched when I was about 8 years old and fell in love whitj the characters and the world behind Vikings and dragons. It was a movie in my childhood that Iadmired and loved, as wellas the rest of my family.',
//         },
//         {
//             user : {name:'Vannessa Wu', image:'https://naxlabel.mobi/img/portfolio/submarine.png'},
//             date : '4 May  2019',
//             rating: 5.0,
//             text: 'The firs movie, I’dwatched when I was about 8 years old and fell in love whitj the characters and the world behind Vikings and dragons. It was a movie in my childhood that Iadmired and loved, as wellas the rest of my family.',
//         },
//         {
//             user : {name:'Vannessa Wu', image:'https://naxlabel.mobi/img/portfolio/submarine.png'},
//             date : '4 May  2019',
//             rating: 5.0,
//             text: 'The firs movie, I’dwatched when I was about 8 years old and fell in love whitj the characters and the world behind Vikings and dragons. It was a movie in my childhood that Iadmired and loved, as wellas the rest of my family.',
//         }],
//     explore:
//         {
//             image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
//             text:'Tickets for live stage shows Cirque du Soleil \n' +
//                 'and go on sale starting today, Qatar National Tourism Council (QNTC) announced.\n' +
//                 '\n' +
//                 'The beloved characters are landing at Qatar National Convention Centre (QNCC) for a series of shows as part of the vibrant Summer in Qatar (SIQ) programme.\n' +
//                 '\n' +
//                 'Everyone’s favourite blue creatures, the ‘Smurfs’ Live on Stage – The Smurfs Save Spring’ will be on show from July 18 to 20, while Hello Kitty Live Fashion & Friends’ will delight children from July 25 to 27, both at Al Mayassa Theatre.\n' +
//                 '\n' +
//                 'Tickets for the two shows presented by QNTC in partnership with Alchemy Project are now on sale through tixbox.com with prices ranging from QR75 to QR275.',
//         },
// };

Cinema.propTypes = {
    // curCategory: PropTypes.string.isRequired,
    data : PropTypes.object,
};

const stateToProps = (state) => {
    return {
        // curCategory: state[ ModMap.Items ].curCategory,
        data: state[ ModMap.Items ].items,//state[ ModMap.Categories ].data,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        getItem: (iValue) => dispatch(getItem(iValue)),
        setScrollOffset: (iValue) => dispatch(setScrollOffset(iValue)),
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const _itemId = ownProps.navigation.state.params.itemId;

    if(stateProps.data[_itemId]){
        const tmpData = ownProps.navigation.state.params.tempData;
        if(tmpData.galleryImages && tmpData.galleryImages[0]) stateProps.data[_itemId].header.image = tmpData.galleryImages[0].url;
        if(tmpData.trailer) stateProps.data[_itemId].header.url = tmpData.trailer;
        stateProps.data[_itemId].header.title = tmpData.title;
        stateProps.data[_itemId].overview.description = tmpData.description ? tmpData.description : tmpData.movieSynopsis;
        if(tmpData.movie_ID) {
            stateProps.data[_itemId].movie_ID = tmpData.movie_ID;
            stateProps.data[_itemId].header.tags = [tmpData.rating, tmpData.duration];
        }
    }

    return Object.assign({}, ownProps, {data: stateProps.data[_itemId]}, dispatchProps);
};

const Connected = connect(stateToProps, dispatchToProps, mergeProps, { forwardRef: true })(Cinema);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);
