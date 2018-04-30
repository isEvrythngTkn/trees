import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlayReducer from './PlayReducer';
import OstReducer from './OstReducer';
import RedeemablesReducer from './RedeemablesReducer';
import RedeemReducer from './RedeemReducer';

export default combineReducers({
    auth: AuthReducer,
    play: PlayReducer,
    ost: OstReducer,
    redeemables: RedeemablesReducer,
    redeem: RedeemReducer
});
