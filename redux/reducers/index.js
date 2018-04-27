import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlayReducer from './PlayReducer';
import OstReducer from './OstReducer';

export default combineReducers({
    auth: AuthReducer,
    play: PlayReducer,
    ost: OstReducer
});
