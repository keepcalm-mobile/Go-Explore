import { combineReducers } from 'redux';
import ModMap from './map';

import isLoading from './loading';
import auth, {authTypes} from './auth';
import reg, {regTypes} from './reg';
import categories, {categoriesTypes} from './categories';
import items, {itemsTypes} from './items';
import scroll, {scrollTypes} from './scrollOffset';


const reducers = combineReducers({
    isLoading,
    [ModMap.Auth]:auth,
    [ModMap.Reg]:reg,
    [ModMap.Categories]:categories,
    [ModMap.Items]:items,
    [ModMap.Scroll]:scroll,
});


export default reducers;
export { default as ModMap } from './map';
export { getItem, getCinemasData, setMapTarget } from './items';
export { setCurCategory, applyFilter, readFiltersData } from './categories';
export { setScrollOffset } from './scrollOffset';

// export default (state, action) => {
//   // if (action.type === authTypes.SIGN_OUT) {
//   //   state = { app: state.app };
//   // }
//
//   return appReducer(state, action);
// };
