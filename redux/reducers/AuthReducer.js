import { AsyncStorage } from 'react-native';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = { 
  email: '', 
  password: '',
  loading: false,
  error: '',
  loggedIn: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      _signInAsync(action.payload.uid);
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    case LOGOUT_USER:
      console.log('LOGOUT USER');
      _signOutAsync();
      return INITIAL_STATE;
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