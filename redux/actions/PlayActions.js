import { transferToUser } from '../../api/ost';
import { 
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from './types';

export const userPlays = ({ uuid, kind }) => {
  console.log('User Plays!', uuid, kind);
  // transfer the right number of tokens to the user
  return (dispatch) => {
    try {
      dispatch({ type: USER_PLAYING });
      const response = transferToUser(kind, uuid);
      console.log('response from transfer to user', response);
      userWins(dispatch, kind);
    } catch (err) {
      // @TODO: need better error handling here
      console.log('Failed to transfer funds', err);
      userLoses(dispatch);
    }
  };
};

const userWins = (dispatch, kind) => {
  // payload is hardcoded for the moment
  // @TODO change payload to be variable
  dispatch({ type: USER_WIN, payload: 50 });
}

const userLoses = (dispatch) => {
  dispatch({ type: USER_LOSE });
}

export const playAgain = () => {
  return {
    type: PLAY_AGAIN,
    payload: null
  }
}