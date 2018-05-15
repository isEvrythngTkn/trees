import NavigationService from '../../navigation/NavigationService';
import { transferToCompany } from '../../api/ost';
import { storeOrder } from '../../api/firebase';
import { 
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_FAIL
} from './types';
import { fetchBalance } from './OstActions';

export const userRedeems = ({ userToken, uuid, item }) => {
  const kind = item.transaction_kind;

  // transfer the right number of tokens to the user
  return async (dispatch) => {
    try {
      dispatch({ type: REDEEM, payload: item });
      const response = await transferToCompany(kind, uuid);
      //console.log('response from transfer to company', response);
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
    response_date: response.headers.date,
    created: Date.now(),
    completed: false
  };
  
  const successMessage = 'Your order was successfully processed. It will be ready for pick up in 15 minutes.';

  try {
    await storeOrder(order);
    NavigationService.navigate('OrderDetails', { ...order, orderTitle: item.title, successMessage });
    dispatch({ type: REDEEM_SUCCESS, payload: order });
  } catch (err) {
    // @TODO: need better error handling here
    console.log('Failed to store the order on Firebase', err);
  }
};