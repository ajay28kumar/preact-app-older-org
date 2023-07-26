import {
  registrationSecondFactorType,
  registrationInitActionType,
  loginActionType,
  bicActionType,
  commonActionType,
} from '../../actionTypes';

const initialState = {
  lenderId: '',
  mobile: '',
  aivfType: '',
  lenderLogo: '',
  lenderName: '',
};

const registrationUserData = (state = initialState, action) => {
  switch (action.type) {
    case registrationInitActionType.INITIATE_CAMPAIGN_REQUEST:
      const { lenderId } = action.payload;
      return {
        ...state,
        lenderId,
      };
    case registrationInitActionType.POST_REGISTRATION_INITIATE_SUCCESS:
      const { mobile } = action.payload;
      if (mobile) {
        return {
          ...state,
          mobile,
        };
      }
      return state;
    case registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_SUCCESS: {
      const { aivfType, lenderLogo, lenderName } = action.payload;
      return {
        ...state,
        aivfType,
        lenderName,
        lenderLogo,
      };
    }
    case registrationInitActionType.INITIATE_ACTIVATION_DATA_SUCCESS:
      const { lenderLogo } = action.payload;
      return {
        ...state,
        lenderLogo,
      };
    case loginActionType.UPDATE_MOBILE_NUMBER:
      return {
        ...state,
        ...action.payload,
      };
    case bicActionType.GET_BIC_API_SUCCESS:
    case commonActionType.STORE_DATA:
      const { lenderDetails } = action.payload;
      if (lenderDetails) {
        const { id: lenderId } = lenderDetails;
        return {
          ...state,
          lenderId,
        };
      }
      return state;
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default registrationUserData;
