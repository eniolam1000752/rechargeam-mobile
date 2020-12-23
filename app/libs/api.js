/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {globals} from './globals.js';

const BASE_URL = 'https://rechargeam-backend-test.herokuapp.com/api';

const ROUTES = {
  login: `${BASE_URL}/admin/pinLogin`,
  forget_password: `${BASE_URL}/admin/forgetPin`,
  registerDevice: `${BASE_URL}/admin/registerDevice`,
  addAdmin: `${BASE_URL}/admin/addAdmin`,
  getAdmins: `${BASE_URL}/getAdmins`,
  saveSettings: `${BASE_URL}/saveSettings`,
};

const API = {
  login: (payload) => request(ROUTES.login, payload, 'POST', {}),
  forgetPassword: (payload) =>
    request(ROUTES.forget_password, payload, 'POST', {}),
  registerDevice: (payload) =>
    request(ROUTES.registerDevice, payload, 'POST', {}),
  addAdmin: (payload) => request(ROUTES.addAdmin, payload, 'POST', {}),
  getAdmins: () => request(ROUTES.getAdmins, {}, 'GET', {}),
  saveSettings: (payload) => request(ROUTES.getAdmins, payload, 'POST', {}),
};

export const defaultHeader = {
  Accept: 'application/json',
  Authorization: 'Bearer ' + globals.token || '',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
};

export default function request(
  url,
  payload,
  method: 'POST' | 'GET',
  header: Record<string, any>,
) {
  defaultHeader.Authorization = `bearer ${globals.token}`;
  console.log('method: ', method);
  console.log('payload: ', payload);
  console.log('header: ', Object.assign(defaultHeader, header));

  if (/GET/g.test(method)) {
    const genUrl = () => {
      const payloadKeys = Object.keys(payload);
      return payloadKeys.length === 0
        ? url
        : payloadKeys.reduce(
            (cum, index, i) =>
              `${cum}${index}=${payload[index]}${
                i === payloadKeys.length - 1 ? '' : '&'
              }`,
            `${url}?`,
          );
    };

    genUrl();
    console.log('URL: ', url);
    return fetch(url, {
      method,
      headers: Object.assign(defaultHeader, header),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.code === 0) {
          console.log(`%c RESPONSE OF ${url}: `, 'green');
          console.log(jsonResponse);
          return jsonResponse;
        } else {
          console.log(`%c ERROR OF ${url}: `, 'red');
          console.log(jsonResponse);
          return new Promise((resp, reject) => {
            reject(jsonResponse);
          });
        }
      });
  } else {
    console.log('URL: ', url);
    return fetch(url, {
      method,
      headers: Object.assign(defaultHeader, header),
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.code === 0) {
          console.log(`%c RESPONSE OF ${url}: `, 'green');
          console.log(jsonResponse);
          return jsonResponse;
        } else {
          console.log(`%c ERROR OF ${url}: `, 'red');
          console.log(jsonResponse);
          return new Promise((resp, reject) => {
            reject(jsonResponse);
          });
        }
      });
  }
}

export {API};
