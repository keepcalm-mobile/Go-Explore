import t from './types';
//import { combineReducers } from 'redux';
//
// function selectedSubreddit(state = 'reactjs', action) {
//     switch (action.type) {
//         case t.SELECT_SUBREDDIT:
//             return action.subreddit;
//         default:
//             return state
//     }
// }

function keyData(
    state = {
        userIsReading: false,
        userInvalidate: false,
        user: null,
    },
    action
) {
    switch (action.type) {
        case t.USER_INVALIDATE:
            return {
                userIsReading: false,
                userInvalidate: action.userInvalidate,
            };
        case t.USER_REQUEST:
            return {
                userIsReading: true,
                userInvalidate: false,
            };
        case t.USER_RECEIVE:
            return {
                userIsReading: false,
                userInvalidate: action.user === null ? true : false,
                user: action.user,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
}

function userStore(state = {}, action) {
    switch (action.type) {
        case t.USER_INVALIDATE:
        case t.USER_RECEIVE:
        case t.USER_REQUEST:
            return Object.assign({}, state, keyData(state, action) );
        default:
            return state;
    }
}

const userReducer = userStore;

export default userReducer