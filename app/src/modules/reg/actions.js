import t from './types';
import api from '../../constants';
import md5 from 'md5';
import modMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';

export function loginHasErrored(iBool) {
    console.log(">> action loginHasErrored : " + iBool);
    return {
        type: t.LOGIN_HAS_ERRORED,
        loginHasErrored: iBool,
    };
}

export function loginIsLoading(iBool) {
    console.log(">> action loginIsLoading : " + iBool);
    return {
        type: t.LOGIN_IS_LOADING,
        loginIsLoading: iBool,
    };
}

export function loginSuccess(iData) {
    return {
        type: t.LOGIN_SUCCESS,
        user:{key:'qw543wer4g16f', uid:'00001'},//iData,
    };
}

export function login(iUser) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        fetch(api + '/users')//'?user='+iUser.email+'&pass='+md5(iUser.pass)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(loginIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(loginSuccess(data)))
            .catch(() => dispatch(loginHasErrored(true)));
    };
}
