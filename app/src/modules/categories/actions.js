import t from './types';
import api from '../../constants';
import {writeUserData} from '../auth';

const tempData = {header:[
        {
            id : '0001',
            image : 'https://naxlabel.mobi/img/portfolio/cabin.png',
            title : 'Avengers: Endgame',
            subTitle : 'Action, PG 13, English | 3h 2m',
            rating : 3.5,
            tags : ['PG 13', 'Action', '3 h 2 m'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '0002',
            image : 'https://naxlabel.mobi/img/portfolio/cake.png',
            title : 'CHI,  The SPA',
            subTitle : 'CHI, The SPA, the only luxury',
            rating : 5.0,
            tags : ['SPA', 'Health', 'Luxury'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'health',
        },
        {
            id : '0003',
            image : 'https://naxlabel.mobi/img/portfolio/submarine.png',
            title : 'The Lalit Golf & Spa Resort',
            subTitle : '1.1 km from Fatread Beach',
            rating : 1.25,
            tags : ['Resort', 'SPA', 'City Center'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
    ],
    data:[
        {
            type : 'big',
            title : 'Trending Now',
            data : [
                {
                    id: '00001',
                    image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
                    title: 'Fanqaar\nby Vistas Global\nat The Gate Mall',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 3.5,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://naxlabel.mobi/img/portfolio/cake.png',
                    title: 'CHI,  The SPA',
                    subTitle: 'CHI, The SPA, the only luxury',
                    rating: 5.0,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'health',
                },
                {
                    id: '00003',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'The Lalit Golf & Spa Resort',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 1.25,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'dining',
                },
            ],
        },
        {
            type : 'small',
            title : 'Things To Do',
            data : [
                {
                    id: '00001',
                    image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://naxlabel.mobi/img/portfolio/cake.png',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00003',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Newly Added',
            data : [
                {
                    id: '00001',
                    image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://naxlabel.mobi/img/portfolio/cake.png',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00003',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'We Explored',
            data : [
                {
                    id: '00001',
                    image: 'https://naxlabel.mobi/img/portfolio/cabin.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://naxlabel.mobi/img/portfolio/cake.png',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00003',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
    ],
};


function isLoading(iBool) {
    return {
        type: t.IS_LOADING,
        isLoading: iBool,
    };
}

function hasErrored(iBool) {
    return {
        type: t.HAS_ERRORED,
        hasErrored: iBool,
    };
}

function curCategory(iValue) {
    return {
        type: t.SET_CUR_CATEGORY,
        curCategory: iValue,
    };
}

function updateData(iData) {
    return {
        type: t.UPDATE_DATA,
        data: iData,
    };
}

export function setCurCategory(iValue) {
    return (dispatch) => {
        dispatch(curCategory(iValue));
        dispatch(isLoading(true));

        fetch(api + '?users')//'?user='+iUser.email+'&pass='+md5(iUser.pass)
            .then((response) => {
                if (!response.ok) { throw Error(response.statusText); }
                dispatch(isLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                data = tempData;
                dispatch(updateData({[iValue]:data} ));
            })
            .catch(() => dispatch(hasErrored(true)));
    };
}


// export const setCurCategory = value => ({
//     type: t.SET_CUR_CATEGORY,
//     category : value,
// });


// export function setCntHeight(value) {
//     console.log("setCntHeight!!!!" + value);
//     return (dispatch, getState) => {
//         return dispatch({
//             type: t.CHANGE_HEIGHT,
//             payload: {value}
//         });
//     }
// }

// export function setCntHeight(value) {
//     console.log("blabla !!!" + JSON.stringify(value));
//     return {
//         type: t.CHANGE_HEIGHT,
//         payload : value
//     }
// }


// export const setCntHeight = (value) => (dispatch, getState) => {
//     console.log("blabla !!!" + JSON.stringify(value));
//     dispatch({
//         type: t.CHANGE_HEIGHT,
//         payload: value,
//     });
// };

// export setCntHeight;
