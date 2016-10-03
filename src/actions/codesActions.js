import {AsyncStorage} from 'react-native'
import * as types from '../constants/actionTypes'
import status from '../constants/statuses'
import TOTP from '../include/TOTP'
import {DEFAULT_SECRET} from '../include/config'

function initializingCodes() {
    return {
        type: types.INITIALIZING_CODES,
        payload: {
            status: status.INITIALIZING
        }
    }
}

function fetchingCodes() {
    return {
        type: types.FETCHING_CODES,
        payload: {
            status: status.FETCHING
        }
    }
}

function fetchCodesSuccess(codes) {
    return {
        type: types.FETCH_CODES_SUCCESS,
        payload: {
            status: status.SUCCESS,
            data: codes
        }
    }
}

function fetchCodesFailed(error) {
    return {
        type: types.FETCH_CODES_FAILED,
        payload: {
            status: status.FAILED,
            error
        }

    }
}

function storingCodes() {
    return {
        type: types.STORING_CODES,
        payload: {
            status: status.STORING,
        }
    }
}

function storeCodesSuccess(codes) {
    return {
        type: types.STORE_CODES_SUCCESS,
        payload: {
            status: status.SUCCESS,
            data: codes
        }
    }
}

function storeCodesFailed(error) {
    return {
        type: types.STORE_CODES_FAILED,
        payload: {
            status: status.FAILED,
            error
        }
    }
}

export function initializeCodes() {
    return function (dispatch, getState) {
        console.log('initializing Codes...');
        dispatch(initializingCodes());

        let codes = [];

        codes[0] = new TOTP('Demo', DEFAULT_SECRET).getOTPData();

        dispatch(storeCodes(codes));

        return codes;

    }
}

export function getCodes() {
    return function (dispatch, getState) {
        console.log('getting codes...');
        dispatch(fetchingCodes());
        return AsyncStorage.getItem('codes').then((jsonCodes) => {
            console.log('the codes received from asyncStorage: ', jsonCodes);
            let codes = JSON.parse(jsonCodes);
            dispatch(fetchCodesSuccess(codes));
            return codes;
        }).catch(error => {
            dispatch(fetchCodesFailed(error));
        });
    }

}

export function storeCodes(codes, callback) {
    return function (dispatch, getState) {
        console.log('setting codes: ', codes);
        dispatch(storingCodes());
        return AsyncStorage.setItem('codes', JSON.stringify(codes)).then(() => {
            console.log('codes stored successfully', codes);
            dispatch(storeCodesSuccess(codes));
            return codes;
        }).catch(error => {
            console.error('Failed storing code: ', error);
            dispatch(storeCodesFailed(error));

        });
    }
}

function cleanDB() {
    return function (dispatch, getState) {
        return AsyncStorage.removeItem('codes');
    }

}