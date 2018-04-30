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
  console.log('User Plays!', uuid, kind);
  // transfer the right number of tokens to the user
  return async (dispatch) => {
    try {
      dispatch({ type: USER_PLAYING });
      const response = await transferToUser(kind, uuid);
      console.log('response from transfer to user', response);
      userWins(dispatch, kind, uuid, userToken);
    } catch (err) {
      // @TODO: need better error handling here
      console.log('Failed to transfer funds', err);
      userLoses(dispatch);
    }
  };
};

const userWins = (dispatch, kind, ostUUID, userToken) => {
  // payload is hardcoded for the moment
  // @TODO change payload to be variable
  
  // doesn't seem like the balance is updated in time for me to get it.
  // store.dispatch(fetchBalance({ userToken, ostUUID }));
  
  dispatch({ type: USER_WIN, payload: kind });
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