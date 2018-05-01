import NavigationService from '../../navigation/NavigationService';
import {
  REDEEM,
  REDEEM_SUCCESS,
  REDEEM_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  redeeming: false,
  item: null,
  order: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REDEEM:
      return { ...state, item: action.payload };
    case REDEEM_SUCCESS:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
