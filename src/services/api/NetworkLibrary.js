import { Observable } from 'rxjs/internal/Observable';
import Axios from 'axios';
import Utils, { setLocalStorage } from '../../utils';
import store from '../../store';
import { commonActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import { validateAndSetClientIdCookie } from '../../tracking/helper';
import { tracker } from '../../tracking';

export default class NetworkLibrary {
  static get(endpoint, queryParamsMap, requestHeader) {
    validateAndSetClientIdCookie();
    return Observable.create((observer) => {
      let headerObj = Object.assign(
        NetworkLibrary.getDefaultHeader(),
        requestHeader ? requestHeader : {},
      );

      let config = {
        headers: headerObj,
        params: queryParamsMap,
      };

      Axios.get(endpoint, config)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
          this.trackApiResponseIfError(endpoint, response);
        })
        .catch((error) => {
          if (!error.message) {
            console.error('unhandledApiErrorResponse', new Error(error));
          }
          observer.error(error);
          this.trackApiResponseIfError(endpoint, error.response);
        })
        .then(() => {
          setLocalStorage('userUUID', Utils.getCookie('userUUID')); // set userUUID in client Storage
          store.dispatch({
            type: commonActionType.STORE_DATA,
            payload: removeBlankKeys({
              userUUID: Utils.getCookie('userUUID'),
            }),
          });
        });
    });
  }

  static post(endpoint, requestBody, requestHeader) {
    validateAndSetClientIdCookie();
    return Observable.create((observer) => {
      let headerObj = Object.assign(
        NetworkLibrary.getDefaultHeader(),
        requestHeader ? requestHeader : {},
      );
      let config = { headers: headerObj };

      Axios.post(endpoint, requestBody, config)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
          this.trackApiResponseIfError(endpoint, response);
        })
        .catch((error) => {
          observer.error(error);
          this.trackApiResponseIfError(endpoint, error.response);
        })
        .then(() => {
          setLocalStorage('userUUID', Utils.getCookie('userUUID')); // set userUUID in client Storage
          store.dispatch({
            type: commonActionType.STORE_DATA,
            payload: removeBlankKeys({
              userUUID: Utils.getCookie('userUUID'),
            }),
          });
        });
    });
  }

  static getDefaultHeader() {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    Utils.getSessionCookie() !== undefined
      ? (headers['session-token'] = Utils.getSessionCookie())
      : null;
    Utils.getAuthToken() !== null
      ? (headers['x-flexpay-auth-key'] = Utils.getAuthToken())
      : null;
    Utils.getUserUUIDCookie() !== null
      ? (headers['userUUID'] = Utils.getUserUUIDCookie())
      : null;
    Utils.getPinAuthToken() &&
      (headers['pin-setup-auth-token'] = Utils.getPinAuthToken());
    return headers;
  }

  static trackApiResponseIfError(endpoint, response) {
    if (
      response &&
      response.status &&
      response.status === 200 &&
      response.data &&
      response.data.success
    ) {
      return;
    }
    let apiResponseCode =
      response && response.data && response.data.code ? response.data.code : 0;
    let httpResponseCode = response && response.status ? response.status : 0;
    tracker.trackApiError(endpoint, apiResponseCode, httpResponseCode);
  }
}
