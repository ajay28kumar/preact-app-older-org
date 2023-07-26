import PaymentController from '../../api/controllers/paymentController';
import showSnackBar from '../commonAction/showSnackBar';

export default () => (dispatch, getState) => {
  const { paymentDetails, paymentUserData } = getState() || {};
  const { mobile } = paymentDetails || {};
  const { selectedLender } = paymentUserData || {};
  const { lenderId } = selectedLender || {};
  const data = {
    mobile,
    lenderId,
  };
  PaymentController.forgotPin(data)
    .then(({ data }) => {
      const { message } = data || {};
      dispatch(
        showSnackBar({
          type: 'success',
          message,
        }),
      );
    })
    .catch(({ data }) => {
      const { message } = data || {};
      dispatch(
        showSnackBar({
          message,
          type: 'error',
        }),
      );
    });
};
