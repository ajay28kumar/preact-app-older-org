import { paymentConfirmActionType } from '../../actionTypes';
import PaymentController from '../../api/controllers/paymentController';
import { tracker } from '../../tracking';

import onTransactionErrorBlock from '../onTransactionErrorBlock';

export default () => (dispatch, getState) => {
  const { config, paymentUserData } = getState();
  const { txnUuid } = config || {};
  const { selectedLender } = paymentUserData || {};
  const { lenderId } = selectedLender || {};
  dispatch({
    type: paymentConfirmActionType.INITIATE_SECOND_FACTOR_REQUEST,
    payload: {},
  });
  PaymentController.initiateSecondFactor({
    txnUuid,
    lenderId,
  })
    .then((response) => {
      const { aivfType, aivfDetails } = response.data || {};
      dispatch({
        type: paymentConfirmActionType.INITIATE_SECOND_FACTOR_SUCCESS,
        payload: { aivfType, aivfDetails },
      });
    })
    .catch(({ data }) => {
      const { errorData, message, cta, errorType, helpText, title } =
        data || {};
      const { pgData, returnUrl } = errorData || {};

      dispatch({
        type: paymentConfirmActionType.INITIATE_SECOND_FACTOR_ERROR,
        payload: { pgData, returnUrl },
      });
      dispatch(
        onTransactionErrorBlock({ cta, errorType, helpText, title, message }),
      );
    })
    .then(() => {
      //creating a profile for user
      tracker.pushUserProfile();
    });
};
