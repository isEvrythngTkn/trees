import queryString from 'query-string';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

import axios from 'axios';
import { API_KEY, SECRET } from '../config/ost';

ROOT_API_URL = 'https://playgroundapi.ost.com';

export const createUser = async (uid) => {
  const endpoint = '/users/create';
  const requestTimestamp = Date.now();
  const inputParams = {
    name: 'Paul'
  };

  const stringToSign = generateQueryString(endpoint, inputParams, requestTimestamp);
  const signature = generateApiSignature(stringToSign);
  console.log('SIGNATURE', signature);

  const url = `${ROOT_API_URL}${stringToSign}&signature=${signature}`;
  console.log('URL', url);

  axios.get(url)
    .then(function (response) {
      // response looks like: 
      // return {
      //     success: true,
      //     data: {
      //         name: 'blorg',
      //         uuid: 'f438hf894hh43heh',
      //         total_airdropped_tokens: 134,
      //         token_balance: 2000
      //     }
      // };
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
  // // not sure what buffer does, convert SECRET from UTF8 to binary?
  // var buff = new Buffer.from(SECRET, 'utf8');
  // // create's an hmac object that will encrypt in sha256, and use the SECRET/Buffer as the key
  // var hmac = crypto.createHmac('sha256', buff);
  // // signs the string using sha256 and the secret key
  // hmac.update(stringToSign);
  // // returns a string called the digest
  // return hmac.digest('hex');

  const hashDigest = sha256(stringToSign);
  const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, SECRET));
  return hmacDigest;
}


