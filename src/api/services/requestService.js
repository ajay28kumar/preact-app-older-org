import { authenticationHeaders, httpResponse } from '../helpers';
import server from '../server';
import errorService from './errorService';
import Utils, { getLocalstorage, setLocalStorage } from '../../utils';
import store from '../../store';
import { commonActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import navToPath from './navToPath';
import { route } from 'preact-router';
import { getUtmCampaign } from '../../utils/lenderTheme';
import {
  USER_UUID_COOKIE_KEY,
  validateAndSetClientIdCookie,
} from '../../tracking/helper';
// import { tracker } from '../../tracking';

export default (
  query,
  request,
  decorator,
  errorDecorator,
  responseDecorator,
  configOverrides = {},
  endPoints, //It's an API endpoint in case of request Base URL contains some Personal Information of users (Type: String)
) =>
  new Promise((resolve, reject) => {
    validateAndSetClientIdCookie();
    // const networkStartCall = Date.now();
    server({
      ...request,
      headers: authenticationHeaders(),
      ...configOverrides,
    })
      .then((response) => {
        const { data } = responseDecorator
          ? responseDecorator(response)
          : response || {};
        const { success, nav } = data || {};
        const { next, data: navData } = nav || {};
        const { src } = navData || {};
        const path = navToPath[`${src}_${next}`];
        if (path) {
          if (next === 'BIC') {
            route(
              `${path}${
                getUtmCampaign() ? `?utm_campaign=${getUtmCampaign()}` : ''
              }`,
              true,
            );
          } else {
            route(path);
          }
        }
        if (success) {
          resolve(httpResponse(200, decorator(data)));
        } else {
          const { code, error, data: errorData } = data || {};
          const { message } = error || {};
          reject(
            httpResponse(400, {
              ...error,
              message,
              code,
              errorData: errorData,
            }),
          );
        }
      })
      .catch(errorService(reject))
      .then(() => {
        // const networkFinishCall = Date.now();
        // tracker.networkReport({
        //   path: endPoints || request.url,
        //   loadTime: networkFinishCall - networkStartCall,
        // });
        const userUUID =
          Utils.getCookie(USER_UUID_COOKIE_KEY) ||
          getLocalstorage(USER_UUID_COOKIE_KEY);
        setLocalStorage(USER_UUID_COOKIE_KEY, userUUID); // set userUUID in client Storage
        store.dispatch({
          type: commonActionType.STORE_DATA,
          payload: removeBlankKeys({
            userUUID: userUUID,
          }),
        });
      });
  });
