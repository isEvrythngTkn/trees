import {
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from '../actions/types';

const INITIAL_STATE = { 
  amount: null,
  playing: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PLAYING:
      return { ...state, playing: true};
    case USER_LOSE:
      return { ...state, amount: action.payload, playing: false};
    case USER_WIN:
      return { ...state, amount: action.payload, playing: false };
    case PLAY_AGAIN:
      return { ...INITIAL_STATE};
    default:
      return state;
  }
};
