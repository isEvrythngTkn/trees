import queryString from 'query-string';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { API_KEY, SECRET } from '../config/ost';

ROOT_API_URL = 'https://playgroundapi.ost.com';

export const createUser = async (uid) => {
  // @TODO: using the subString of the uid from Firebase 
  // is not production worthy.
  // Will probably need to create a Users table in a new
  // DB, and connect the full UID from Firebase with the
  // UID from OST.
  const name = uid.substring(0, 20);
  const endpoint = '/users/create';
  const inputParams = { name };
  const { url, requestData } = generateRequestUrlAndData(endpoint, inputParams);

  // Send data even tho the API docs don't mention it
  // https://help.ost.com/support/discussions/topics/35000004792
  axios.post(url, requestData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

generateRequestUrlAndData = (endpoint, inputParams) => {
  const requestTimestamp = Date.now();
  const stringToSign = generateQueryString(endpoint, inputParams, requestTimestamp);
  const signature = generateApiSignature(stringToSign);
  const url = `${ROOT_API_URL}${stringToSign}&signature=${signature}`;
  const requestData = {
    ...inputParams,
    api_key: API_KEY,
    request_timestamp: requestTimestamp,
    signature
  };
  return { url, requestData };
}

generateQueryString = (endpoint, inputParams, requestTimestamp) => {
  inputParams["api_key"] = API_KEY;
  inputParams["request_timestamp"] = requestTimestamp;
  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');
  const stringToSign = endpoint + '?' + queryParamsString;
  return stringToSign;
}

generateApiSignature = (stringToSign) => {
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET);
  hmac.update(stringToSign);
  const hash = hmac.finalize();
  return hash.toString();
}


