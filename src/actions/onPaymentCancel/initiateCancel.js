import PaymentController from '../../api/controllers/paymentController';
import { paymentCancelActionType } from '../../actionTypes';

export const initiateCancelTransaction = () => (dispatch) => {
  dispatch({
    type: paymentCancelActionType.CANCEL_TRANSACTION_REQUEST,
    payload: {},
  });
  PaymentController.postCancelTransaction()
    .then(({ data: respData }) => {
      const { pgData, returnUrl } = respData || {};
      dispatch({
        type: paymentCancelActionType.CANCEL_TRANSACTION_SUCCESS,
        payload: { pgData, returnUrl },
      });
    })
    .catch((errorData) => {
      dispatch({
        type: paymentCancelActionType.CANCEL_TRANSACTION_ERROR,
        payload: {},
      });
    });
};
