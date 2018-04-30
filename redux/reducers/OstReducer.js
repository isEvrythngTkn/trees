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
  let newBalance;

  switch (action.type) {
    case FETCHED_BALANCE:
      return { ...state, balance: Number(payload) };
    case USER_WIN:
      newBalance = state.balance + transactionKinds[payload].amount;
      return { ...state, balance: newBalance };
    case REDEEM_SUCCESS:
      const transaction_kind = payload.transaction_kind;
      newBalance = state.balance - transactionKinds[transaction_kind].amount;
      return { ...state, balance: newBalance };
    default:
      return state;
  }
};