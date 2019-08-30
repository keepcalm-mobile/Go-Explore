import {screens} from '../../constants';
import {combineReducers} from 'redux';
import t from './types';

let dataState = {
};

function isLoading(state = false, action) {
    switch (action.type) {
        case t.IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

function updateItemData(state = '', action) {
    switch (action.type) {
        case t.UPDATE_ITEM_DATA:
            return action.curCategory;
        default:
            return state;
    }
}

function setItemData(state = dataState, action) {
    switch (action.type) {
        case t.SET_ITEM_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    isLoading,
    updateItemData,
    data,
});

export default reducer;
