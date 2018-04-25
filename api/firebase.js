import { auth } from "../config/firebase";

//Register the user using email and password
export const register = (data, callback) => {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password);
}

//Sign the user in with their email and password
export const login = (data, callback) => {
  const { email, password } = data;
  return auth.signInWithEmailAndPassword(email, password);
}
