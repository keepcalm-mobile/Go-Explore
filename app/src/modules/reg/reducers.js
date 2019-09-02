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


function loginSuccess(state = false, action) {
    switch (action.type) {
        case t.LOGIN_SUCCESS:
            return action.loginSuccess;
        default:
            return state;
    }
}

function restoreSuccess(state = false, action) {
    switch (action.type) {
        case t.RESTORE_SUCCESS:
            return action.restoreSuccess;
        default:
            return state;
    }
}

function registrationSuccess(state = false, action) {
    switch (action.type) {
        case t.REGISTRATION_SUCCESS:
            return action.registrationSuccess;
        default:
            return state;
    }
}

function otpSuccess(state = false, action) {
    switch (action.type) {
        case t.OTP_SUCCESS:
            return action.otpSuccess;
        default:
            return state;
    }
}

function termsSuccess(state = false, action) {
    switch (action.type) {
        case t.TERMS_SUCCESS:
            return action.termsSuccess;
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    loginHasErrored,
    loginIsLoading,
    loginSuccess,
    restoreSuccess,
    registrationSuccess,
    otpSuccess,
    termsSuccess,
});

export default rootReducer;
