import { combineReducers } from 'redux';
import ModMap from './map';

import auth, {authTypes} from './auth';
import reg, {regTypes} from './reg';
import categories, {categoriesTypes} from './categories';
import scroll, {scrollTypes} from './scrollOffset';


const reducers = combineReducers({
    [ModMap.Auth]:auth,
    [ModMap.Reg]:reg,
    [ModMap.Categories]:categories,
    [ModMap.Scroll]:scroll,
});


export default reducers;
export { default as ModMap } from './map';

// export default (state, action) => {
//   // if (action.type === authTypes.SIGN_OUT) {
//   //   state = { app: state.app };
//   // }
//
//   return appReducer(state, action);
// };
