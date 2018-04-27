import { auth, database } from "../config/firebase";

//Register the user using email and password
export const register = (data) => {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password);
}

//Sign the user in with their email and password
export const login = (data) => {
  const { email, password } = data;
  return auth.signInWithEmailAndPassword(email, password);
}

export const createUserRecordWithUUID = (uuid) => {
    return database.ref(`users/${auth.currentUser.uid}`).set({ uuid });
}

export const getUserUUID = (callback) => {
    return database.ref(`/users/${auth.currentUser.uid}`)
        .on('value', snapshot => {
            callback(snapshot.val().uuid);
        });
}