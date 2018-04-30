import { 
  FETCHED_BALANCE,
  USER_WIN,
  REDEEM_SUCCESS
} from '../actions/types';
import { transactionKinds } from '../../constants/TransactionKinds';

const INITIAL_STATE = { 
  balance: 0
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  console.log('payload:', payload);
  console.log('transactionKinds', transactionKinds);
  let newBalance;

  switch (action.type) {
    case FETCHED_BALANCE:
      console.log('updating balance', typeof payload, payload);
      return { ...state, balance: Number(payload) };
    case USER_WIN:
      newBalance = state.balance + transactionKinds[payload].amount;
      console.log('newBalance', typeof newBalance, newBalance);
      return { ...state, balance: newBalance };
    case REDEEM_SUCCESS:
      newBalance = state.balance - transactionKinds[payload].amount;
      return { ...state, balance: newBalance };
    default:
      return state;
  }
};