import { widgetCheckEligibleActionType } from '../../actionTypes';

export const verifyOTPSuccessAction = (responseData) => (dispatch) => {
  const { message, emiInfoResponse } = responseData || {};
  const { isPreApproved, isEligible, isNtbAllowed, lenders } = emiInfoResponse;
  if (message === 'success') {
    dispatch({
      type: widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_SUCCESS,
      payload: { isPreApproved, isNtbAllowed, isEligible, lenders },
    });
  } else {
    dispatch({
      type: widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_FAILURE,
      payload: { errorMessage: message },
    });
  }
};
