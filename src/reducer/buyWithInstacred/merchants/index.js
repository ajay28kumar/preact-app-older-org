import {
  apiStatus,
  bicActionType,
  merchantActionType,
} from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  errorMessage: '',
  page: 1,
  categoryIds: [],
  brandIds: [],
  data: [],
};

const merchants = (state = initialState, action) => {
  switch (action.type) {
    case merchantActionType.INIT_MERCHANT_SCREEN_REQUEST:
      return {
        ...state,
        errorMessage: '',
        apiState: apiStatus.INITIATED,
      };
    case merchantActionType.INIT_MERCHANT_SCREEN_SUCCESS:
      const { data, categoryIds, brandIds } = action.payload || {};
      return {
        ...state,
        errorMessage: '',
        apiState: apiStatus.SUCCESS,
        data,
        categoryIds: categoryIds || [],
        brandIds: brandIds || [],
      };
    case merchantActionType.INIT_MERCHANT_SCREEN_ERROR:
      const { errorMessage } = action.payload || {};
      return {
        ...state,
        errorMessage,
        apiState: apiStatus.ERROR,
      };
    case merchantActionType.LOAD_MORE_MERCHANT:
      const { page } = action.payload || {};
      return {
        ...state,
        page: page > 0 ? page : 1,
      };

    case bicActionType.CLICK_CATEGORY: {
      const { categoryIds } = action.payload || {};
      return {
        ...state,
        categoryIds: categoryIds || [],
      };
    }
    case bicActionType.CLICK_BRAND: {
      const { brandIds } = action.payload || {};
      return {
        ...state,
        brandIds: brandIds || [],
      };
    }
    case merchantActionType.CLEAR_SEARCH_TEXT: {
      const { categoryIds, brandIds } = state || {};
      if (brandIds.length > 0 || categoryIds.length > 0) {
        return {
          ...initialState,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default merchants;
