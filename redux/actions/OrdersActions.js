import { getOrders } from '../../api/firebase';
import { 
  FETCH_ORDERS, 
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from './types';

export const ordersFetch = (userToken) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ORDERS });
    try {
      getOrders(userToken, (orders) => {
        dispatch({ type: FETCH_ORDERS_SUCCESS, payload: orders });
      });
    } catch (err) {
      dispatch({ type: FETCH_ORDERS_FAIL, payload: err });
    }    
  };
};