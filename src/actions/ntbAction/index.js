//@flow
import actionType from './actionType';
import sendOTP from './sendOTP';
import verifyOTP from './verifyOTP';
import { sendOTPSuccessAction } from './sendOTPSuccessAction';
import { sendOTPFailureAction } from './sendOTPFailureAction';
import { verifyOTPSuccessAction } from './verifyOTPSuccessAction';
import { verifyOTPFailureAction } from './verifyOTPFailureAction';
import getLenderList from './getLenderList';
import { lenderListSuccessAction } from './lenderListSuccessAction';
import { lenderListFailureAction } from './lenderListFailureAction';
import { ntbActionType } from '../../actionTypes';

export default (action: string, actionPayload?: Object) => (
  dispatch: Function,
) => {
  switch (action) {
    case actionType.sendOTP: {
      const { mobile, merchantId, channel } = actionPayload || {};
      return dispatch(
        sendOTP(
          { mobile, merchantId, channel },
          sendOTPSuccessAction,
          sendOTPFailureAction,
        ),
      );
    }

    case actionType.verifyOTP: {
      const { mobile, otp, channel } = actionPayload || {};
      return dispatch(
        verifyOTP(
          { mobile, otp, channel },
          verifyOTPSuccessAction,
          verifyOTPFailureAction,
        ),
      );
    }

    case actionType.getLenderList: {
      const { mobile } = actionPayload || {};
      return dispatch(
        getLenderList(
          { mobile },
          lenderListSuccessAction,
          lenderListFailureAction,
        ),
      );
    }

    case actionType.closeOtpOverLayScreen: {
      return dispatch({
        type: ntbActionType.CLOSE_OTP_OVERLAY_SCREEN,
        payload: '',
      });
    }

    case actionType.initLenderListScreen: {
      return dispatch({
        type: ntbActionType.INIT_LENDER_LIST_SCREEN,
        payload: actionPayload,
      });
    }
    default:
      return null;
  }
};
