import { completeLoginController } from '../../api/controllers/loginController';
import { loginActionType } from '../../actionTypes';
import apiErrorType from '../../api/apiErrorType';
import { ErrorMessage } from '../../utils/errorMessage';
import Utils, { setLocalStorage, setSessionStorage } from '../../utils';
import { tracker } from '../../tracking';
import onLoginSuccess from './onLoginSuccess';

export const initiateAuth = ({ mobile, authValue, gatewayMerchantId }) => (
  dispatch,
) => {
  dispatch({
    type: loginActionType.VERIFY_AUTH_REQUEST,
    payload: {},
  });
  completeLoginController({ mobile, authValue, gatewayMerchantId })
    .then(({ data: respData }) => {
      const { authToken } = respData || {};
      dispatch(onLoginSuccess({ authToken, mobile }));
    })
    .catch(({ data: errorData }) => {
      const { errorCode, message } = errorData || {};
      let errorMessage = message;
      if (errorCode === apiErrorType.LOGIN_INVALID_AUTH) {
        errorMessage = 'Please enter a valid OTP';
      } else if (errorCode === apiErrorType.LOGIN_BLOCKED_MAX_ATTEMPTS) {
        errorMessage = ErrorMessage.LOGIN_BLOCKED;
      }
      dispatch({
        type: loginActionType.VERIFY_AUTH_ERROR,
        payload: { errorMessage },
      });
    });
};
