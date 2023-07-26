import { apiStatus, widgetCheckEligibleActionType } from '../../../actionTypes';

const initialState = {
  sendOTPApiState: apiStatus.NONE,
  verifyOTPApiState: apiStatus.NONE,
  sendNTBSmsState: apiStatus.NONE,
  errorMessage: '',
  isEligible: false,
  isNtbAllowed: false,
  isPreApproved: false,
  lenders: [],
};

const userActivation = (state = initialState, action) => {
  switch (action.type) {
    case widgetCheckEligibleActionType.INIT_CHECK_ELIGIBLE_WIDGET_SCREEN:
      return initialState;
    case widgetCheckEligibleActionType.WIDGET_SEND_OTP_REQUEST:
      return {
        ...state,
        errorMessage: '',
        sendOTPApiState: apiStatus.INITIATED,
      };
    case widgetCheckEligibleActionType.WIDGET_SEND_OTP_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        sendOTPApiState: apiStatus.SUCCESS,
      };
    case widgetCheckEligibleActionType.WIDGET_SEND_OTP_FAILURE:
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
        sendOTPApiState: apiStatus.ERROR,
      };
    case widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_REQUEST:
      return {
        ...state,
        errorMessage: '',
        verifyOTPApiState: apiStatus.INITIATED,
      };
    case widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_SUCCESS:
      const { isPreApproved, isEligible, isNtbAllowed, lenders } =
        action.payload || {};
      return {
        ...state,
        errorMessage: '',
        verifyOTPApiState: apiStatus.SUCCESS,
        isEligible,
        isNtbAllowed,
        isPreApproved,
        lenders,
      };
    case widgetCheckEligibleActionType.WIDGET_VERIFY_OTP_FAILURE: {
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
        verifyOTPApiState: apiStatus.ERROR,
      };
    }
    case widgetCheckEligibleActionType.WIDGET_NTB_SMS_INITIATE:
      return {
        ...state,
        errorMessage: '',
        sendNTBSmsState: apiStatus.INITIATED,
      };
    case widgetCheckEligibleActionType.WIDGET_NTB_SMS_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        sendNTBSmsState: apiStatus.SUCCESS,
      };
    case widgetCheckEligibleActionType.WIDGET_NTB_SMS_ERROR: {
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
        sendNTBSmsState: apiStatus.ERROR,
      };
    }
    default:
      return state;
  }
};

export default userActivation;
