import screens from './screens';
export { default as screens } from './screens';

/** USER */
export const API_USER = 'https://testgoexplorecity.azurewebsites.net/user/';


/** MEDIA */
const API_URL = 'https://goexploreapi.azure-api.net/mobile/';// mobile/
const KEY = '?subscription-key=bbc34cdbc2df4e09b177542c6da3fb35';

const GET_ITEM_CATEGORY_API_ID = {
    [screens.Cinema] : 'cinema/getmoviedetails',
    [screens.Attraction] : 'attraction/getattractiondetails',
    [screens.Dining] : 'dining/getdiningsdetails',
    [screens.HealthBeauty] : 'health/gethealthdetails',
    [screens.Shopping] : 'shopping/getshoppingdetails',
    [screens.Travel] : 'travel/gettraveldetails',
    [screens.Event] : 'event/geteventdetails',
    [screens.Article] : 'article/getarticledetails',
};

const GET_ITEM_CATEGORY_ID = {
    [screens.Cinema] : 'movieid',
    [screens.Attraction] : 'attractionid',
    [screens.Dining] : 'diningid',
    [screens.HealthBeauty] : 'healthid',
    [screens.Shopping] : 'shoppingid',
    [screens.Travel] : 'travelid',
    [screens.Event] : 'eventid',
    [screens.Article] : 'articleid',
};

export const MEDIA_PREF = '';

export const CATEGORY_API = {
    [screens.HotPicks] : API_URL + 'hotpicks/gethotpicks' + KEY,
    [screens.Attraction] : API_URL + 'attraction/getattractions' + KEY,
    [screens.Cinema] : API_URL + 'cinema/getmovies' + KEY,
    [screens.Dining] : API_URL + 'dining/getdinings' + KEY,
    [screens.HealthBeauty] : API_URL + 'health/gethealths' + KEY,
    [screens.Shopping] : API_URL + 'shopping/getshoppings' + KEY,
    [screens.Travel] : API_URL + 'travel/gettravels' + KEY,
};

export const getItemUrl = (iID, iType) => ( API_URL + GET_ITEM_CATEGORY_API_ID[iType] + KEY + '&' + GET_ITEM_CATEGORY_ID[iType] + '=' + iID );

/** TEMP */
const apiUrl = 'https://naxlabel.mobi/games/starCrashRecord.php';//'https://goexploreapi.azurewebsites.net/api/goexplore';
export default apiUrl;
