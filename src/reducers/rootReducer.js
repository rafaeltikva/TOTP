import {combineReducers} from 'redux'
import codesReducer from './codesReducer'

export default combineReducers({
    codes: codesReducer
});