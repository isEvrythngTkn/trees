import { AsyncStorage } from 'react-native';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_USER_SUCCESS,
  FETCHED_OST_UUID
} from '../actions/types';

const INITIAL_STATE = { 
  email: '', 
  password: '',
  loading: false,
  error: '',
  user: null,
  ostUUID: null
};

export default (state = INITIAL_STATE, action) => {
  //console.log('action', action);
  // console.log(action);
  const payload = action.payload;

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: payload };
    case PASSWORD_CHANGED:
      return { ...state, password: payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      _signInAsync(payload.user.uid);
      return { ...state, ...INITIAL_STATE, user: payload.user, ostUUID: payload.ostUUID };
    case CREATE_USER_SUCCESS:
      _signInAsync(payload.user.uid);
      console.log('user and ostUUID', payload.user, payload.ostUUID);
      return { ...state, ...INITIAL_STATE, user: payload.user, ostUUID: payload.ostUUID };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    case LOGOUT_USER:
      console.log('LOGOUT USER');
      _signOutAsync();
      return { ...INITIAL_STATE };
    case FETCHED_OST_UUID:
      console.log('FETCHED_OST_UUID', payload);
      return { ...state, ostUUID: payload };
    default:
      return state;
  }
};

_signInAsync = async (uid) => {
  await AsyncStorage.setItem('userToken', uid);
};

_signOutAsync = async () => {
  await AsyncStorage.clear();
};