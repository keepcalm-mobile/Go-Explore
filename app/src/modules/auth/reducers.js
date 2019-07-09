import types from './types';
//import { combineReducers } from 'redux';
//
// function selectedSubreddit(state = 'reactjs', action) {
//     switch (action.type) {
//         case types.SELECT_SUBREDDIT:
//             return action.subreddit;
//         default:
//             return state
//     }
// }

function keyData(
    state = {
        isReading: false,
        didInvalidate: false,
        key: '',
    },
    action
) {
    switch (action.type) {
        case types.INVALIDATE_KEY:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case types.REQUEST_KEY:
            return Object.assign({}, state, {
                isReading: true,
                didInvalidate: false,
            });
        case types.RECEIVE_KEY:
            return Object.assign({}, state, {
                isReading: false,
                didInvalidate: action.key === null ? true : false,
                key: action.key,
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}

function keyStore(state = {}, action) {
    switch (action.type) {
        case types.INVALIDATE_KEY:
        case types.RECEIVE_KEY:
        case types.REQUEST_KEY:
            return Object.assign({}, state, keyData(state, action) );
        default:
            return state;
    }
}

// export {keyStore, selectedSubreddit};

const rootReducer = keyStore;
//     combineReducers({
//     postsBySubreddit: keyStore,
//     // selectedSubreddit
// });

export default rootReducer