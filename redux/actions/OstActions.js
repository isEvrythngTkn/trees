import { 
  FETCH_BALANCE,
  FETCHED_BALANCE
} from './types';
import { getUserBalance } from '../../api/ost';

export const fetchBalance = ({ userToken, ostUUID }) => {
  // transfer the right number of tokens to the user
  return async (dispatch) => {
    try {
      const balance = await getUserBalance(userToken, ostUUID);
      //console.log('response from fetch Balance', balance);
      fetchedBalance(dispatch, balance);
    } catch (err) {
      // @TODO: need better error handling here
      console.log('Failed to transfer funds', err);
      userLoses(dispatch);
    }
  };
};

const fetchedBalance = (dispatch, payload) => {
  dispatch({ type: FETCHED_BALANCE, payload: payload });
}