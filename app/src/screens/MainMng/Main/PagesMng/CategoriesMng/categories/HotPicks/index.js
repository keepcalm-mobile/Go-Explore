import {connect} from 'react-redux';
import React, {forwardRef} from 'react';
import ModMap from '../../../../../../../modules/map';
import {setCurCategory} from '../../../../../../../modules/categories';
import HotPicks from './HotPicks';
import PropTypes from 'prop-types';

// const tempData = {header:[
//     {
//         id : '0001',
//         image : 'https://naxlabel.mobi/img/portfolio/cabin.png',
//         title : 'Avengers: Endgame',
//         subTitle : 'Action, PG 13, English | 3h 2m',
//         rating : 3.5,
//         tags : ['PG 13', 'Action', '3 h 2 m'],
//         url : 'https://youtu.be/TcMBFSGVi1c',
//         type : 'cinema',
//     },
//     {
//         id : '0002',
//         image : 'https://naxlabel.mobi/img/portfolio/cake.png',
//         title : 'CHI,  The SPA',
//         subTitle : 'CHI, The SPA, the only luxury',
//         rating : 5.0,
//         tags : ['SPA', 'Health', 'Luxury'],
//         url : 'https://youtu.be/TcMBFSGVi1c',
//         type : 'health',
//     },
//     {
//         id : '0003',
//         image : 'https://naxlabel.mobi/img/portfolio/submarine.png',
//         title : 'The Lalit Golf & Spa Resort',
//         subTitle : '1.1 km from Fatread Beach',
//         rating : 1.25,
//         tags : ['Resort', 'SPA', 'City Center'],
//         url : 'https://youtu.be/TcMBFSGVi1c',
//         type : 'cinema',
//     },
// ],
//     data:[
//         {
//             type : 'big',
//             title : 'Trending Now',
//             data : [
//                 {
//                     id: '00001',
//                     image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
//                     title: 'Fanqaar\nby Vistas Global\nat The Gate Mall',
//                     subTitle: '1.1 km from Fatread Beach',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     location: 'Qatar, Doha',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00002',
//                     image: 'https://naxlabel.mobi/img/portfolio/cake.png',
//                     title: 'CHI,  The SPA',
//                     subTitle: 'CHI, The SPA, the only luxury',
//                     rating: 5.0,
//                     date: '4 June 2019',
//                     location: 'Qatar, Doha',
//                     type: 'health',
//                 },
//                 {
//                     id: '00003',
//                     image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
//                     title: 'The Lalit Golf & Spa Resort',
//                     subTitle: '1.1 km from Fatread Beach',
//                     rating: 1.25,
//                     date: '4 June 2019',
//                     location: 'Qatar, Doha',
//                     type: 'dining',
//                 },
//             ],
//         },
//         {
//             type : 'small',
//             title : 'Things To Do',
//             data : [
//                 {
//                     id: '00001',
//                     image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
//                     title: 'Deepwater',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00002',
//                     image: 'https://naxlabel.mobi/img/portfolio/cake.png',
//                     title: 'Un Beau Soleil\nInterieur',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00003',
//                     image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
//                     title: 'Deepwater',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//             ],
//         },
//         {
//             type : 'small',
//             title : 'Newly Added',
//             data : [
//                 {
//                     id: '00001',
//                     image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
//                     title: 'Deepwater',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00002',
//                     image: 'https://naxlabel.mobi/img/portfolio/cake.png',
//                     title: 'Un Beau Soleil\nInterieur',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00003',
//                     image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
//                     title: 'Deepwater',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//             ],
//         },
//         {
//             type : 'small',
//             title : 'We Explored',
//             data : [
//                 {
//                     id: '00001',
//                     image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
//                     title: 'Deepwater',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00002',
//                     image: 'https://naxlabel.mobi/img/portfolio/cake.png',
//                     title: 'Un Beau Soleil\nInterieur',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//                 {
//                     id: '00003',
//                     image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
//                     title: 'Deepwater',
//                     rating: 3.5,
//                     date: '4 June 2019',
//                     type: 'cinema',
//                 },
//             ],
//         },
//     ],
// };

HotPicks.propTypes = {
    setCurCategory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    curCategory: PropTypes.string.isRequired,
    data : PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        isLoading: state[ ModMap.Categories ].isLoading,
        curCategory: state[ ModMap.Categories ].curCategory,
        data: state[ ModMap.Categories ].categoriesData,
        // content : tempData,
    };
};

const dispatchToProps = (dispatch) => {
    return {
        setCurCategory: (iValue) => dispatch(setCurCategory(iValue)),
    };
};

const Connected = connect(stateToProps, dispatchToProps, null, { forwardRef: true })(HotPicks);

export default forwardRef((props, ref) =>
    <Connected {...props} ref={ref} />
);

