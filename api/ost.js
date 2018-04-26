import queryString from 'query-string';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { API_KEY, SECRET } from '../config/ost';

ROOT_API_URL = 'https://playgroundapi.ost.com';

export const createUser = async (uid) => {
  const endpoint = '/users/create';
  const requestTimestamp = Date.now();
  const name = 'alex';
  const inputParams = { name };

  const stringToSign = generateQueryString(endpoint, inputParams, requestTimestamp);
  const signature = generateApiSignature(stringToSign);
  console.log('SIGNATURE', signature);

  const url = `${ROOT_API_URL}${stringToSign}&signature=${signature}`;
  console.log('URL', url);

  // Send data even tho the API docs don't mention it
  // https://help.ost.com/support/discussions/topics/35000004792
  
  axios.post(url, {
    api_key: API_KEY,
    name,
    request_timestamp: requestTimestamp,
    signature
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};



generateQueryString = (endpoint, inputParams, requestTimestamp) => {
  inputParams["api_key"] = API_KEY;
  inputParams["request_timestamp"] = requestTimestamp;
  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');
  const stringToSign = endpoint + '?' + queryParamsString;
  console.log(stringToSign);
  return stringToSign;
}

generateApiSignature = (stringToSign) => {
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET);
  hmac.update(stringToSign);
  const hash = hmac.finalize();
  return hash.toString();
}


