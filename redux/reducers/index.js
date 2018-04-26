import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlayReducer from './PlayReducer';

export default combineReducers({
    auth: AuthReducer,
    play: PlayReducer
});
