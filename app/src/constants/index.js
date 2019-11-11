import screens from './screens';
export { default as screens } from './screens';

/** USER */
export const API_USER = 'https://testgoexplorecity.azurewebsites.net/user/';


/** MEDIA */
const API_URL = 'https://goexploreapi.azure-api.net/testmobile/';// mobile/
const KEY = '?subscription-key=bbc34cdbc2df4e09b177542c6da3fb35';

const GET_ITEM_CATEGORY_API_ID = {
    [screens.Cinema] : 'getcinemadetails',
    [screens.Attraction] : 'GetAttractionDetails',
    [screens.Dining] : 'GetDiningDetails',
    [screens.HealthBeauty] : 'GetHealthsDetails',
    [screens.Shopping] : 'GetShoppingDetails',
    [screens.Travel] : 'GetTravelDetails',
};

const GET_ITEM_CATEGORY_ID = {
    [screens.Cinema] : 'cinemaid',
    [screens.Attraction] : 'attractionid',
    [screens.Dining] : 'diningid',
    [screens.HealthBeauty] : 'healthsid',
    [screens.Shopping] : 'shoppingid',
    [screens.Travel] : 'travelid',
};

export const MEDIA_PREF = '';

export const CATEGORY_API = {
    [screens.HotPicks] : API_URL + 'HotPicks' + KEY,
    [screens.Attraction] : API_URL + 'Attractions' + KEY,
    [screens.Cinema] : API_URL + 'Cinemas' + KEY,
    [screens.Dining] : API_URL + 'Dinings' + KEY,
    [screens.HealthBeauty] : API_URL + 'Healths' + KEY,
    [screens.Shopping] : API_URL + 'Shoppings' + KEY,
    [screens.Travel] : API_URL + 'Travels' + KEY,
};

export const getItemUrl = (iID, iType) => ( API_URL + GET_ITEM_CATEGORY_API_ID[iType] + KEY + '&' + GET_ITEM_CATEGORY_ID[iType] + '=' + iID );

/** TEMP */
const apiUrl = 'https://naxlabel.mobi/games/starCrashRecord.php';//'https://goexploreapi.azurewebsites.net/api/goexplore';
export default apiUrl;
