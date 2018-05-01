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

export const getUserUUID = (userToken, callback) => {
  console.log('userToken', userToken);
    userToken = userToken || auth.currentUser.uid;
    return database.ref(`/users/${userToken}`)
      .on('value', snapshot => {
          callback(snapshot.val().uuid);
      });
}

export const storeOrder = (order) => {
  return database.ref(`users/${auth.currentUser.uid}/orders`).push(order);
}

export const getOrders = (userToken, callback) => {
  return database.ref(`users/${auth.currentUser.uid}/orders`)
    .on('value', snapshot => {
      callback(snapshot.val());
    });
}