import { paymentConfirmActionType } from '../../actionTypes';
import PaymentController from '../../api/controllers/paymentController';
import showSnackBar from '../commonAction/showSnackBar';

export default () => (dispatch) => {
  dispatch({
    type: paymentConfirmActionType.RESEND_TRANSACTION_OTP_REQUEST,
    payload: {},
  });
  PaymentController.resendTransactionOtp()
    .then((response) => {
      const { message, otpSent, attemptsRemaining } = response.data || {};
      dispatch({
        type: paymentConfirmActionType.RESEND_TRANSACTION_OTP_SUCCESS,
        payload: { attemptsRemaining },
      });
      dispatch(
        showSnackBar({
          message,
          type: otpSent ? 'success' : 'error',
        }),
      );
    })
    .catch(({ error }) => {
      const { message } = error || {};
      dispatch(
        showSnackBar({
          message,
          type: 'error',
        }),
      );
    });
};
