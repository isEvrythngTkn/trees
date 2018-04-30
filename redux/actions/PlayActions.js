import { transferToUser } from '../../api/ost';
import { 
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from './types';
import { fetchBalance } from './OstActions';
import store from '../store';

export const userPlays = ({ userToken, uuid, kind }) => {
  return (dispatch) => {
    dispatch({ type: USER_PLAYING });

    if (Math.random() >= 0.5) {
      userWins(dispatch, userToken, uuid, kind);
    } else {
      userLoses(dispatch);
    }
  };
};

const userWins = async (dispatch, userToken, uuid, kind) => {
  try {
    const response = await transferToUser(kind, uuid);
    console.log('response from transfer to user', response);
    dispatch({ type: USER_WIN, payload: kind });
  } catch (err) {
    console.log('Failed to transfer funds', err);
    // @TODO: need better error handling here
    // userLoses(dispatch);
  }
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