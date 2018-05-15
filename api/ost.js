import queryString from 'query-string';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { 
  API_KEY, 
  SECRET, 
  COMPANY_UUID, 
  ROOT_API_URL 
} from '../config/ost';

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
  try{
    console.log('About to create a user', url, requestData);
    const response = await axios.post(url, requestData);
    console.log('User created. Response: ', response);
    return response.data.data.economy_users[0].uuid;
  } catch (err) {
    console.log(err);
  }
};

export const transferToUser = async (kind, userUUID) => {
  const response = await _transfer(kind, COMPANY_UUID, userUUID);
  console.log('Response from company to user transaction', response);
  return response;
};

export const transferToCompany = async(kind, userUUID) => {
  const response = await _transfer(kind, userUUID, COMPANY_UUID);
  console.log('Response from user to company transaction', response);
  return response;
}

const _transfer = async (kind, fromUUID, toUUID) => {
  const endpoint = '/transaction-types/execute';
  inputParams = {
    from_uuid: fromUUID,
    to_uuid: toUUID,
    transaction_kind: kind
  };
  
  const { url, requestData } = generateRequestUrlAndData(endpoint, inputParams);

  try{
    console.log('About to transfer tokens', url, requestData);
    return await axios.post(url, requestData);
  } catch (err) {
    console.log(err);
  }
}

export const getUserBalance = async (fireBaseUid, OstUuid) => {
  const endpoint = '/users/edit';
  const name = fireBaseUid.substring(0, 20);
  const { url, requestData } = generateRequestUrlAndData(endpoint, { uuid: OstUuid, name });

  try{
    const response = await axios.post(url, requestData);
    console.log('response from getUserBalance request', response);
    return response.data.data.economy_users[0].token_balance;
  } catch (err) {
    console.log(err);
  }
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
    signature: signature
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


