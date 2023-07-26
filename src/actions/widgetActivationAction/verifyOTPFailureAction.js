import { widgetCheckEligibleActionType } from '../../actionTypes';

export const verifyOTPFailureAction = (responseData) => (dispatch) => {
  const { data } = responseData || {};
  const { message } = data || {};
  if (data) {
    dispatch({
      type: widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_FAILURE,
      payload: { errorMessage: message },
    });
  }
};
