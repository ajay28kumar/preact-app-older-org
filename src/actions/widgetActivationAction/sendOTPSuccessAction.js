import { widgetCheckEligibleActionType } from '../../actionTypes';

export const sendOTPSuccessAction = (responseData) => (dispatch) => {
  const { message } = responseData || {};
  if (message === 'success') {
    dispatch({
      type: widgetCheckEligibleActionType.WIDGET_SEND_OTP_SUCCESS,
      payload: { responseData },
    });
  } else {
    const errorMessage = message;
    dispatch({
      type: widgetCheckEligibleActionType.WIDGET_SEND_OTP_FAILURE,
      payload: { errorMessage },
    });
  }
};
