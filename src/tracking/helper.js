import Utils, { getLocalstorage, setLocalStorage } from '../utils';
import store from '../store';
import { commonActionType } from '../actionTypes';
import { removeBlankKeys } from '../components/material-ui/helper';
export const CLIENT_ID_COOKIE_KEY = 'clientId';
export const USER_UUID_COOKIE_KEY = 'userUUID';

export const validateAndSetClientIdCookie = () => {
  let clientId =
    Utils.getCookie(CLIENT_ID_COOKIE_KEY) ||
    getLocalstorage(CLIENT_ID_COOKIE_KEY);
  if (!clientId) {
    clientId = store.getState().config.clientId || Utils.generateUUID();
    setClientIdCookie(clientId);
  }
  return clientId;
};

export const setClientIdCookie = (cookieValue) => {
  if (cookieValue) {
    Utils.setCookie(
      CLIENT_ID_COOKIE_KEY,
      cookieValue,
      'Fri, 31 Dec 9999 23:59:59 GMT',
      process.env.PREACT_APP_COOKIE_BASE_PATH,
      '/',
    );
    store.dispatch({
      type: commonActionType.STORE_DATA,
      payload: removeBlankKeys({
        clientId: cookieValue,
      }),
    });
    setLocalStorage(CLIENT_ID_COOKIE_KEY, cookieValue);
  }
};

export const setUserUUIDCookie = () => {
  const cookieValue = Utils.generateUUID();
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000); //setting cookies for 365 days
  const expiry = d.toUTCString();
  Utils.setCookie(
    USER_UUID_COOKIE_KEY,
    cookieValue,
    expiry,
    process.env.PREACT_APP_COOKIE_BASE_PATH,
    '/',
  );
  store.dispatch({
    type: commonActionType.STORE_DATA,
    payload: removeBlankKeys({
      userUUID: cookieValue,
    }),
  });
  setLocalStorage(USER_UUID_COOKIE_KEY, cookieValue);
};
