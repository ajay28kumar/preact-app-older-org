import { ntbActionType } from '../../actionTypes';

const initialState = {
  shouldShowOTPScreen: false,
  showShowLenderList: false,
  shouldShowServiceUnavailableModal: false,
  ntbDetails: {},
  message: '',
  redirectUrl: '',
  isNTBEnabledOnMerchant: false,
};

const ntbConfig = (state = initialState, action) => {
  switch (action.type) {
    case ntbActionType.INIT_OTP_SCREEN:
      return {
        ...state,
        shouldShowOTPScreen: true,
        message: '',
      };

    case ntbActionType.SEND_OTP:
      return {
        message: '',
      };

    case ntbActionType.SEND_OTP_FAILURE:
      return {
        message: action.payload,
      };

    case ntbActionType.VERIFY_OTP:
      return {
        ...state,
        message: '',
      };

    case ntbActionType.VERIFY_OTP_FAILURE:
      return {
        ...state,
        shouldShowOTPScreen: true,
        message: action.payload,
      };

    case ntbActionType.INIT_LENDER_LIST_SCREEN:
      const { redirectUrl, isNTBEnabledOnMerchant } = action.payload || {};
      return {
        ...state,
        showShowLenderList: true,
        ntbDetails: action.payload,
        redirectUrl,
        isNTBEnabledOnMerchant,
      };

    case ntbActionType.CLOSE_OTP_OVERLAY_SCREEN:
      return {
        ...state,
        shouldShowOTPScreen: false,
      };

    case ntbActionType.OPEN_SERVICE_UNAVAILABLE_MODAL:
      return {
        ...state,
        shouldShowOTPScreen: false,
        shouldShowServiceUnavailableModal: true,
        redirectUrl: action.payload.redirectUrl,
      };

    default:
      return state;
  }
};

export default ntbConfig;
