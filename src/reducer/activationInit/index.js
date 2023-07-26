import {
  apiStatus,
  registrationSecondFactorType,
  registrationConfirmActionType,
  registrationInitActionType,
  commonActionType,
} from '../../actionTypes';

const initialState = {
  campaignApiState: apiStatus.NONE,
  initRegistrationApiState: apiStatus.NONE,
  verifyMobileState: apiStatus.NONE,
  initiateCreditLineState: apiStatus.NONE,
  confirmCreditLineState: apiStatus.NONE,
  activationPinSetupState: apiStatus.NONE,
  shopLater: false,
  backgroundDesktopImg: '',
  backgroundImg: '',
  benefitImg: '',
  merchantLogo: '',
  errorMessage: '',
};

const activationInit = (state = initialState, action) => {
  switch (action.type) {
    case registrationInitActionType.INITIATE_CAMPAIGN_SUCCESS:
      const {
        backgroundDesktopImg,
        backgroundImg,
        benefitImg,
        merchantLogo,
      } = action.payload;
      return {
        ...state,
        campaignApiState: apiStatus.SUCCESS,
        backgroundDesktopImg,
        backgroundImg,
        benefitImg,
        merchantLogo,
      };
    case registrationInitActionType.INITIATE_CAMPAIGN_REQUEST:
      return {
        ...state,
        campaignApiState: apiStatus.INITIATED,
      };
    case registrationInitActionType.INITIATE_CAMPAIGN_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        campaignApiState: apiStatus.ERROR,
        errorMessage,
      };
    }
    case registrationInitActionType.POST_REGISTRATION_INITIATE_REQUEST:
      const { shopLater } = action.payload;
      return {
        ...state,
        errorMessage: '',
        initRegistrationApiState: apiStatus.INITIATED,
        shopLater,
      };
    case registrationInitActionType.POST_REGISTRATION_INITIATE_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        initRegistrationApiState: apiStatus.SUCCESS,
      };
    case registrationInitActionType.POST_REGISTRATION_INITIATE_ERROR:
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        initRegistrationApiState: apiStatus.ERROR,
      };
    case registrationConfirmActionType.POST_REGISTRATION_CONFIRM_REQUEST:
      return {
        ...state,
        errorMessage: '',
        verifyMobileState: apiStatus.INITIATED,
      };
    case registrationConfirmActionType.POST_REGISTRATION_CONFIRM_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        verifyMobileState: apiStatus.SUCCESS,
      };
    case registrationConfirmActionType.POST_REGISTRATION_CONFIRM_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        verifyMobileState: apiStatus.ERROR,
      };
    }
    case registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_REQUEST:
      return {
        ...state,
        errorMessage: '',
        initiateCreditLineState: apiStatus.INITIATED,
      };
    case registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        initiateCreditLineState: apiStatus.SUCCESS,
      };
    case registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        initiateCreditLineState: apiStatus.ERROR,
      };
    }
    case registrationSecondFactorType.POST_VERIFY_CREDIT_LINE_REQUEST:
      return {
        ...state,
        errorMessage: '',
        confirmCreditLineState: apiStatus.INITIATED,
      };
    case registrationSecondFactorType.POST_VERIFY_CREDIT_LINE_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        confirmCreditLineState: apiStatus.SUCCESS,
      };
    case registrationSecondFactorType.POST_VERIFY_CREDIT_LINE_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        confirmCreditLineState: apiStatus.ERROR,
      };
    }
    case registrationSecondFactorType.POST_ACTIVATION_PIN_REQUEST:
      return {
        ...state,
        errorMessage: '',
        activationPinSetupState: apiStatus.INITIATED,
      };
    case registrationSecondFactorType.POST_ACTIVATION_PIN_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        activationPinSetupState: apiStatus.SUCCESS,
      };
    case registrationSecondFactorType.POST_ACTIVATION_PIN_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        activationPinSetupState: apiStatus.ERROR,
      };
    }
    case registrationInitActionType.UPDATE_ERROR_MESSAGE: {
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
      };
    }
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default activationInit;
