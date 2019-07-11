import types from './types';
import modMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';
import t from "../reg/types";

function userInvalidate(iBool) {
    console.log('userInvalidate !!!');
    return {
        type: types.USER_INVALIDATE,
        userInvalidate: iBool,
    };
}

function userRequest() {
    console.log('userRequest !!!');
    return {
        type: types.USER_REQUEST,
    };
}

function userReceive(iData) {
    console.log('userReceive !!!');
    return {
        type: types.USER_RECEIVE,
        user: iData,
        receivedAt: Date.now(),
    };
}

function shouldReadData(state) {
    console.log('shouldReadData ? : ' + JSON.stringify(state));

    if (state.user === undefined) {
        console.log('shouldReadData = true');
        return true;
    } else if (state.userIsReading) {
        console.log('shouldReadData = false');
        return false;
    } else {
        console.log('shouldReadData = ERROR');
        return state.userInvalidate;
    }
}


function readUserData() {
    console.log('readUserData !!!');
    return function(dispatch) {
        dispatch(userRequest());

        return AsyncStorage.getItem('user').then( user => {
            if (user === null) {
                dispatch(userInvalidate(true));
            } else {
                dispatch(userReceive(JSON.parse(user)));
            }
        });
    };
}


export function getUserData() {
    console.log('getUserData : ');
    return (dispatch, getState) => {
        if (shouldReadData(getState()[modMap.Auth])) {
            return dispatch(readUserData());
        } else {
            return Promise.resolve();
        }
    };
}

export function writeUserData(iData) {
    return AsyncStorage.setItem('user', JSON.stringify(iData)).then( () => {
            return userReceive(iData);
        }
    );
}