import { widgetCheckEligibleActionType } from '../../actionTypes';

export const sendOTPFailureAction = (responseData) => (dispatch) => {
  const { data } = responseData || {};
  const { message } = data || {};
  if (message) {
    dispatch({
      type: widgetCheckEligibleActionType.WIDGET_SEND_OTP_FAILURE,
      payload: { errorMessage: message },
    });
  }
};
