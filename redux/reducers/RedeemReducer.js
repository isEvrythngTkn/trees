import {
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  redeeming: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REDEEM:
      return { ...state };
    default:
      return state;
  }
};
