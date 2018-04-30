import { transferToCompany } from '../../api/ost';
import { storeOrder } from '../../api/firebase';
import { 
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_FAIL
} from './types';
import { fetchBalance } from './OstActions';
import store from '../store';

export const userRedeems = ({ userToken, uuid, item }) => {
  const kind = item.transaction_kind;

  // transfer the right number of tokens to the user
  return async (dispatch) => {
    try {
      dispatch({ type: REDEEM, payload: item });
      const response = await transferToCompany(kind, uuid);
      console.log('response from transfer to company', response);
      _redeemSuccess(dispatch, item, response);
    } catch (err) {
      // @TODO: need better error handling here
      console.log('Failed to redeem', err);
      dispatch({ type: REDEEM_FAIL });
    }
  };
};

const _redeemSuccess = async (dispatch, item, response) => {
  const order = {
    ...item,
    transaction_uuid: response.data.data.transaction_uuid,
    date: response.headers.date,
    completed: false
  };
  
  try {
    await storeOrder(order);
    dispatch({ type: REDEEM_SUCCESS, payload: order });
  } catch (err) {
    // @TODO: need better error handling here
    console.log('Failed to store the order on Firebase', err);
  }

  // doesn't seem like the balance is updated in time for me to get it.
  // store.dispatch(fetchBalance({ userToken, ostUUID }));
};