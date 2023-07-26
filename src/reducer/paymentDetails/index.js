import {
  apiStatus,
  paymentInitActionType,
  lenderListActionType,
  paymentEnterMobileActionType,
  commonActionType,
} from '../../actionTypes';

import paymentEnterMobileAction from '../../actions/onPaymentEnterMobile/actionType';

export const initialState = {
  transactionInfoApiState: apiStatus.NONE,
  lenderDetailsStatus: apiStatus.NONE,
  transactionInfoPreSelectedApiState: apiStatus.NONE,
  remainingTimeSeconds: '',
  merchantId: '',
  purchaseValue: '',
  mobile: '',
  userStatus: '',
  lenderDetailsList: [],
  eligible: false,
  mobileNoError: '',
  errorMessage: '',
  isFlipkartOfferEligible: false,
};

const paymentDetails = (state = initialState, action) => {
  switch (action.type) {
    case paymentInitActionType.TRANSACTION_INFO_REQUEST:
      return {
        ...state,
        transactionInfoApiState: apiStatus.INITIATED,
        lenderDetailsStatus: apiStatus.INITIATED,
        errorMessage: '',
      };
    case paymentInitActionType.TRANSACTION_INFO_SUCCESS: {
      const {
        merchantId,
        purchaseValue,
        mobile,
        userStatus,
        lenderDetailsList,
        remainingTimeSeconds,
        eligible,
        isFlipkartOfferEligible,
      } = action.payload || {};
      return {
        ...state,
        transactionInfoApiState: apiStatus.SUCCESS,
        lenderDetailsStatus:
          (lenderDetailsList && lenderDetailsList.length) > 0
            ? apiStatus.SUCCESS
            : apiStatus.NONE,
        merchantId,
        purchaseValue,
        mobile,
        mobileNoError: '',
        userStatus,
        lenderDetailsList,
        eligible,
        errorMessage: '',
        remainingTimeSeconds,
        isFlipkartOfferEligible,
      };
    }
    case paymentEnterMobileActionType.UPDATE_TRANSACTION_MOBILE_NUMBER: {
      const { mobile } = action.payload || {};
      return {
        ...state,
        mobile,
      };
    }
    case paymentEnterMobileActionType.UPDATE_TRANSACTION_MOBILE_NUMBER_ERROR:
      const { mobileNoError } = action.payload || {};
      return {
        ...state,
        errorMessage: mobileNoError,
        userTransactionInfoApiState: apiStatus.ERROR,
      };
    case paymentInitActionType.TRANSACTION_INFO_PRE_SELECTED_SUCCESS: {
      const { merchantId, purchaseValue, mobile } = action.payload || {};
      return {
        ...state,
        transactionInfoPreSelectedApiState: apiStatus.SUCCESS,
        merchantId,
        purchaseValue,
        mobile,
        errorMessage: '',
      };
    }
    case paymentInitActionType.TRANSACTION_INFO_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        transactionInfoApiState: apiStatus.ERROR,
        lenderDetailsStatus: apiStatus.ERROR,
        errorMessage: errorMessage || state.errorMessage,
      };
    }
    case lenderListActionType.USER_TRANSACTION_INFO_REQUEST:
      return {
        ...state,
        userTransactionInfoApiState: apiStatus.INITIATED,
        mobileNoError: '',
        errorMessage: '',
      };
    case lenderListActionType.USER_TRANSACTION_INFO_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        userTransactionInfoApiState: apiStatus.ERROR,
        transactionInfoApiState: apiStatus.ERROR,
      };
    }

    case paymentEnterMobileAction.mobileInvalid: {
      const { mobileNoError } = action.payload;
      return {
        ...state,
        mobileNoError,
      };
    }
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default paymentDetails;
