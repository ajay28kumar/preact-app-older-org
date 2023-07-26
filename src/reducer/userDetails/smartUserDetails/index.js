import {
  apiStatus,
  commonActionType,
  homeActionType,
} from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  errorMessage: '',
  isEligible: false,
  userStatus: '',
  mobile: '',
};

const smartUserDetails = (state = initialState, action) => {
  switch (action.type) {
    case homeActionType.SUD_API_REQUEST:
      return {
        ...initialState,
        apiState: apiStatus.INITIATED,
      };
    case homeActionType.SUD_API_SUCCESS:
      return {
        ...initialState,
        apiState: apiStatus.SUCCESS,
        ...action.payload,
      };
    case homeActionType.SUD_API_ERROR:
      const { errorMessage } = action.payload || {};
      return {
        ...initialState,
        errorMessage,
        apiState: apiStatus.ERROR,
      };
    case homeActionType.SUD_STATUS_RESET:
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default smartUserDetails;
