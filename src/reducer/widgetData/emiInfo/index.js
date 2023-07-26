import { apiStatus, widgetEMIInfoActionType } from '../../../actionTypes';

const initialState = {
  getEmiInfoState: apiStatus.NONE,
  isEligible: false,
  isNtbAllowed: false,
  isPreApproved: false,
  hashedMobile: '',
  lenders: [],
  errorMessage: '',
};

const emiInfo = (state = initialState, action) => {
  switch (action.type) {
    case widgetEMIInfoActionType.WIDGET_EMI_INFO_REQUEST:
      return {
        ...initialState,
        getEmiInfoState: apiStatus.INITIATED,
      };
    case widgetEMIInfoActionType.WIDGET_EMI_INFO_SUCCESS:
      const {
        isEligible,
        isNtbAllowed,
        isPreApproved,
        mobile: hashedMobile,
        lenders,
      } = action.payload || {};
      return {
        ...state,
        isEligible,
        isNtbAllowed,
        isPreApproved,
        hashedMobile,
        lenders,
        getEmiInfoState: apiStatus.SUCCESS,
      };
    case widgetEMIInfoActionType.WIDGET_EMI_INFO_FAILURE:
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        getEmiInfoState: apiStatus.ERROR,
        errorMessage,
      };
    default:
      return state;
  }
};

export default emiInfo;
