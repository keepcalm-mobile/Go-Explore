import t from './types';
import { combineReducers } from 'redux';

function loginHasErrored(state = false, action) {
    switch (action.type) {
        case t.LOGIN_HAS_ERRORED:
            return action.loginHasErrored;
        default:
            return state;
    }
}

function loginIsLoading(state = false, action) {
    switch (action.type) {
        case t.LOGIN_IS_LOADING:
            return action.loginIsLoading;
        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case t.LOGIN_SUCCESS:
            return action.user;
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    loginHasErrored,
    loginIsLoading,
    user,
});

export default rootReducer;
