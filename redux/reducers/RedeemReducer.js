import {
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  redeeming: false,
  item: null,
  currentOrder: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REDEEM:
      return { ...state, item: action.payload };
    case REDEEM_SUCCESS:
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
};
