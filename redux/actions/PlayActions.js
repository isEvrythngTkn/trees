import { transferToUser } from '../../api/ost';
import { 
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from './types';
import { fetchBalance } from './OstActions';

export const userPlays = ({ userToken, uuid, kind }) => {
  return (dispatch) => {
    dispatch({ type: USER_PLAYING });

    //if (Math.random() >= 0.5) {
    userWins(dispatch, uuid, kind);
    //} else {
    //  userLoses(dispatch);
    // }
  };
};

const userWins = async (dispatch, uuid, kind) => {
  try {
    const response = await transferToUser(kind, uuid);
    console.log('response from transfer to user', response);
    // forced delay so it seems like something is happening
    setTimeout(() => {
      dispatch({ type: USER_WIN, payload: kind });  
    }, 0);
    
  } catch (err) {
    console.log('Failed to transfer funds', err);
    // @TODO: need better error handling here
    // userLoses(dispatch);
  }
}

const userLoses = (dispatch) => {
  setTimeout(() => {
    dispatch({ type: USER_LOSE });
  }, 5000);
}

export const playAgain = () => {
  return {
    type: PLAY_AGAIN,
    payload: null
  }
}