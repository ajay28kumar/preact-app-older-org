import actionType from './actionType';
import sendOTP from '../ntbAction/sendOTP';
import verifyOTP from '../ntbAction/verifyOTP';
import { sendOTPSuccessAction } from './sendOTPSuccessAction';
import { sendOTPFailureAction } from './sendOTPFailureAction';
import { verifyOTPSuccessAction } from './verifyOTPSuccessAction';
import { verifyOTPFailureAction } from './verifyOTPFailureAction';
import { widgetCheckEligibleActionType } from '../../actionTypes';
import { isMobileFormatValid } from '../../utils/mobileNumberValidation';
import sendNTBSms from './sendNTBSms';

export default (action: string, actionPayload?: Object) => (
  dispatch: Function,
) => {
  switch (action) {
    case actionType.initScreen:
      return dispatch({
        type: widgetCheckEligibleActionType.INIT_CHECK_ELIGIBLE_WIDGET_SCREEN,
        payload: {},
      });
    case actionType.sendOTP: {
      const { mobile, merchantId, channel } = actionPayload || {};

      if (!isMobileFormatValid(mobile)) {
        return dispatch(
          sendOTPFailureAction({ data: { message: 'Invalid Mobile Number' } }),
        );
      }
      dispatch({
        type: widgetCheckEligibleActionType.WIDGET_SEND_OTP_REQUEST,
        payload: {},
      });
      return dispatch(
        sendOTP(
          { mobile, merchantId, channel },
          sendOTPSuccessAction,
          sendOTPFailureAction,
        ),
      );
    }
    case actionType.verifyOTP: {
      const { amount, otp, mobile, channel } = actionPayload || {};
      dispatch({
        type: widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_REQUEST,
        payload: {},
      });
      return dispatch(
        verifyOTP(
          { amount, mobile, otp, channel },
          verifyOTPSuccessAction,
          verifyOTPFailureAction,
        ),
      );
    }
    case actionType.sendSMSLink:
      const { contactNumber } = actionPayload || {};
      return dispatch(sendNTBSms({ contactNumber }));
    default:
      return null;
  }
};
