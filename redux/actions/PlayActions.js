import { 
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from './types';

export const userPlays = (text) => {
  return {
    type: USER_PLAYING,
    payload: null
  };
};

export const userWins = (text) => {
  return {
    type: USER_WIN,
    payload: text
  };
}

export const userLoses = (text) => {
  return {
    type: USER_LOSE,
    payload: 0
  };
}

export const playAgain = () => {
  return {
    type: PLAY_AGAIN,
    payload: null
  }
}