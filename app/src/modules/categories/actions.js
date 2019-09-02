import t from './types';
import api, {screens} from '../../constants';
import {isLoading} from '../loading';
import ModMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';

const tempDataCinama = {header:[
        {
            id : '0001',
            image : 'https://naxlabel.mobi/products/goexplore/001.jpg',
            title : 'Avengers: Endgame',
            subTitle : 'Action, PG 13, English | 3h 2m',
            rating : 3.5,
            tags : ['PG 13', 'Action', '3 h 2 m'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '0002',
            image : 'https://naxlabel.mobi/products/goexplore/002.jpg',
            title : 'CHI,  The SPA',
            subTitle : 'CHI, The SPA, the only luxury',
            rating : 5.0,
            tags : ['SPA', 'Health', 'Luxury'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'health',
        },
        {
            id : '0003',
            image : 'https://naxlabel.mobi/products/goexplore/003.jpg',
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
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/howtotraindragon-250x366.jpg',
                    title: 'How to Train\nYour Dragon:\nThe Hidden World',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 3.5,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/manikarnika-250x366.jpg',
                    title: 'Manikarnika:\nThe Queen of Jhansi',
                    subTitle: 'CHI, The SPA, the only luxury',
                    rating: 5.0,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '00003',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/humming_250x366_1.jpg',
                    title: 'Cold Pursuit',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 1.25,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Things To Do',
            data : [
                {
                    id: '00001',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/alita-250x366.jpg',
                    title: 'Alita:\nBattle Angel',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00002',
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/glass250x366.jpg',
                    title: 'Glass',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '00003',
                    image: 'https://cmsapi-uat.novocinemas.com/images/NoImage/Movie/250x366/placeholder.jpg',
                    title: 'Spider-Man:\nFar From Home',
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
                    image: 'https://cmsapi-uat.novocinemas.com/Files/Movie/250x366/poisonrose250x366.jpg',
                    title: 'The Poison Rose',
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
                    type: 'health',
                },
                {
                    id: '00003',
                    image: 'https://naxlabel.mobi/img/portfolio/submarine.png',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'dining',
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

const tempDataTravel = {header:[
        {
            id : '1001',
            image : 'https://naxlabel.mobi/products/goexplore/trav/001.jpg',
            title : 'Sharq Village & Spa',
            subTitle : 'Ras Abu Abboud St, Doha',
            rating : 4.5,
            tags : ['Resort', 'SPA', 'City Center'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '1002',
            image : 'https://naxlabel.mobi/products/goexplore/trav/002.jpg',
            title : 'Marsa Malaz Kempinski,\nThe Pearl',
            subTitle : 'The Pearl - Doha, Costa Malaz Bay',
            rating : 4.7,
            tags : ['SPA', 'Health', 'Luxury'],
            url : 'https://youtu.be/TcMBFSGVi1c',
            type : 'cinema',
        },
        {
            id : '1003',
            image : 'https://naxlabel.mobi/products/goexplore/trav/003.jpg',
            title : 'Sheraton Grand\nDoha Resort',
            subTitle : 'Al Corniche St, Doha',
            rating : 4.7,
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
                    id: '10004',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/016.jpg',
                    title: 'How to Train\nYour Dragon:\nThe Hidden World',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 3.5,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '10005',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/005.jpg',
                    title: 'Manikarnika:\nThe Queen of Jhansi',
                    subTitle: 'CHI, The SPA, the only luxury',
                    rating: 5.0,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
                {
                    id: '10006',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/006.jpg',
                    title: 'Cold Pursuit',
                    subTitle: '1.1 km from Fatread Beach',
                    rating: 1.25,
                    date: '4 June 2019',
                    location: 'Qatar, Doha',
                    type: 'cinema',
                },
            ],
        },
        {
            type : 'small',
            title : 'Things To Do',
            data : [
                {
                    id: '10007',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/007.jpg',
                    title: 'Alita:\nBattle Angel',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10008',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/008.jpg',
                    title: 'Glass',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10009',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/009.jpg',
                    title: 'Spider-Man:\nFar From Home',
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
                    id: '10010',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/010.jpg',
                    title: 'The Poison Rose',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10011',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/011.jpg',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10012',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/012.jpg',
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
                    id: '10013',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/013.jpg',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10014',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/014.jpg',
                    title: 'Un Beau Soleil\nInterieur',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
                {
                    id: '10015',
                    image: 'https://naxlabel.mobi/products/goexplore/trav/015.jpg',
                    title: 'Deepwater',
                    rating: 3.5,
                    date: '4 June 2019',
                    type: 'cinema',
                },
            ],
        },
    ],
};

const tempFilter = {
    'Location':[{label:'Mall of Qatar - Doha', value:'place0'}, {label:'Another Place 1', value:'place1'}, {label:'Another Place 2', value:'place2'}, {label:'Another Place 3', value:'place3'}],
    'Genre':['Action', 'Adult', 'Adventure', 'Avant-garde/Experimental', 'Comedy', 'Children\'s/Family', 'Comedy Drama', 'Crime', 'Drama', 'Epic', 'Fantasy', 'Historical Film', 'Horror', 'Musical', 'Mystery', 'Romance', 'Science Fiction', 'Spy Film', 'War', 'Western'],
    'Experience':['2D', '2D IMAX', '3D', '3D IMAX'],
    'Languages':['English', 'Arabian', 'French', 'Italian'],
    'Price':[40, 200],
};


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

function updateCategoryData(iData) {
    return {
        type: t.UPDATE_DATA,
        data: iData,
    };
}

function updateFilter(iData) {
    return {
        type: t.UPDATE_FILTER,
        data: iData,
    };
}

function updateFilterSettings(iData) {
    return {
        type: t.UPDATE_FILTERS_SETTINGS,
        data: iData,
    };
}


function loadCategoryData(iCategory, iFilter, iDispatch) {
    fetch(api + '?' + (iFilter ? iFilter : 'user'))//'?user='+iUser.email+'&pass='+md5(iUser.pass)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            data = iCategory === screens.Travel ? tempDataTravel : tempDataCinama;
            iDispatch(updateCategoryData({[iCategory]: data}));
            iDispatch(isLoading(false));
        })
        .catch(() => iDispatch(hasErrored(true)));
}


function loadFilterData(iCategory, iDispatch) {
    fetch(api + '?filter=' + iCategory)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            data = tempFilter;
            iDispatch(updateFilter({[iCategory]: data}));
        })
        .catch(() => iDispatch(hasErrored(true)));
}


export function setCurCategory(iValue) {
    return (dispatch, getState) => {
        dispatch(curCategory(iValue));

        if (getState()[ModMap.Categories][iValue]){
            return Promise.resolve();
        } else {
            dispatch(isLoading(true));
            loadFilterData(iValue, dispatch);
            return loadCategoryData(iValue, getState()[ModMap.Categories].filters[iValue], dispatch);
        }
    };
}


export function applyFilter(iValue) {
    return (dispatch, getState) => {
        let _category = getState()[ModMap.Categories].curCategory;
        writeFiltersData({...getState()[ModMap.Categories].filters, [_category]:iValue} );
        dispatch(updateFilterSettings({[_category] : iValue}));

        dispatch(isLoading(true));
        return loadCategoryData(_category, iValue, dispatch);
    };
}

export function readFiltersData() {
    return (dispatch) => (
        AsyncStorage.getItem('filters').then( filters => {
            dispatch(updateFilterSettings(JSON.parse(filters)));
        })
    );
}

function writeFiltersData(iData) {
    AsyncStorage.setItem('filters', JSON.stringify(iData));
}