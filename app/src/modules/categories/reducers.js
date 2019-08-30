import {screens} from '../../constants';
import {combineReducers} from 'redux';
import t from './types';

let dataState = {
    [screens.HotPicks]:null,
    [screens.Cinema]:null,
    [screens.Attraction]:null,
    [screens.Travel]:null,
    [screens.Shopping]:null,
    [screens.Dining]:null,
    [screens.HealthBeauty]:null,
};

let filtersState = {
    [screens.Cinema]:null,
    [screens.Attraction]:null,
    [screens.Travel]:null,
    [screens.Shopping]:null,
    [screens.Dining]:null,
    [screens.HealthBeauty]:null,
};

let filtersSettingsState = {
    [screens.Cinema]:null,
    [screens.Attraction]:null,
    [screens.Travel]:null,
    [screens.Shopping]:null,
    [screens.Dining]:null,
    [screens.HealthBeauty]:null,
};

function isLoading(state = false, action) {
    switch (action.type) {
        case t.IS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

function curCategory(state = '', action) {
    switch (action.type) {
        case t.SET_CUR_CATEGORY:
            return action.curCategory;
        default:
            return state;
    }
}

function categories(state = dataState, action) {
    switch (action.type) {
        case t.UPDATE_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

function filters(state = filtersState, action) {
    switch (action.type) {
        case t.UPDATE_FILTER:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

function filtersSettings(state = filtersSettingsState, action) {
    switch (action.type) {
        case t.UPDATE_FILTERS_SETTINGS:
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
    curCategory,
    categories,
    filters,
    filtersSettings,
});

export default reducer;
