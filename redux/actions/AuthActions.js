import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_USER_SUCCESS,
  FETCHED_OST_UUID,
  FETCHED_BALANCE,
  FETCHED_USER_TOKEN
} from './types';
import { createUser, getUserBalance, transferToUser } from '../../api/ost';
import { 
  register, 
  login,
  createUserRecordWithUUID,
  getUserUUID
} from '../../api/firebase';
import { TWENTY_FIVE, transactionKinds } from '../../constants/TransactionKinds';
import NavigationService from '../../navigation/NavigationService';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  //console.log('Login');
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    login({ email, password })
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        register({ email, password })
          .then(user => userCreateSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  console.log('loginUserFail');
  dispatch({ type: LOGIN_USER_FAIL });
};

const userCreateSuccess = async (dispatch, user) => {
  //console.log('User Create Success');
  // create a new user in OST
  // and store their OST UUID in Firebase
  try {
    const ostUUID = await createUser(user.uid);
    console.log('about to transfer to user 25 tokens');
    setTimeout(() => {
      transferToUser(TWENTY_FIVE, ostUUID);
    }, 4000);
    dispatch({ type: FETCHED_BALANCE, payload: transactionKinds[TWENTY_FIVE].amount });
    await createUserRecordWithUUID(ostUUID);
    dispatch({ type: CREATE_USER_SUCCESS, payload: { user, ostUUID } });
  } catch (err) {
    // @TODO: need better error handling here
    console.log('this failed miserably', err);
  }
};

const loginUserSuccess = async (dispatch, user) => {
  //console.log('loginUserSuccess');

  // probably need to get the OST UUID right here
  try {
    await getUserUUID(null, async (ostUUID) => {
      const balance = await getUserBalance(user.uid, ostUUID);
      dispatch({ type: FETCHED_BALANCE, payload: balance });
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, ostUUID } });
    });
  } catch(err) {
    console.log('failed to get the UUID', err);
  }
};

export const logoutUser = () => {
  NavigationService.navigate('Auth');
  return {
    type: LOGOUT_USER,
    payload: null
  };
};

export const ostUUIDFetched = (text) => {
  return {
    type: FETCHED_OST_UUID,
    payload: text
  };
};

export const userTokenFetched = text => {
  return {
    type: FETCHED_USER_TOKEN,
    payload: text
  };
}
