import {
  paymentConfirmActionType,
  PAYMENT_ERROR_DATA,
} from '../../actionTypes';
import PaymentController from '../../api/controllers/paymentController';
import apiErrorType from '../../api/apiErrorType';
import onTransactionErrorBlock from '../onTransactionErrorBlock';

export default (actionPayload) => (dispatch, getState) => {
  dispatch({
    type: paymentConfirmActionType.VERIFY_SECOND_FACTOR_REQUEST,
    payload: {},
  });
  const { config, paymentUserData } = getState();
  const { txnUuid } = config || {};
  const { selectedLender } = paymentUserData || {};
  const { lenderId } = selectedLender || {};
  const { aivfValue } = actionPayload || {};
  const data = { aivfValue };
  PaymentController.verifySecondFactor(data, {
    txnUuid,
    lenderId,
  })
    .then((response) => {
      const { txnSessionToken } = response.data || {};
      dispatch({
        type: paymentConfirmActionType.VERIFY_SECOND_FACTOR_SUCCESS,
        payload: { sessionToken: txnSessionToken },
      });
    })
    .catch(({ data }) => {
      const { message, errorData, errorCode, cta, errorType, helpText, title } =
        data || {};
      const { pgData, returnUrl } = errorData || {};

      dispatch({
        type: paymentConfirmActionType.VERIFY_SECOND_FACTOR_ERROR,
        payload: { errorMessage: message, pgData, returnUrl },
      });

      if (
        errorCode !== apiErrorType.PAYMENT_INVALID_AIVF &&
        errorCode !== apiErrorType.PAYMENT_INVALID_PIN
      ) {
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
