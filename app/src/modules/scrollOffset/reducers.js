import {combineReducers} from 'redux';
import t from './types';

function scrollOffset(state = 0, action) {
    switch (action.type) {
        case t.SCROLL_OFFSET:
            return action.scrollOffset;
        default:
            return state;
    }
}

const reducer = combineReducers({
    scrollOffset,
});

export default reducer;
