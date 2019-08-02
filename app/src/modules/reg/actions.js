import t from './types';
import api from '../../constants';
import {writeUserData} from '../auth';
import md5 from 'md5';
import modMap from '../map';
import AsyncStorage from '@react-native-community/async-storage';

function loginHasErrored(iBool) {
    console.log('>> action loginHasErrored : ' + iBool);
    return {
        type: t.LOGIN_HAS_ERRORED,
        loginHasErrored: iBool,
    };
}

function loginIsLoading(iBool) {
    console.log('>> action loginIsLoading : ' + iBool);
    return {
        type: t.LOGIN_IS_LOADING,
        loginIsLoading: iBool,
    };
}

function loginSuccess(iBool) {
    console.log('>> action loginSuccess : ' + iBool);
    return {
        type: t.LOGIN_SUCCESS,
        loginSuccess: iBool,
    };
}

function restoreSuccess(iBool) {
    console.log('>> action restoreSuccess : ' + iBool);
    return {
        type: t.RESTORE_SUCCESS,
        restoreSuccess: iBool,
    };
}


function registrationSuccess(iBool) {
    console.log('>> action registrationSuccess : ' + iBool);
    return {
        type: t.REGISTRATION_SUCCESS,
        registrationSuccess: iBool,
    };
}

function otpSuccess(iBool) {
    console.log('>> action otpSuccess : ' + iBool);
    return {
        type: t.OTP_SUCCESS,
        otpSuccess: iBool,
    };
}

function termsSuccess(iBool) {
    console.log('>> action otpSuccess : ' + iBool);
    return {
        type: t.TERMS_SUCCESS,
        termsSuccess: iBool,
    };
}


export function login(iUser) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        fetch(api + '?user')//'?user='+iUser.email+'&pass='+md5(iUser.pass)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(loginIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                data = {key:'qw543wer4g16f', uid:'00001', name:'David'};
                dispatch(loginSuccess(true));
                dispatch(writeUserData(data));
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
}


export function restorePassword(iMail) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        fetch(api + '?users')//'?email='+iMail
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(loginIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                // if(data.result){
                    dispatch(restoreSuccess(true));
                // }
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
}


export function registration(iData) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        // fetch(api + '/users', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(iData),
        // })
        fetch(api + '?users')
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(loginIsLoading(false));

            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            data = {key:'qw543wer4g16f', uid:'00001', name:'David'};
            dispatch(registrationSuccess(true));
            dispatch(writeUserData(data));
        })
        .catch(() => dispatch(loginHasErrored(true)));
    };
}


export function confirmPhone(iValue) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        fetch(api + '?users')//'?email='+iMail
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(loginIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                // if(data.result){
                dispatch(otpSuccess(true));
                // }
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
}


export function termsAgree() {
    return (dispatch) => {
        dispatch(loginIsLoading(true));

        fetch(api + '?users')//'?email='+iMail
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(loginIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                // if(data.result){
                dispatch(termsSuccess(true));
                // }
            })
            .catch(() => dispatch(loginHasErrored(true)));
    };
}