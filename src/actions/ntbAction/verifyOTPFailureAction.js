import { ntbActionType } from '../../actionTypes';

export const verifyOTPFailureAction = (responseData) => (dispatch) => {
  const { data } = responseData || {};
  const { message } = data || {};
  if (data) {
    dispatch({
      type: ntbActionType.VERIFY_OTP_FAILURE,
      payload: message,
    });
    setTimeout(() => {
      dispatch({
        type: ntbActionType.VERIFY_OTP_FAILURE,
        payload: '',
      });
    }, 3000);
  }
};
