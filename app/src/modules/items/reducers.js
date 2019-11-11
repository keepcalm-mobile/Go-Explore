import {screens} from '../../constants';
import {combineReducers} from 'redux';
import t from './types';

let mapTargetState = {
    latitude: 25.2854,
    longitude: 51.5310,
    mapIsOpen: false,
};

let itemsState = {
};

let bookingCinemaState = {
    cinemas:null,
    dates:null,
    times:null,
    ticketTypes:null,
    updated:0,
};

function mapTarget(state = mapTargetState, action) {
    switch (action.type) {
        case t.ITEM_UPDATE_MAP:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

function items(state = itemsState, action) {
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

function bookingCinema(state = bookingCinemaState, action) {
    switch (action.type) {
        case t.BOOKING_CINEMA_DATA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    mapTarget,
    items,
    bookingCinema,
});

export default reducer;
// export default items;