import {
  apiStatus,
  commonActionType,
  lenderListActionType,
  PAYMENT_ERROR_DATA,
  paymentCancelActionType,
  paymentConfirmActionType,
  paymentEmiActionType,
  paymentInitActionType,
} from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';

const initialState = {
  aivfType: '',
  aivfValue: '',
  initiateAivfApiState: '',
  confirmAivfApiState: '',
  initiateTransactionApiState: '',
  confirmOtpApiState: '',
  returnUrl: '',
  errorMessage: '',
  resendOtp: {},
  selectedLender: {},
  lenderDetails: {},
  selectedEmiDetails: {},
  pgData: {},
  aivfDetails: {},
};

//TODO: Create a new reducer to handle error Data of transaction flow

const paymentUserData = (state = initialState, action) => {
  switch (action.type) {
    case lenderListActionType.SELECT_LENDER:
      const { selectedLender } = action.payload || {};
      return {
        ...state,
        selectedLender,
      };
    case paymentEmiActionType.SELECT_EMI:
      const { selectedEmiDetails } = action.payload || {};
      return {
        ...state,
        selectedEmiDetails,
      };
    case paymentEmiActionType.CLOSED_BENEFIT_MODEL: {
      const { selectedLender } = state || {};
      return {
        ...state,
        selectedLender: {
          ...selectedLender,
          closedBenefitModel: true,
        },
      };
    }
    case paymentInitActionType.TRANSACTION_INFO_SUCCESS: {
      const { lenderDetails, selectedLender } = action.payload;
      if (lenderDetails) {
        return {
          ...state,
          lenderDetails,
        };
      }
      if (selectedLender) {
        return {
          ...state,
          selectedLender,
        };
      }
      return state;
    }
    case paymentInitActionType.TRANSACTION_INFO_PRE_SELECTED_SUCCESS: {
      const { selectedLender, selectedEmiDetails } = action.payload || {};
      return {
        ...state,
        selectedLender,
        selectedEmiDetails,
      };
    }
    case paymentConfirmActionType.INITIATE_SECOND_FACTOR_REQUEST:
      return {
        ...state,
        errorMessage: '',
        initiateAivfApiState: apiStatus.INITIATED,
      };
    case paymentConfirmActionType.INITIATE_SECOND_FACTOR_SUCCESS:
      const { aivfType, aivfDetails } = action.payload || {};
      return {
        ...state,
        errorMessage: '',
        initiateAivfApiState: apiStatus.SUCCESS,
        initiateTransactionApiState: '',
        confirmOtpApiState: '',
        confirmAivfApiState: '',
        aivfType,
        aivfDetails,
      };
    case paymentConfirmActionType.INITIATE_SECOND_FACTOR_ERROR: {
      const { errorMessage, pgData, returnUrl } = action.payload || {};
      return {
        ...state,
        initiateAivfApiState: apiStatus.ERROR,
        pgData: pgData || state.pgData,
        returnUrl: returnUrl || state.returnUrl,
        errorMessage: errorMessage || state.errorMessage,
      };
    }
    case paymentConfirmActionType.VERIFY_SECOND_FACTOR_REQUEST:
      return {
        ...state,
        errorMessage: '',
        confirmAivfApiState: apiStatus.INITIATED,
      };
    case paymentConfirmActionType.VERIFY_SECOND_FACTOR_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        confirmAivfApiState: apiStatus.SUCCESS,
      };
    case paymentConfirmActionType.VERIFY_SECOND_FACTOR_ERROR:
      const { errorMessage, pgData, returnUrl } = action.payload || {};
      return {
        ...state,
        confirmAivfApiState: apiStatus.ERROR,
        pgData: pgData || state.pgData,
        returnUrl: returnUrl || state.returnUrl,
        errorMessage: errorMessage || state.errorMessage,
      };
    case paymentConfirmActionType.INITIATE_TRANSACTION_REQUEST:
      return {
        ...state,
        errorMessage: '',
        initiateTransactionApiState: apiStatus.INITIATED,
      };
    case paymentConfirmActionType.INITIATE_TRANSACTION_SUCCESS: {
      return {
        ...state,
        ...removeBlankKeys(action.payload),
        errorMessage: '',
        initiateTransactionApiState: apiStatus.SUCCESS,
      };
    }
    case paymentConfirmActionType.INITIATE_TRANSACTION_ERROR: {
      const { errorMessage, pgData, returnUrl } = action.payload || {};
      return {
        ...state,
        initiateTransactionApiState: apiStatus.ERROR,
        pgData: pgData || state.pgData,
        returnUrl: returnUrl || state.returnUrl,
        errorMessage: errorMessage || state.errorMessage,
      };
    }
    case paymentConfirmActionType.CONFIRM_TRANSACTION_REQUEST:
      return {
        ...state,
        errorMessage: '',
        confirmOtpApiState: apiStatus.INITIATED,
      };
    case paymentConfirmActionType.CONFIRM_TRANSACTION_SUCCESS: {
      const { pgData, returnUrl } = action.payload || {};
      return {
        ...state,
        errorMessage: '',
        confirmOtpApiState: apiStatus.SUCCESS,
        pgData,
        returnUrl,
      };
    }
    case paymentConfirmActionType.CONFIRM_TRANSACTION_ERROR: {
      const { pgData, returnUrl, errorMessage } = action.payload || {};
      return {
        ...state,
        confirmOtpApiState: apiStatus.ERROR,
        pgData: pgData || state.pgData,
        returnUrl: returnUrl || state.returnUrl,
        errorMessage: errorMessage || state.errorMessage,
      };
    }
    case paymentConfirmActionType.RESEND_TRANSACTION_OTP_SUCCESS:
      const { attemptsRemaining } = action.payload || {};
      return {
        ...state,
        resendOtp: {
          attemptsRemaining,
        },
      };
    case PAYMENT_ERROR_DATA:
    case lenderListActionType.USER_TRANSACTION_INFO_ERROR:
    case paymentInitActionType.TRANSACTION_INFO_ERROR:
    case paymentInitActionType.TRANSACTION_TIMEOUT_STORE:
    case paymentCancelActionType.CANCEL_TRANSACTION_SUCCESS: {
      const { pgData, returnUrl, errorMessage } = action.payload || {};
      return {
        ...state,
        pgData: pgData || state.pgData,
        returnUrl: returnUrl || state.returnUrl,
        errorMessage: errorMessage || state.errorMessage,
      };
    }
    case paymentInitActionType.TRANSACTION_TIMEOUT_ERROR_MESSAGE: {
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
      };
    }

    case paymentInitActionType.TRANSACTION_INFO_CLEAR_SELECTED_LENDER_EMI:
      return {
        ...state,
        selectedLender: initialState.selectedLender,
        selectedEmiDetails: initialState.selectedEmiDetails,
      };

    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default paymentUserData;
