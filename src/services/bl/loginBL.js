import BeEndpoints from '../end-points/be-endpoints';
import { catchError } from 'rxjs/operators';
import NetworkLibrary from '../api/NetworkLibrary';
import { map } from 'rxjs/internal/operators/map';
import Utils, {
  clearSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from '../../utils';
import { removeThemeData, storeLenderTheme } from '../../utils/lenderTheme';
import { Observable } from 'rxjs/internal/Observable';
import { tracker } from '../../tracking';

export function getLoginAuthType(mobile, gatewayMerchantId) {
  let requestBody = {
    mobile: String(mobile),
    gatewayMerchantId: gatewayMerchantId ? gatewayMerchantId : null,
  };
  let url = BeEndpoints.BASE_BE_URL + BeEndpoints.INITIATE_LOGIN;

  return NetworkLibrary.post(url, requestBody).pipe(
    map((response) => {
      if (response.success === false) {
        throw response;
      }
      return response.data;
    }),
  );
}

export function login(mobile, authType, authValue, gatewayMerchantId = null) {
  let requestBody = {
    mobile: parseInt(mobile),
    authValue,
    gatewayMerchantId,
  };
  let url = BeEndpoints.BASE_BE_URL + BeEndpoints.COMPLETE_LOGIN;

  return NetworkLibrary.post(url, requestBody).pipe(
    map((response) => {
      if (response.success === false) {
        throw response;
      }
      const { data } = response || {};
      const { authToken, theme, lenderLogo, lenderIcon } = data || {};

      Utils.saveAuthToken(authToken);
      setLocalStorage('userRegistered', 'true');
      setSessionStorage('authToken', authToken);
      storeLenderTheme(theme, { lenderLogo, lenderIcon });
      tracker.pushUserProfile();
      return data;
    }),
  );
}

export function logout() {
  removeThemeData();
  clearSessionStorage();

  if (!Utils.getAuthToken()) {
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
  }

  let url = BeEndpoints.BASE_BE_URL + BeEndpoints.LOGOUT;
  return NetworkLibrary.post(url, '')
    .pipe(
      catchError((err) => {
        Utils.deleteAuthToken();
        throw err;
      }),
    )
    .pipe(
      map((response) => {
        if (response.success === false) {
          Utils.deleteAuthToken();
        }
        return response;
      }),
    );
}
