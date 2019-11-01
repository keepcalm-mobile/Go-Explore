import screens from './screens';
export { default as screens } from './screens';

const API_URL = 'https://goexploreapi.azure-api.net/testmobile/';// mobile/
const KEY = '?subscription-key=bbc34cdbc2df4e09b177542c6da3fb35';

const GET_ITEM_CATEGORY_ID = {
    [screens.Cinema] : 'cinemaid',
    [screens.Attraction] : 'attractionid',
    [screens.Dining] : 'diningid',
    [screens.HealthBeauty] : 'healthsid',
    [screens.Shopping] : 'shoppingsid',
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

export const getItemUrl = (iID, iType) => ( API_URL + 'getcinemadetails' + KEY + '&' + GET_ITEM_CATEGORY_ID[iType] + '=' + iID );

const apiUrl = 'https://naxlabel.mobi/games/starCrashRecord.php';//'https://goexploreapi.azurewebsites.net/api/goexplore';
export default apiUrl;

// static HotPicks = 'hotPicks';
// static Cinema = 'cinema';
// static BookingTickets = 'BookingTickets';
// static Attraction = 'attractions';
// static Travel = 'travel';
// static Shopping = 'shopping';
// static Dining = 'dining';
// static HealthBeauty = 'health';

// 1. https://goexploreapi.azure-api.net/mobile/HotPicks?subscription-key=[Key]
// 2. https://goexploreapi.azure-api.net/mobile/Attractions?subscription-key=[Key]
// 3. https://goexploreapi.azure-api.net/mobile/Cinemas?subscription-key=[Key]
// 4. https://goexploreapi.azure-api.net/mobile/Dinings?subscription-key=[Key]
// 5. https://goexploreapi.azure-api.net/mobile/Healths?subscription-key=[Key]
// 6. https://goexploreapi.azure-api.net/mobile/Shoppings?subscription-key=[Key]
// 7. https://goexploreapi.azure-api.net/mobile/Travels?subscription-key=[Key]
