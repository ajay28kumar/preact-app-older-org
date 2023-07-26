import {
  apiStatus,
  bicActionType,
  categoryActionType,
} from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  errorMessage: '',
  data: [],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case categoryActionType.INIT_CATEGORY_SCREEN_REQUEST:
      return {
        ...state,
        errorMessage: '',
        apiState: apiStatus.INITIATED,
      };
    case categoryActionType.INIT_CATEGORY_SCREEN_SUCCESS:
      const { data } = action.payload || {};
      return {
        ...state,
        errorMessage: '',
        apiState: apiStatus.SUCCESS,
        data,
      };
    case categoryActionType.INIT_CATEGORY_SCREEN_ERROR:
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
        apiState: apiStatus.ERROR,
      };
    default:
      return state;
  }
};

export default categories;
