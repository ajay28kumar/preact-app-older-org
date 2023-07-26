import {
  paymentConfirmActionType,
  PAYMENT_ERROR_DATA,
} from '../../actionTypes';
import PaymentController from '../../api/controllers/paymentController';
import apiErrorType from '../../api/apiErrorType';
import Utils, { setLocalStorage, setSessionStorage } from '../../utils';

import onTransactionErrorBlock from '../onTransactionErrorBlock';

export default (actionPayload) => (dispatch, getState) => {
  const { config } = getState();
  const { txnUuid } = config || {};
  const { otp, isLenderTxnAndICRegistrationTnCAccepted } = actionPayload;
  const data = {
    otp,
    txnUUID: txnUuid,
    isLenderTxnAndICRegistrationTnCAccepted,
  };
  dispatch({
    type: paymentConfirmActionType.CONFIRM_TRANSACTION_REQUEST,
    payload: {},
  });
  return PaymentController.confirmTransaction(data)
    .then((resp) => {
      const { authToken, pgData, returnUrl } = resp.data || {};
      setLocalStorage('userRegistered', 'true');
      setSessionStorage('authToken', authToken);
      Utils.saveAuthToken(authToken);
      dispatch({
        type: paymentConfirmActionType.CONFIRM_TRANSACTION_SUCCESS,
        payload: { pgData, returnUrl },
      });
    })
    .catch(({ data }) => {
      const { message, errorData, errorCode, cta, errorType, helpText, title } =
        data || {};
      const { pgData, returnUrl } = errorData || {};

      dispatch({
        type: paymentConfirmActionType.CONFIRM_TRANSACTION_ERROR,
        payload: { errorMessage: message, pgData, returnUrl },
      });

      if (errorCode !== apiErrorType.PAYMENT_INVALID_OTP) {
        dispatch({
          type: PAYMENT_ERROR_DATA,
          payload: { errorMessage: '' },
        });
        dispatch(
          onTransactionErrorBlock({ cta, errorType, helpText, title, message }),
        );
      }
    });
};
