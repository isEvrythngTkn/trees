import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_USER_SUCCESS
} from './types';
import { createUser } from '../../api/ost';
import { 
  register, 
  login,
  createUserRecordWithUUID,
  getUserUUID
} from '../../api/firebase';

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
  console.log('Login');
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
  console.log('User Create Success');
  // create a new user in OST
  // and store their OST UUID in Firebase
  try {
    const ostUUID = await createUser(user.uid);
    await createUserRecordWithUUID(ostUUID);
    dispatch({ type: CREATE_USER_SUCCESS, payload: { user, ostUUID } });
  } catch (err) {
    // @TODO: need better error handling here
    console.log('this failed miserably', err);
  }
};

const loginUserSuccess = async (dispatch, user) => {
  console.log('loginUserSuccess');

  // probably need to get the OST UUID right here
  try {
    await getUserUUID(ostUUID => {
      console.log('ostUUID', ostUUID);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, ostUUID } });
    });
  } catch(err) {
    console.log('failed to get the UUID', err);
  }
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: null
  };
};
