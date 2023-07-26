/* global window */
import { errorCode, errorTracking } from './standardErrors';
import store from '../../store';
import { removeBlankKeys } from '../../components/material-ui/helper';
import Utils, { getSessionStorage } from '../../utils';

const httpResponse = (status, data) => {
  if (status >= 300 || status < 200) {
    if (status === 401) {
      const errorData = {
        errorCode: 401,
        errorMessage: 'Authorization Fail',
      };
      return { status, data: errorData, statusText: 'FAIL' };
    }
    const { code } = data || {};
    const state = store.getState();
    const { config } = state || {};
    const { template } = config || {};
    const errorData = {
      ...data,
      errorCode: errorCode[template][codeDecorator(code)],
    };
    if (code) {
      errorTracking({
        errorName: errorCode[template][codeDecorator(code)],
        code,
        errorData,
      });
    }
    return { status, data: errorData, statusText: 'FAIL' };
  }
  return { status, data, statusText: 'OK' };
};

const codeDecorator = (code) => {
  const { paymentUserData } = store.getState();
  const { aivfType } = paymentUserData || {};
  if (aivfType === 'PIN') {
    if (code === 4105) {
      return 4104;
    } else if (code === 4303) {
      return 4302;
    } else {
      return code;
    }
  }
  return code;
};

const authenticationHeaders = () => {
  const { sessionToken, pinAuthToken, authToken, sessionId } =
    extractHeaders() || {};
  return removeBlankKeys({
    'session-token': sessionToken,
    'pin-setup-auth-token': pinAuthToken,
    'x-flexpay-auth-key': authToken,
    sessionId: sessionId,
    ...store.getState().widgetData.widgetHeaders,
  });
};
const extractHeaders = () => {
  const sessionToken = getSessionStorage('sessionToken');
  const pinAuthToken = getSessionStorage('pinAuthToken');
  const authToken = getSessionStorage('authToken');
  // SessionId header is used in NTB code.
  // Android Java code sets cookie value for a URL which is then read and used by javascript.
  const sessionId = Utils.getCookie('sessionId');
  return {
    sessionToken,
    pinAuthToken,
    authToken,
    sessionId,
  };
};

export { authenticationHeaders, httpResponse };
