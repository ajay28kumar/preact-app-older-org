import registrationController from '../../api/controllers/registrationController';
import {
  registrationConfirmActionType,
  registrationInitActionType,
} from '../../actionTypes';
import Utils, { setLocalStorage, setSessionStorage } from '../../utils';
import apiErrorType from '../../api/apiErrorType';
import { tracker } from '../../tracking';
import onLoginSuccess from '../onLogin/onLoginSuccess';

export default ({ source, otp, mobile, lenderId }) => (dispatch) => {
  const payload = {
    otp,
    mobile,
    lenderId,
    nav: { src: source },
  };
  dispatch({
    type: registrationConfirmActionType.POST_REGISTRATION_CONFIRM_REQUEST,
    payload: {},
  });
  registrationController
    .postVerifyMobile(payload)
    .then(({ data }) => {
      dispatch({
        type: registrationConfirmActionType.POST_REGISTRATION_CONFIRM_SUCCESS,
        payload: {},
      });
      const { sessionId, authToken } = data;
      dispatch(onLoginSuccess({ authToken, mobile: parseInt(mobile) }));
      setSessionStorage('sessionId', sessionId);
    })
    .catch(({ data }) => {
      const { message, errorCode } = data || {};
      if (
        errorCode === apiErrorType.ACTIVATION_USER_TEMPORARY_BLOCK ||
        errorCode === apiErrorType.ACTIVATION_EXHAUSTED
      ) {
        return dispatch({
          type: registrationInitActionType.POST_REGISTRATION_INITIATE_ERROR,
          payload: {
            errorMessage: message,
          },
        });
      }
      dispatch({
        type: registrationConfirmActionType.POST_REGISTRATION_CONFIRM_ERROR,
        payload: {
          errorMessage: message,
        },
      });
    });
};
