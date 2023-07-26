import { ntbActionType } from '../../actionTypes';

export const sendOTPFailureAction = (responseData) => (dispatch) => {
  const { data } = responseData || {};
  const { message } = data || {};
  if (message) {
    dispatch({
      type: ntbActionType.SEND_OTP_FAILURE,
      payload: message,
    });
    setTimeout(() => {
      dispatch({
        type: ntbActionType.SEND_OTP_FAILURE,
        payload: '',
      });
    }, 3000);
  }
};
