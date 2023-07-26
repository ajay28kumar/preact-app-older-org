import {
  apiStatus,
  bicActionType,
  brandActionType,
} from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  errorMessage: '',
  data: [],
};

const brands = (state = initialState, action) => {
  switch (action.type) {
    case brandActionType.INIT_BRAND_SCREEN_REQUEST:
      return {
        ...state,
        errorMessage: '',
        apiState: apiStatus.INITIATED,
      };
    case brandActionType.INIT_BRAND_SCREEN_SUCCESS:
      const { data } = action.payload || {};
      return {
        ...state,
        errorMessage: '',
        apiState: apiStatus.SUCCESS,
        data,
      };
    case brandActionType.INIT_BRAND_SCREEN_ERROR:
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        apiState: apiStatus.ERROR,
        errorMessage,
      };
    default:
      return state;
  }
};

export default brands;
