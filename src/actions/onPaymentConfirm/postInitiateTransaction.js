import { paymentConfirmActionType } from '../../actionTypes';
import PaymentController from '../../api/controllers/paymentController';

import onTransactionErrorBlock from '../onTransactionErrorBlock';
import getTransactionInitSecondFactor from './getTransactionInitSecondFactor';

export default (aivfText) => (dispatch, getState) => {
  dispatch({
    type: paymentConfirmActionType.INITIATE_TRANSACTION_REQUEST,
    payload: {},
  });
  const { paymentUserData, paymentDetails, config } = getState();
  const { txnUuid } = config || {};
  const { mobile } = paymentDetails || {};
  const { aivfType: storedAivfType, selectedLender, selectedEmiDetails } =
    paymentUserData || {};
  const { lenderId } = selectedLender || {};
  const { loanDuration: emiTenure } = selectedEmiDetails || {};
  const data = {
    txnUUID: txnUuid,
    mobile,
    emiTenure,
    lenderId,
  };
  PaymentController.initiateTransaction(data)
    .then(({ data }) => {
      const { aivfType, aivfValue } = data || {};
      dispatch({
        type: paymentConfirmActionType.INITIATE_TRANSACTION_SUCCESS,
        payload: { aivfType, aivfValue: aivfValue || aivfText },
      });
    })
    .catch(({ data }) => {
      const { errorData, message, code, cta, errorType, helpText, title } =
        data || {};
      const { pgData, returnUrl } = errorData || {};

      dispatch({
        type: paymentConfirmActionType.INITIATE_TRANSACTION_ERROR,
        payload: { pgData, returnUrl },
      });
      if (code === 4303) {
        if (storedAivfType === 'NONE')
          dispatch(getTransactionInitSecondFactor());
        return dispatch({
          type: paymentConfirmActionType.VERIFY_SECOND_FACTOR_ERROR,
          payload: { errorMessage: message, pgData, returnUrl },
        });
      }

      dispatch(
        onTransactionErrorBlock({ cta, errorType, helpText, title, message }),
      );
    });
};
