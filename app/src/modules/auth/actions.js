import types from './types';
import modMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';

function requestKey() {
    console.log('requestKey !!!');
    return {
        type: types.REQUEST_KEY,
    };
}

function receiveKey(key) {
    console.log('receiveKey !!!');
    return {
        type: types.RECEIVE_KEY,
        key: key,
        receivedAt: Date.now(),
    };
}

function shouldReadKey(state) {
    console.log('shouldReadKey ? : ' + JSON.stringify(state));

    if (state.key === undefined) {
        console.log('shouldReadKey = true');
        return true;
    } else if (state.isReading) {
        console.log('shouldReadKey = false');
        return false;
    } else {
        console.log('shouldReadKey = ERROR');
        return state.didInvalidate;
    }
}


export function invalidateKey() {
    console.log('invalidateKey !!!');
    return {
        type: types.INVALIDATE_KEY,
    };
}

export function readKey() {
    console.log('readKey !!!');
    return function(dispatch) {
        dispatch(requestKey());

        return AsyncStorage.getItem('key')
            .then(key =>
                dispatch(receiveKey(key))
            );
    };
}

export function getAuthKey() {
    console.log('getAuthKey : ');
    return (dispatch, getState) => {
        if (shouldReadKey(getState()[modMap.Auth])) {
            return dispatch(readKey());
        } else {
            return Promise.resolve();
        }
    };
}
