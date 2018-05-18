import { transferToUser } from '../../api/ost';
import { 
  USER_PLAYING,
  USER_LOSE,
  USER_WIN,
  PLAY_AGAIN
} from './types';
import { fetchBalance } from './OstActions';
import { wins } from '../../constants/TransactionKinds';

export const userPlays = ({ userToken, uuid, kind }) => {
  return (dispatch) => {
    dispatch({ type: USER_PLAYING });

    const index = getRandomArbitrary(0, 3);
    kind = wins[index];
    if (Math.random() >= 0.3) {
      userWins(dispatch, uuid, kind);
    } else {
      userLoses(dispatch);
    }
  };
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * max) + min;
}

const userWins = async (dispatch, uuid, kind) => {
  try {
    const response = await transferToUser(kind, uuid);
    //console.log('response from transfer to user', response);
    // forced delay so it seems like something is happening
    setTimeout(() => {
      dispatch({ type: USER_WIN, payload: kind });  
    }, 4000);
    
  } catch (err) {
    console.log('Failed to transfer funds', err);
    // @TODO: need better error handling here
    // userLoses(dispatch);
  }
}

const userLoses = (dispatch) => {
  setTimeout(() => {
    dispatch({ type: USER_LOSE });
  }, 4000);
}

export const playAgain = () => {
  return {
    type: PLAY_AGAIN,
    payload: null
  }
}
