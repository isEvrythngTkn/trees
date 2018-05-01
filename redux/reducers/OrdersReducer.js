import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL
} from '../actions/types';

const INITIAL_STATE = { 
  orders: {},
  fetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...INITIAL_STATE, fetching: true };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, fetching: false };
    case FETCH_ORDERS_FAIL:
      return { ...state, fetching: false };
    default:
      return state;
  }
};
