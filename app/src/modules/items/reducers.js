import {screens} from '../../constants';
import {combineReducers} from 'redux';
import t from './types';

let dataState = {
};

function items(state = dataState, action) {
    switch (action.type) {
        case t.ITEM_UPDATE_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

// const reducer = combineReducers({
//     items,
// });
//
// export default reducer;
export default items;