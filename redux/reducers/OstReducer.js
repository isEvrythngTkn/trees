import { 
  FETCHED_BALANCE
} from '../actions/types';

const INITIAL_STATE = { 
  balance: null
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;

  switch (action.type) {
    case FETCHED_BALANCE:
      return { ...state, balance: payload };
    default:
      return state;
  }
};