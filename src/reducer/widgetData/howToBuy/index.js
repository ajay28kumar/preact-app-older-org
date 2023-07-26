import { apiStatus, widgetEMIInfoActionType } from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  videoUrl: '',
};

const howToBuy = (state = initialState, action) => {
  switch (action.type) {
    case widgetEMIInfoActionType.WIDGET_HOW_TO_BUY_REQUEST:
      return {
        ...state,
        apiState: apiStatus.INITIATED,
      };
    case widgetEMIInfoActionType.WIDGET_HOW_TO_BUY_SUCCESS: {
      const { videoUrl } = action.payload || {};
      return {
        apiState: apiStatus.SUCCESS,
        videoUrl,
      };
    }
    case widgetEMIInfoActionType.WIDGET_HOW_TO_BUY_FAILURE: {
      const { errorCode, errorMessage } = action.payload || {};
      return {
        apiState: apiStatus.ERROR,
        errorCode,
        errorMessage,
      };
    }
    default:
      return state;
  }
};

export default howToBuy;
