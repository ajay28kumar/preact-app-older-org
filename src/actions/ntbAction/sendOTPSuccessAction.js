import { ntbActionType } from '../../actionTypes';

export const sendOTPSuccessAction = (responseData) => (dispatch) => {
  const { message } = responseData || {};
  if (message === 'success') {
    dispatch({
      type: ntbActionType.INIT_OTP_SCREEN,
      payload: { responseData },
    });
  } else {
    const errorMessage = message;
    dispatch({
      type: ntbActionType.SEND_OTP_FAILURE,
      payload: { errorMessage },
    });
  }
};
