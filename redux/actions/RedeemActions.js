import { transferToCompany } from '../../api/ost';
import { 
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_FAIL
} from './types';
import { fetchBalance } from './OstActions';
import store from '../store';

export const userRedeems = ({ userToken, uuid, kind }) => {
  console.log('User Redeems!', uuid, kind);
  // transfer the right number of tokens to the user
  return async (dispatch) => {
    try {
      dispatch({ type: REDEEM });
      const response = await transferToCompany(kind, uuid);
      console.log('response from transfer to company', response);
      _redeemSuccess(dispatch, kind, userToken, uuid);
    } catch (err) {
      // @TODO: need better error handling here
      console.log('Failed to redeem', err);
      dispatch({ type: REDEEM_FAIL });
    }
  };
};

const _redeemSuccess = async (dispatch, kind, userToken, ostUUID) => {
  // doesn't seem like the balance is updated in time for me to get it.
  // store.dispatch(fetchBalance({ userToken, ostUUID }));
  
  dispatch({ type: REDEEM_SUCCESS, payload: kind });
};