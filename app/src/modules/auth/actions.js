import types from "./types";
import modMap from "../map";
import AsyncStorage from "@react-native-community/async-storage";

function requestKey() {
    console.log("requestKey !!!");
    return {
        type: types.REQUEST_KEY
    }
}

function receiveKey(key) {
    console.log("receiveKey !!!");
    return {
        type: types.RECEIVE_KEY,
        key: key,
        receivedAt: Date.now()
    }
}

export function invalidateKey() {
    console.log("invalidateKey !!!");
    return {
        type: types.INVALIDATE_KEY
    }
}


export function generateKey() {
    console.log("generateKey !!!");
    return function(dispatch) {
        dispatch(requestKey());

        return AsyncStorage.getItem('key')
            .then(key =>
                dispatch(receiveKey(key))
            )
    }
}

function shouldGenerateKey(state) {
    console.log("shouldGenerateKey ? : " + JSON.stringify(state));

    if (state.key === undefined) {
        console.log("shouldGenerateKey = true");
        return true
    } else if (state.isReading) {
        console.log("shouldGenerateKey = false");
        return false
    } else {
        console.log("shouldGenerateKey = ERROR");
        return state.didInvalidate
    }
}

export function getAuthKey() {
    console.log("getAuthKey : ");
    return (dispatch, getState) => {
        if (shouldGenerateKey(getState()[modMap.Auth])) {
            return dispatch(generateKey())
        } else {
            return Promise.resolve()
        }
    }
}