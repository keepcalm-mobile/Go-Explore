import { handleActions } from 'redux-actions';
// import { mergeIn } from '../../utils/stateHelpers';
//
// const initialState = {
//     twitterToken: null,
// };
//
// const settingsReducer = handleActions({
//     [types.SET_PROP]: mergeIn(action => action.payload),
// }, initialState);
//
// export default settingsReducer;

// import { combineReducers } from 'redux'

import types from './types'
import { combineReducers } from 'redux'

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case types.SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case types.INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case types.REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case types.RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case types.INVALIDATE_SUBREDDIT:
        case types.RECEIVE_POSTS:
        case types.REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state
    }
}

// export {postsBySubreddit, selectedSubreddit};

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
});

export default rootReducer