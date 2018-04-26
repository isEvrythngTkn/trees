import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types';
import { register, login } from '../../api/firebase';

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
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  console.log('loginUserFail');
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  console.log('loginUserSuccess')
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: null
  };
};
