import {
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from '../actions/types';
import { transactionKinds } from '../../constants/TransactionKinds';

const INITIAL_STATE = { 
  amount: null,
  playing: false,
  won: false,
  lost: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PLAYING:
      return { ...INITIAL_STATE, playing: true };
    case USER_LOSE:
      return { ...state, amount: action.payload, lost: true, playing: false};
    case USER_WIN:
      const amount = transactionKinds[action.payload].amount;
      return { ...state, amount, won: true, playing: false };
    case PLAY_AGAIN:
      return { ...INITIAL_STATE};
    default:
      return state;
  }
};
