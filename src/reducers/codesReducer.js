import initialState from '../store/initialState'
import * as types from '../constants/actionTypes'
import status from '../constants/statuses'

export default function codesReducer(state = initialState.codes, action) {
    switch (action.type) {
        case types.FETCHING_CODES:
            return Object.assign({}, state, action.payload);
        case types.FETCH_CODES_SUCCESS:
            return Object.assign({}, state, action.payload);
        case types.FETCH_CODES_FAILED:
            return Object.assign({}, state, action.payload);
        case types.STORING_CODES:
            return Object.assign({}, state, action.payload);
        case types.STORE_CODES_SUCCESS:
            return Object.assign({}, state, action.payload);
        case types.STORE_CODES_FAILED:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}